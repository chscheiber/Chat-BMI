import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import type { GenericSchema } from '@supabase/supabase-js/dist/module/lib/types';

export const restrictQuery = <T extends GenericSchema, U extends Record<string, unknown>, V>(
	query: PostgrestFilterBuilder<T, U, V>,
	userId: string,
	teamId: string
) => {
	// visibility eq public OR
	// (visibility eq team AND team_id eq teamId) OR
	// (visibility eq private AND user_id eq userId)
	query = query.or(
		`visibility.eq.public,` +
			`and(visibility.eq.team,team_id.eq.${teamId}),` +
			`and(visibility.eq.private,user_id.eq.${userId})`
	);
	return query;
};
