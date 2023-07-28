import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
	ChatPromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate
} from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { OPENAI_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const prompt = await request.json();

	if (!OPENAI_API_KEY) {
		console.error('No OpenAI API key provided');
		return new Response('No OpenAI API key provided', { status: 400 });
	}

	const chat = new ChatOpenAI({
		modelName: prompt.llmModelName,
		temperature: 0,
		openAIApiKey: OPENAI_API_KEY
	});

	const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(prompt.type.typeSignifier);

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

	const result = await chain.call({});
	return json({ message: result.text });
};

const generateHumanTemplate = (prompt: any) => {
	let template: string = prompt.signifier + '\n';
	const persona = (prompt.persona as string)?.trim();
	const scenario = (prompt.scenario as string)?.trim();
	const context = (prompt.context as string)?.trim();

	if (persona && persona !== '') template += `Act as: ${persona}\n`;
	if (scenario && scenario !== '') template += `Imagine the following scenario:\n"${scenario}"\n`;

	if (context) template += `Context:\n "${context}"\n`;
	console.log(template);
	return template;
};
