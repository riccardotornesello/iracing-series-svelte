<script lang="ts">
	interface Props {
		image: string;
		title: string;
		tags?: string[];
	}

	const { image, title, tags }: Props = $props();
</script>

<div class="w-full overflow-hidden rounded-lg bg-white shadow-md">
	<img class="h-48 w-full object-contain" src={image} alt={title} loading="lazy" />

	<div class="p-4">
		<!-- Chips -->
		{#if tags}
			<div class="mb-3 flex flex-wrap gap-2">
				{#each tags as tag}
					<span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Title -->
		<h2 class="text-lg font-bold text-gray-900">{title}</h2>
	</div>
</div>
