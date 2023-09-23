<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants';
	import type { Conversation } from '$lib/models/prompts/conversation.model';

	export let conversations: Conversation[] = [];
	export let showTitle = true;
</script>

<div class="card-soft p-4">
	{#if showTitle}
		<a href={ROUTES.CONVERSATIONS}><h4 class="h4 mb-2">Latest Conversations</h4></a>
	{/if}
	{#if conversations.length > 0}
		<div class="flex flex-col gap-y-2">
			{#each conversations as conversation, i}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="card-soft p-2 flex flex-col hover:cursor-pointer"
					on:click={() => goto(`${ROUTES.CONVERSATIONS}/${conversation.id}`)}
				>
					<p class="text-sm text-ellipsis whitespace-nowrap overflow-x-hidden font-bold">
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
			{/each}
		</div>
	{:else}
		<p class="text-sm text-center">No conversations yet...</p>
	{/if}
</div>
