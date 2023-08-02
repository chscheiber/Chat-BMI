<script lang="ts">
	import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<!-- <Drawer>
	<div class="flex justify-start items-center m-4">
		<button class="btn-icon btn-icon-sm variant-outline" on:click={drawerClose}
			><Icon icon="ion:close" /></button
		>
		<h3 class="h3 ms-4">Generative BMI</h3>
	</div>
	<div class="m-4 flex flex-col">
		<h4 class="h4">Analytical</h4>
	</div>
</Drawer> -->
<AppShell>
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead">
				<div />
				<!-- <button class="btn-icon btn-icon-sm variant-filled" on:click={drawerOpen}
					><Icon icon="ion:menu" /></button
				> -->
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
