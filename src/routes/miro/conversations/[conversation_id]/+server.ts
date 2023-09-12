import { OPENAI_API_KEY } from '$env/static/private';
import type { PromptTypeKey } from '$lib';
import type { Message } from '$lib/models/prompts/conversation.model';
import { supabase } from '$lib/supabase';
import { error, type RequestHandler } from '@sveltejs/kit';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from 'langchain/schema';

export type ConversationMessageBody = {
	conversationId: number;
	messages: Message[];
	promptType?: PromptTypeKey;
	modelName: string;
	userId: string;
	teamId: string;
};

export const POST: RequestHandler = async ({ request, url }) => {
	const body: ConversationMessageBody = await request.json();
	if (!body) throw error(400, 'Missing Data');

	const streaming = url.searchParams.get('streaming') === 'true';
	const key = OPENAI_API_KEY;
	if (!key) {
		throw error(400, 'No OpenAI API key provided');
	}

	if (streaming) {
		return streamResponse(body, key);
	}
	return waitFullResponse(body, key);
};

const streamResponse = async (body: ConversationMessageBody, key: string) => {
	const readableStream = new ReadableStream({
		async start(controller) {
			const chat = new ChatOpenAI({
				openAIApiKey: key,
				modelName: body.modelName,
				streaming: true,
				callbackManager: CallbackManager.fromHandlers({
					handleLLMNewToken: async (token: string) => controller.enqueue(token)
				})
			});
			await callChain(body.messages, chat, body.promptType);
			try {
				controller.close();
			} catch {
				/* empty */
			}
		}
	});

	// Create and return a response of the readable stream
	return new Response(readableStream, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const waitFullResponse = async (body: ConversationMessageBody, key: string) => {
	const chat = new ChatOpenAI({
		openAIApiKey: key,
		modelName: body.modelName,
		streaming: false,
		maxTokens: -1
	});

	const response = await callChain(body.messages, chat, body.promptType);
	// return text(response.content, { status: 200 });
	return new Response(response.content, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const callChain = async (messages: Message[], chat: ChatOpenAI, type?: PromptTypeKey) => {
	let requestMessages: BaseMessage[] = [];
	if (type) {
		const { data, error: err } = await supabase
			.from('prompt_types')
			.select()
			.eq('key', type)
			.single();

		if (err) throw error(500, err?.message);
		if (!data?.system_prompt) throw error(500, 'No system prompt found');
		requestMessages.push(new SystemMessage(data.system_prompt));
	}
	requestMessages = [
		...requestMessages,
		...messages.map((message) =>
			message.role === 'human' ? new HumanMessage(message.text) : new AIMessage(message.text)
		)
	];

	const chainCall = await chat.call(requestMessages);
	return chainCall;

	// const chain = new LLMChain({
	// 	llm: chat,
	// 	prompt: chatPrompt
	// });

	// return await chain.call({});
};

// const generateHumanTemplate = (prompt: ApiPrompt) => {
// 	let template: string = prompt.signifier + '\n';
// 	const persona = prompt.persona?.trim();
// 	const scenario = prompt.scenario?.trim();
// 	const context = prompt.context?.trim();

// 	if (persona && persona !== '') template += `Act as: ${persona}\n`;
// 	if (scenario && scenario !== '') template += `Imagine the following scenario:\n"${scenario}"\n`;

// 	if (context) template += `Context:\n "${context}"\n`;

// 	return template;
// };