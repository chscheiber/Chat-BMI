<script lang="ts">
	import { AppBar, AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { openAISettings, userId } from '$lib/store';

	export let data: LayoutData;

	initializeStores();
	const drawerStore = getDrawerStore();

	onMount(async () => {
		if (!browser) return;
		const storedKey = window.localStorage.getItem('llmSettings');
		if (storedKey) {
			const llmSettings = JSON.parse(storedKey);
			openAISettings.set(llmSettings);
		}
		if (!userId) return;
		const userInfo = await miro.board.getUserInfo();
		try {
			const res = await fetch('/api/authorize/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userId: userInfo.id })
			});
			const loginData = await res.json();
			const { access_token, refresh_token } = loginData.session;
			const { data: sessionData, error: err } = await data.supabase.auth.setSession({
				access_token,
				refresh_token
			});
			console.log(sessionData.user);
		} catch (error) {
			console.error(error);
		}
	});

	function drawerOpen(): void {
		const drawerSettings: DrawerSettings = {
			id: 'example-3',
			// Provide your property overrides:
			bgDrawer: 'bg-surface-100',
			bgBackdrop: 'bg-surface-100/30',
			width: 'w-[280px] md:w-[480px]',
			rounded: 'rounded-e-xl'
		};
		drawerStore.open(drawerSettings);
	}

	function drawerClose(): void {
		drawerStore.close();
	}

	export const links = [
		// { icon: 'ion:star-outline', text: 'Favorites', href: '/miro/favorites' },
		// { icon: 'ion:document-outline', text: 'Templates', href: '/miro/templates' },
		{ icon: 'ion:library-outline', text: 'Prompts', href: '/miro/prompts' }
		// { icon: 'bi:collection', text: 'Collections', href: '/miro/collections' },
		// { icon: 'ion:people-outline', text: 'Personas', href: '/miro/personas' },
		// { icon: 'material-symbols:scene-outline', text: 'Scenarios', href: '/miro/scenarios' }
	] as const;
</script>

<Drawer>
	<div class="flex justify-start items-center m-4">
		<button class="btn-icon btn-icon-sm variant-filled" on:click={drawerClose}
			><Icon icon="ion:close" /></button
		>
		<h3 class="h3 mx-4">Generative BMI</h3>
		<button
			class="ms-auto btn-icon btn-icon-sm variant-filled"
			on:click={() => {
				drawerClose();
				goto('/miro');
			}}><Icon icon="ion:home" /></button
		>
	</div>
	<hr />
	{#each links as link}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="my-4 ms-4 flex items-center justify-start gap-4 hover:cursor-pointer"
			on:click={() => {
				drawerClose();
				goto(link.href);
			}}
			on:keypress={() => {
				drawerClose();
				goto(link.href);
			}}
		>
			<Icon icon={link.icon} style="font-size: 22px;" />
			<h4 class="h4">{link.text}</h4>
		</div>
		<hr class="mx-4" />
	{/each}
</Drawer>
<Toast />
<AppShell>
	<svelte:fragment slot="header"
		><AppBar background="bg-surface-100">
			<svelte:fragment slot="lead">
				<div />
				<button class="btn-icon btn-icon-sm variant-filled" on:click={() => drawerOpen()}
					><Icon icon="ion:menu" /></button
				>
			</svelte:fragment>
			<h3 class="h3"><a href="/miro">Generative BMI</a></h3>
			<svelte:fragment slot="trail"
				><button class="btn-icon btn-icon-sm variant-filled" on:click={() => goto('/miro/profile')}>
					<Icon icon="ion:settings-outline" />
				</button></svelte:fragment
			>
		</AppBar></svelte:fragment
	>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<div class="app-body p-6 h-[90vh] overflow-y-auto flex flex-col">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
