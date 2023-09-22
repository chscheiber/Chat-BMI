import { restrictQuery, type AdditionalPromptElements } from '$lib';
import type { ApiPrompt } from '$lib/models/prompts/api-prompt.model';
import { supabase } from '$lib/supabase';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const searchValue = url.searchParams.get('value');
	const userId = url.searchParams.get('user-id');
	const teamId = url.searchParams.get('team-id');

	let limit = 10;
	if (url.searchParams.get('limit')) {
		limit = Number(url.searchParams.get('limit'));
	}
	if (!searchValue) throw error(400, 'No search value provided');

	if (!userId || !teamId) throw error(400, 'No user or team id provided');
	let query = supabase
		.from('prompts')
		.select()
		.or(
			`name.ilike.%${searchValue}%,description.ilike.%${searchValue}%,signifier.ilike.%${searchValue}%`
		)
		// .textSearch('fts', searchValue)
		.limit(limit);
	query = restrictQuery(query, userId, teamId);
	const { data, error: e } = await query;

	return json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const prompt: ApiPrompt = body.prompt;

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
			user_id: prompt.userId,
			team_id: prompt.teamId,
			visibility: prompt.visibility
		})
		.select()
		.single();
	return body(data);
};
