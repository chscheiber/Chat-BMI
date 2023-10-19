<script lang="ts">
	import {
		AppShell,
		Drawer,
		Modal,
		ProgressRadial,
		Toast,
		getDrawerStore,
		initializeStores,
		type DrawerSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { ROUTES } from '$lib';
	import PromptModal from '$lib/components/StartingPage/PromptModal.svelte';
	import { loading } from '$lib/store';
	import Icon from '@iconify/svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	initializeStores();
	const drawerStore = getDrawerStore();

	// onMount(() => {
	// 	if (!browser) return;
	// 	const storedKey = window.localStorage.getItem('llmSettings');
	// 	if (storedKey) {
	// 		const llmSettings = JSON.parse(storedKey);
	// 		openAISettings.set(llmSettings);
	// 	}
	// });

	function drawerOpen(): void {
		const drawerSettings: DrawerSettings = {
			id: 'menu-drawer',
			// Provide your property overrides:
			bgDrawer: 'bg-white',
			bgBackdrop: 'bg-surface-800/50',
			width: 'w-[280px] md:w-[480px]',
			rounded: 'rounded-s-xl',
			position: 'right'
		};
		drawerStore.open(drawerSettings);
	}

	function drawerClose(): void {
		drawerStore.close();
	}

	export const links = [
		// { icon: 'ion:star-outline', text: 'Favorites', href: '/miro/favorites' },
		{ icon: 'ion:home-outline', text: 'Home', href: ROUTES.HOME },
		{ icon: 'ion:document-outline', text: 'Templates', href: ROUTES.TEMPLATES },
		{ icon: 'ci:chat-conversation', text: 'All Conversations', href: ROUTES.CONVERSATIONS },
		{ icon: 'ion:library-outline', text: 'Prompt Types', href: ROUTES.PROMPTS },
		{ icon: 'bi:collection', text: 'Collections', href: ROUTES.COLLECTIONS }
		// { icon: 'grommet-icons:configure', text: 'Settings', href: ROUTES.SETTINGS }
		// { icon: 'ion:people-outline', text: 'Personas', href: '/miro/personas' },
		// { icon: 'material-symbols:scene-outline', text: 'Scenarios', href: '/miro/scenarios' }
	] as const;

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		promptModal: {
			// Pass a reference to your custom component
			ref: PromptModal
		}
	};

	const getRouteHeader = (route: string) => {
		if (route.includes(ROUTES.TEMPLATES)) {
			return 'Templates';
		} else if (route.includes(ROUTES.NEW_COLLECTION)) {
			return 'New  Collection';
		} else if (route.includes(ROUTES.COLLECTIONS)) {
			return 'Collections';
		} else if (route.includes(ROUTES.NEW_CONVERSATION)) {
			return 'New  Conversation';
		} else if (route.includes(ROUTES.CONVERSATIONS)) {
			return 'All Conversations';
		} else if (route.includes(ROUTES.PROMPTS)) {
			return 'Prompt Types';
		} else if (route === '/miro') {
			return 'Home';
		}
		return 'Generative BMI';
	};
</script>

<Drawer>
	<div class=" variant-filled-secondary p-4 flex items-center justify-between">
		<div />
		<h3 class="h3 uppercase">Overview</h3>
		<button class="btn-icon btn-icon-sm variant-filled-tertiary" on:click={drawerClose}
			><Icon icon="ion:close" /></button
		>
	</div>
	<div class="flex flex-col gap-y-2 m-2">
		{#each links as link}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="card-soft p-4 flex items-center justify-start gap-4 hover:cursor-pointer"
				on:click={() => {
					drawerClose();
					goto(link.href);
				}}
				on:keypress={() => {
					drawerClose();
					goto(link.href);
				}}
			>
				<Icon icon={link.icon} class="text-secondary-500" style="font-size: 22px;" />
				<h4 class="h4">{link.text}</h4>
			</div>
		{/each}
	</div>
</Drawer>
<Toast />
<Modal components={modalComponentRegistry} />
<AppShell>
	<svelte:fragment slot="header">
		{#if !$navigating}
			<div class="flex gap-4 p-4 items-center justify-between bg-secondary-500 text-white">
				{#if $page.url.pathname !== ROUTES.HOME}
					<button
						class="btn-icon btn-icon-sm variant-filled-tertiary"
						on:click={() => history.back()}><Icon icon="ion:chevron-left" /></button
					>
				{:else}
					<div />
				{/if}
				<h2 class="h2">{getRouteHeader($page.url.pathname)}</h2>
				<button class="btn-icon btn-icon-sm variant-filled-tertiary" on:click={() => drawerOpen()}
					><Icon icon="ion:menu" /></button
				>
			</div>
		{/if}
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="app-body p-4 h-[90vh] overflow-y-auto flex flex-col">
		{#if $navigating || $loading}
			<div class=" h-[100%] grid place-items-center">
				<ProgressRadial
					width={'w-20'}
					stroke={100}
					meter="stroke-primary-500"
					track="stroke-primary-500/30"
				/>
			</div>
		{:else}
			<slot />
		{/if}
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
