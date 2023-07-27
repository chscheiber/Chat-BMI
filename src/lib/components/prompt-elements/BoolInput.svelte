<script lang="ts">
	import type { BoolElement } from '$lib/models/prompt-elements.model';

	export let element: BoolElement = {
		element_name: 'Input',
		element_key: 'none',
		value: ''
	};
</script>

<div class="space-y-2">
	<label class="flex items-center space-x-2">
		<input type="checkbox" class="checkbox" value={element.value === 'true'} />
		<p>{element.element_name}</p>
	</label>
</div>
