import { ROUTES } from '$lib';
import { supabase } from '$lib/supabase';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const fields = [
			'name',
			'description',
			'signifier',
			'persona',
			'scenario',
			'reasoning',
			'referencing',
			'visibility',
			'type',
			'userId',
			'teamId'
		] as const;

		const values: Record<(typeof fields)[number], FormDataEntryValue | null> = {
			name: null,
			description: null,
			signifier: null,
			persona: null,
			scenario: null,
			reasoning: null,
			referencing: null,
			visibility: null,
			type: null,
			userId: null,
			teamId: null
		};
		fields.forEach((field) => {
			values[field] = formData.get(field);
		});
		console.log(values);
		if (!values.name) return fail(422, { error: 'Name required' });
		if (!values.type) return fail(422, { error: 'Prompt type required' });
		if (!values.signifier) return fail(422, { error: 'Prompt required' });
		if (!values.visibility) return fail(422, { error: 'Visibility required' });
		if (!values.userId?.valueOf())
			return fail(422, { error: 'User ID required. Please reload the app.' });
		if (!values.teamId?.valueOf())
			return fail(422, { error: 'Team ID required. Please reload the app.' });

		const tempValues: { scenarioId?: number; personaId?: number } = {};
		if (values.scenario) {
			const { data: scenario, error: e } = await supabase
				.from('scenarios')
				.insert({ value: values.scenario.toString() })
				.select('id')
				.single();
			if (scenario) tempValues.scenarioId = scenario.id;
			else if (e) return fail(422, { error: e.message });
			else return fail(422, { error: 'Scenario could not be created.' });
		}

		if (values.persona) {
			const { data: persona, error: e } = await supabase
				.from('personas')
				.insert({ value: values.persona.toString() })
				.select('id')
				.single();
			if (persona) tempValues.personaId = persona.id;
			else if (e) return fail(422, { error: e.message });
			else return fail(422, { error: 'Persona could not be created.' });
		}

		const { data, error } = await supabase
			.from('prompts')
			.insert({
				name: values.name.toString(),
				description: values.description?.toString() ?? '',
				signifier: values.signifier.toString(),
				type: values.type.toString(),
				created_at: new Date().toISOString(),
				reasoning: values.reasoning?.valueOf() === 'on',
				referencing: values.referencing?.valueOf() === 'on',
				scenario_id: tempValues.scenarioId,
				persona_id: tempValues.personaId,
				user_id: values.userId.toString(),
				team_id: values.teamId.toString(),
				visibility: values.visibility.toString()
			})
			.select('id, type')
			.single();

		if (error) return fail(422, { error: error.message });
		throw redirect(303, `${ROUTES.PROMPTS}/${data.type}/${data.id}`);
	}
};
