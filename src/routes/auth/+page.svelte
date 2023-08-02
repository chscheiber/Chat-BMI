<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
	};

	const handleSignIn = async () => {
		console.log('sign in');
		const res = await supabase.auth.signInWithPassword({
			email,
			password
		});
		console.log(res.data);
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<form on:submit={handleSignUp}>
	<input name="email" bind:value={email} />
	<input type="password" name="password" bind:value={password} />
	<button>Sign up</button>
</form>

<button on:click={handleSignIn}>Sign in</button>
<button on:click={handleSignOut}>Sign out</button>
