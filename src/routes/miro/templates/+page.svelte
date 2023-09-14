<script lang="ts">
	import type { CanvasTemplate } from '$lib/models';
	import type { PageData } from './$types';

	export let data: PageData;

	const useTemplate = (template: CanvasTemplate) => {
		const createdItems: { id: string }[] = [];
		template.items.forEach(async (item: any) => {
			switch (item.type) {
				case 'frame':
					const frame = await miro.board.createFrame({
						title: item.title,
						x: Number(item.x),
						y: Number(item.y),
						width: Number(item.width),
						height: Number(item.height)
					});
					createdItems.push(frame);
					break;
				case 'shape':
					const shape = await miro.board.createShape({
						content: item.content,
						x: Number(item.x),
						y: Number(item.y),
						width: Number(item.width),
						height: Number(item.height),
						style: item.style,
						shape: item.shape
					});
					createdItems.push(shape);
					break;
				case 'text':
					const text = await miro.board.createText({
						content: item.content,
						x: Number(item.x),
						y: Number(item.y),
						width: Number(item.width),
						height: Number(item.height),
						style: item.style
					});
					createdItems.push(text);
					break;
			}
			await miro.board.select({ id: [...createdItems.map((item) => item.id)] });
		});
	};
</script>

{#if data.templates && data.templates.length > 0}
	<div class="flex flex-col overflow-y-auto">
		{#each data.templates as template}
			<div class="card-soft">
				<div class="card-header">
					<img src={template.imageUrl} alt={template.title + ' image preview'} />
				</div>
				<section class="flex flex-col items-center p-4">
					<h4 class="h4">{template.title}</h4>
					<span class="text-sm">
						{template.description}
					</span>
					<div class="flex justify-start gap-x-4 self-start my-4">
						<h5 class="h5">Source:</h5>
						<p class="italic">{@html template.source}</p>
					</div>
					<button
						class="btn btn-sm variant-filled-primary self-end"
						on:click={() => useTemplate(template)}
					>
						Use this template</button
					>
				</section>
			</div>
		{/each}
	</div>
{:else}
	No templates found
{/if}
