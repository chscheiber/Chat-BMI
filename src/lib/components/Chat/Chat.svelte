<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let promptResponse = 'Lorem Ipsum';
	let currentMessage = '';
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
		width="w-10"
	/>
	<div class="card p-4 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">ChatGPT</p>
			<small class="opacity-50">{new Date().toLocaleTimeString()}</small>
		</header>
		<p class="whitespace-pre-line text-sm">{promptResponse}</p>
	</div>
</div>
<!-- <div class="grid grid-cols-[1fr_auto] gap-2">
	<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
		<header class="flex justify-between items-center">
			<p class="font-bold">{bubble.name}</p>
			<small class="opacity-50">{bubble.timestamp}</small>
		</header>
		<p>{bubble.message}</p>
	</div>
	<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
</div> -->

<div
	class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-auto"
>
	<button class="input-group-shim" disabled>+</button>
	<textarea
		disabled
		bind:value={currentMessage}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
		rows="1"
	/>
	<button class="variant-filled-primary" disabled>Send</button>
</div>
