import type { AdditionalPromptElements } from '$lib';
import type { ApiPrompt } from '$lib/models/prompts/api-prompt.model';
import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
	const json = await request.json();
	const prompt: ApiPrompt = json.prompt;
	const userId: number = json.userId ?? null;

	const tempValues: { scenarioId?: number; personaId?: number } = {};

	if (prompt.scenario) {
		const { data } = await supabase
			.from('scenarios')
			.insert({ value: prompt.scenario })
			.select()
			.single();
		if (data) tempValues.scenarioId = data.id;
	}

	if (prompt.persona) {
		const { data } = await supabase
			.from('personas')
			.insert({ value: prompt.persona })
			.select()
			.single();
		if (data) tempValues.personaId = data.id;
	}

	const elements: AdditionalPromptElements = {};

	elements.reasoning = prompt.reasoning;
	elements.referencing = prompt.referencing;
	elements.db_queries = prompt.db_queries;

	const { data, error } = await supabase
		.from('prompts')
		.insert({
			name: prompt.name,
			description: prompt.description,
			signifier: prompt.signifier,
			type: prompt.type.key,
			created_at: new Date().toISOString(),
			llm_model_name: prompt.llmModelName,
			output_format: prompt.outputFormat,
			elements,
			scenario_id: tempValues.scenarioId,
			persona_id: tempValues.personaId,
			user_id: userId
		})
		.select()
		.single();
	console.log(data, error);
	return new Response(JSON.stringify(data), { status: 200 });
};
