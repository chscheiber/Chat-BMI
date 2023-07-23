import type { Database } from '$lib/database.types';

export abstract class Prompt {
	id: number;
	signifier: string | null;
	name: string | null;
	type: number | null;
	created_at: string | null;
	db_queries:
		| string
		| number
		| boolean
		| {
				[key: string]:
					| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json
					| undefined;
		  }
		| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json[]
		| null;
	generation_directives:
		| string
		| number
		| boolean
		| {
				[key: string]:
					| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json
					| undefined;
		  }
		| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json[]
		| null;
	memetic_proxies:
		| string
		| number
		| boolean
		| {
				[key: string]:
					| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json
					| undefined;
		  }
		| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json[]
		| null;
	output_format:
		| string
		| number
		| boolean
		| {
				[key: string]:
					| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json
					| undefined;
		  }
		| import('/Users/chris/Developer/gen-bmi/src/lib/database.types').Json[]
		| null;
	constructor(data: Database['public']['Tables']['prompts']['Row']) {
		this.id = data.id;
		this.signifier = data.signifier;
		this.name = data.name;
		this.type = data.type;
		this.created_at = data.created_at;
		this.db_queries = data.db_queries;
		this.generation_directives = data.generation_directives;
		this.memetic_proxies = data.memetic_proxies;
		this.output_format = data.output_format;
	}
}
