import { OPENAI_API_KEY } from '$env/static/private';
import type { ApiPrompt } from '$lib/models/prompts/api-prompt.model';
import { error, type RequestHandler } from '@sveltejs/kit';
import { CallbackManager } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate
} from 'langchain/prompts';

export const POST: RequestHandler = async ({ request }) => {
	const json = await request.json();
	const prompt: ApiPrompt = json.prompt;
	const key = OPENAI_API_KEY;
	if (!key) {
		console.error('No OpenAI API key provided');
		throw error(400, 'No OpenAI API key provided');
	}

	if (json.streaming) {
		return streamResponse(prompt, key);
	}
	return waitFullResponse(prompt, key);
};

const streamResponse = async (prompt: ApiPrompt, key: string) => {
	const readableStream = new ReadableStream({
		async start(controller) {
			const chat = new ChatOpenAI({
				openAIApiKey: key,
				modelName: prompt.llmModelName,
				streaming: true,
				callbackManager: CallbackManager.fromHandlers({
					handleLLMNewToken: async (token: string) => controller.enqueue(token)
				})
			});
			await callChain(prompt, key, chat);
			setTimeout(() => controller.close(), 1000);
		}
	});

	// Create and return a response of the readable stream
	return new Response(readableStream, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const waitFullResponse = async (prompt: ApiPrompt, key: string) => {
	const chat = new ChatOpenAI({
		openAIApiKey: key,
		modelName: prompt.llmModelName,
		streaming: false
	});

	const response = await callChain(prompt, key, chat);
	console.log(response);
	return new Response(response.text, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const callChain = async (prompt: ApiPrompt, key: string, chat: ChatOpenAI) => {
	const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(prompt.type.systemPrompt);
	const humanTemplate = generateHumanTemplate(prompt);
	const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);
	const chatPrompt = ChatPromptTemplate.fromPromptMessages([
		systemMessagePrompt,
		humanMessagePrompt
	]);

	const chain = new LLMChain({
		llm: chat,
		prompt: chatPrompt
	});

	return await chain.call({});
};

const generateHumanTemplate = (prompt: ApiPrompt) => {
	let template: string = prompt.signifier + '\n';
	const persona = prompt.persona?.trim();
	const scenario = prompt.scenario?.trim();
	const context = prompt.context?.trim();

	if (persona && persona !== '') template += `Act as: ${persona}\n`;
	if (scenario && scenario !== '') template += `Imagine the following scenario:\n"${scenario}"\n`;

	if (context) template += `Context:\n "${context}"\n`;

	return template;
};
