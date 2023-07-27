<script lang="ts">
	import Icon from '@iconify/svelte';
	export let heading = '';
	export let lastPage = '/miro';
</script>

<div class="flex items-center mb-2">
	<a class="btn-icon btn-icon-sm variant-filled me-2" href={lastPage}
		><Icon icon="ion:arrow-back" /></a
	>
	<h2 class="h2 mb-0 pb-0">{heading === '' ? 'New Prompt' : heading}</h2>
</div>
