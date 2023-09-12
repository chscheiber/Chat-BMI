<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants';
	import type { Conversation } from '$lib/models/prompts/conversation.model';

	export let conversations: Conversation[] = [];
	export let showTitle = true;
</script>

<div class="card p-4 overflow-y-auto">
	{#if showTitle}
		<a href={ROUTES.CONVERSATION}><h4 class="h4 mb-4">Latest Conversations</h4></a>
	{/if}
	{#each conversations as conversation, i}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex flex-col gap-y-2 hover:cursor-pointer"
			on:click={() => goto(`${ROUTES.CONVERSATION}/${conversation.id}`)}
		>
			<p class="text-sm text-ellipsis whitespace-nowrap overflow-x-hidden italic">
				{conversation.title}
			</p>
			<div class="flex gap-x-4 justify-between">
				<p class="text-sm whitespace-nowrap">
					{conversation.lastModified.toLocaleTimeString()}
				</p>
				<p class="text-sm">
					{conversation.lastModified.toLocaleDateString()}
				</p>
			</div>
		</div>
		{#if i < conversations.length - 1}
			<hr class="my-2" />
		{/if}
	{/each}
</div>
