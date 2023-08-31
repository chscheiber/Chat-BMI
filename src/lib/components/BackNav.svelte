<script lang="ts">
	import Icon from '@iconify/svelte';
	export let heading = '';
</script>

<div class="flex items-center mb-4">
	<button class="btn-icon btn-icon-sm variant-filled me-4" on:click={() => history.back()}>
		<Icon icon="ion:arrow-back" />
	</button>
	<h3 class="h3 mb-0 pb-0">{heading}</h3>
</div>
