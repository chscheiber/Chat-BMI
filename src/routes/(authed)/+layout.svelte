<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loading = false;
	export let data;

	const handleLogout: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			}

			await applyAction(result);
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Miro</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead"><div /></svelte:fragment>
			<h2 class="h2">Miro</h2>
			<svelte:fragment slot="trail"
				>{#if $page.data.session}
					<form action="/logout" method="post" use:enhance={handleLogout}>
						<button disabled={loading} type="submit" class="btn variant-filled">Sign out</button>
					</form>
				{/if}</svelte:fragment
			>
		</AppBar></svelte:fragment
	>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="app-body h-[84vh] overflow-y-auto flex flex-col pr-2 m-6">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"><a href="/miro">Miro</a></svelte:fragment>
	<!-- (footer) -->
</AppShell>
