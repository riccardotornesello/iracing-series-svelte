<script lang="ts">
	interface Props {
		showModal: boolean;
		children: () => any;
		title: string;
	}

	let { showModal = $bindable(), children, title }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (showModal) dialog?.showModal();
		else dialog?.close();
	});
</script>

<dialog bind:this={dialog}>
	<div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
		<!-- Modal header -->
		<div
			class="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600"
		>
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
			<button
				type="button"
				class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="default-modal"
				onclick={() => (showModal = false)}
			>
				<svg
					class="h-3 w-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					></path>
				</svg>
				<span class="sr-only">Close modal</span>
			</button>
		</div>

		<!-- Modal body -->
		<div class="space-y-4 p-4 md:p-5">
			{@render children?.()}
		</div>
	</div>
</dialog>

<!-- 
dialog::backdrop {
	background: rgba(0, 0, 0, 0.3);
}
dialog > div {
	padding: 1em;
}
dialog[open] {
	animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes zoom {
	from {
		transform: scale(0.95);
	}
	to {
		transform: scale(1);
	}
}
dialog[open]::backdrop {
	animation: fade 0.2s ease-out;
}
@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
} -->

<style>
	dialog {
		border: none;
		padding: 0;
		background: none;
	}
</style>
