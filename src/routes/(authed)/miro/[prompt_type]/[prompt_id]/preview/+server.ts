import { OPENAI_API_KEY } from '$env/static/private';
import { CallbackManager } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate
} from 'langchain/prompts';
import type { RequestHandler } from './$types';
import type { ApiPrompt } from '$lib/models/prompts/api-prompt.model';

export const POST: RequestHandler = async ({ request }) => {
	const prompt = (await request.json()) as ApiPrompt;
	console.log(prompt);

	if (!OPENAI_API_KEY) {
		console.error('No OpenAI API key provided');
		return new Response('No OpenAI API key provided', { status: 400 });
	}

	const readableStream = new ReadableStream({
		async start(controller) {
			const chat = new ChatOpenAI({
				openAIApiKey: OPENAI_API_KEY,
				modelName: prompt.llmModelName,
				streaming: true,
				callbackManager: CallbackManager.fromHandlers({
					handleLLMNewToken: async (token: string) => controller.enqueue(token)
				})
			});

			const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
				prompt.type.typeSignifier
			);

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

			await chain.call({});

			controller.close();
		}
	});

	// Create and return a response of the readable stream
	return new Response(readableStream, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const generateHumanTemplate = (prompt: ApiPrompt) => {
	let template: string = prompt.signifier + '\n';
	const persona = prompt.persona?.trim();
	const scenario = prompt.scenario?.trim();
	const context = prompt.context?.trim();

	if (persona && persona !== '') template += `Act as: ${persona}\n`;
	if (scenario && scenario !== '') template += `Imagine the following scenario:\n"${scenario}"\n`;

	if (context) template += `Context:\n "${context}"\n`;
	console.log(template);
	return template;
};
