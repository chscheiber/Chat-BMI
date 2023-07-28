<script lang="ts">
	import Icon from '@iconify/svelte';
	export let heading = '';
	export let lastPage = '/miro';
</script>

<div class="flex items-center mb-2">
	<a class="btn-icon btn-icon-sm variant-filled me-4" href={lastPage}
		><Icon icon="ion:arrow-back" /></a
	>
	<h3 class="h3 mb-0 pb-0">{heading === '' ? 'New Prompt' : heading}</h3>
</div>
