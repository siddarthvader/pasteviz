<script lang="ts">
	import { viz_type } from '../stores';
	import ColorPallette from './common/ColorPallette.svelte';
	import Deploy from './common/Deploy.svelte';
	import OpacitySlider from './common/OpacitySlider.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	import { VizComponentMap } from '../constants';
	import type { IRenderFn } from '../interface';

	let renderFn: IRenderFn;
	async function vizSubmit() {
		// Dispatch an event to respective child component

		renderFn && renderFn();
	}
</script>

<div class="flex m-auto w-[87%] border-bgLight border-x h-[calc(100vh-100px)]">
	<form
		on:submit|preventDefault={vizSubmit}
		class="w-[37%] p-6 flex flex-col space-y-6 items-start border-r border-bgLight"
	>
		<VizSelector />
		<VizInput />
		<ColorPallette />
		<OpacitySlider />
		<div class="self-end px-2">
			<VizRun />
			<Deploy />
		</div>
		<div class="text-midText text-sm px-1">* mapping of key-data is one to one wrt index</div>
	</form>

	{#each VizComponentMap as viz}
		{#if $viz_type === viz.value}
			<svelte:component this={viz.component} bind:render={renderFn} />
		{/if}
	{/each}
</div>
