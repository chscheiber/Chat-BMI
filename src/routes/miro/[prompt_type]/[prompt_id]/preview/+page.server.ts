import { PromptBuilder } from '$lib/models/prompt-elements.model';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const prompt = PromptBuilder.fromFormData(data);

		console.log(prompt);

		// for (const [key, value] of data.entries()) {
		// 	console.log(key, value);
		// }
	}
};
