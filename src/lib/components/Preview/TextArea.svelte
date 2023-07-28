<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
</script>

<label>
	<span>{label}</span>
	<textarea class="textarea" rows="4" bind:value {placeholder} />
</label>
