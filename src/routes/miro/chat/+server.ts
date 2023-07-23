import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResolvedPrompt } from '$lib';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
	ChatPromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate
} from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { OPENAI_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const prompt: ResolvedPrompt = data.prompt;

	if (!OPENAI_API_KEY) {
		console.error('No OpenAI API key provided');
		return new Response('No OpenAI API key provided', { status: 400 });
	}

	const chat = new ChatOpenAI({ modelName: 'gpt-4', temperature: 0, openAIApiKey: OPENAI_API_KEY });
	const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
		prompt.prompt_types.signifier
	);
	const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(prompt.signifier ?? '');
	const chatPrompt = ChatPromptTemplate.fromPromptMessages([
		systemMessagePrompt,
		humanMessagePrompt
	]);
	const chain = new LLMChain({
		llm: chat,
		prompt: chatPrompt
	});

	const result = await chain.call({});
	return json({ message: result.text });
};
