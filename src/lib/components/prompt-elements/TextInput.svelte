<script lang="ts">
	import type { TextElement } from '$lib/models/prompt-elements.model';

	export let element: TextElement = {
		element_name: 'Input',
		element_key: 'none',
		value: ''
	};
</script>

<label class="label">
	<span>{element.element_name}</span>
	<textarea
		class="textarea"
		rows="4"
		placeholder="Enter some content."
		name={element.element_key}
		bind:value={element.value}
	/>
</label>
