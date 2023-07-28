<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let label: string;
	export let checked: boolean = false;
</script>

<div class="flex">
	<SlideToggle name="slider-label" bind:checked>{label}</SlideToggle>
</div>
