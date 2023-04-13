<script lang="ts">
	import { color_pallette } from '../../stores';
	import clickOutside from '../helpers/clickOutside';

	import { customPaletteSet } from '../helpers/color_pallette';
	import ColorPalletteRow from './ColorPalletteRow.svelte';
	let open: boolean = false;
	function changeColorPallette(name: string) {
		console.log('new color pallete is', name);
		color_pallette.set(name);
	}

	function openColorPallette() {
		open = true;
	}
</script>

<div class="px-2 space-y-2 w-auto">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-type">
		Color Pallette
	</label>
	<div class="relative mt-2 w-full" use:clickOutside={{ enabled: open, cb: () => (open = false) }}>
		<button
			type="button"
			class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryLight sm:text-sm sm:leading-6"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			on:click={openColorPallette}
		>
			<ColorPalletteRow colorPallette={customPaletteSet[$color_pallette]} />
			<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
				<svg
					class="h-5 w-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>
		{#if open}
			<ul
				class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				{#each Object.keys(customPaletteSet) as pname (pname)}
					<li
						class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
						id="listbox-option-0"
					>
						<button on:click={(e) => changeColorPallette(pname)}>
							<ColorPalletteRow colorPallette={customPaletteSet[pname]} />

							{#if pname === $color_pallette}
								<div class="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
