import { OPENAI_API_KEY } from '$env/static/private';
import type { PromptTypeKey } from '$lib';
import type { Message } from '$lib/models/prompts/conversation.model';
import { supabase } from '$lib/supabase';
import { error, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';
import type { Stream } from 'openai/streaming';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export type ConversationMessageBody = {
	conversationId: number;
	messages: Message[];
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

const callLLM = async (body: ConversationMessageBody, key: string, stream = true) => {
	const openai = new OpenAI({
		apiKey: key
	});

	const humanMessages = body.messages.filter((message) => message.role === 'human');
	const promptType = humanMessages[humanMessages.length - 1].promptType as PromptTypeKey;

	const { data, error: err } = await supabase
		.from('prompt_types')
		.select()
		.eq('key', promptType)
		.single();

	if (err) throw error(500, err?.message);
	if (!data?.system_prompt) throw error(500, 'No system prompt found');

	const mapMessage = (message: Message): { role: Role; content: string } => ({
		role: message.role === 'human' ? 'user' : 'assistant',
		content: message.text
	});
	const messages: { role: Role; content: string }[] = body.messages.map((message) =>
		mapMessage(message)
	);

	messages.unshift({ role: 'system', content: data.system_prompt });

	const result = openai.chat.completions.create({
		model: body.modelName,
		messages,
		stream
	});
	return result;
};

const waitFullResponse = async (body: ConversationMessageBody, key: string) => {
	const result = (await callLLM(body, key, false)) as OpenAI.Chat.Completions.ChatCompletion;

	const text = result.choices[0]?.message.content || '';

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain' }
	});
};

const streamResponse = async (body: ConversationMessageBody, key: string) => {
	const response = (await callLLM(
		body,
		key,
		true
	)) as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;
	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream, {
		headers: { 'X-RATE-LIMIT': 'lol' }
	});
};

type Role = 'user' | 'system' | 'assistant';
