<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
</script>

<div class="app-body h-[96vh] overflow-y-auto flex flex-col pr-2">
	<slot />
</div>

<style>
	.app-body {
		margin: 16px;
	}
</style>
