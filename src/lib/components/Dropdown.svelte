<script lang="ts">
	import type { FocusEventHandler } from 'svelte/elements';

	interface Props<T> {
		value: T | null;
		placeholder: string;
		options: {
			value: T | null;
			label: string;
		}[];
	}

	let { value = $bindable(), placeholder, options }: Props<string | number | boolean> = $props();

	let label = $derived(
		value === null ? placeholder : options.find((option) => option.value === value)?.label
	);

	let isDropdownOpen = $state(false);

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleDropdownFocusLoss: FocusEventHandler<HTMLDivElement> = ({
		relatedTarget,
		currentTarget
	}) => {
		// use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		isDropdownOpen = false;
	};
</script>

<div class="relative inline-block text-left" onfocusout={handleDropdownFocusLoss}>
	<button
		class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#243647] pl-4 pr-2 text-white"
		onclick={handleDropdownClick}
	>
		<p class="text-sm font-medium leading-normal">{label}</p>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20px"
				height="20px"
				fill="currentColor"
				viewBox="0 0 256 256"
			>
				<path
					d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
				></path>
			</svg>
		</div>
	</button>

	<div
		class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-[#243647] text-white shadow-lg focus:outline-none"
		role="menu"
		tabindex="-1"
		style:visibility={isDropdownOpen ? 'visible' : 'hidden'}
	>
		<div class="py-1" role="none">
			{#each options as option}
				<button
					class={'block w-full px-4 py-2 text-left text-sm' +
						(value === option.value ? ' bg-[#266DD3]' : '')}
					role="menuitem"
					tabindex="-1"
					onclick={() => {
						value = option.value;
						isDropdownOpen = false;
					}}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
</div>
