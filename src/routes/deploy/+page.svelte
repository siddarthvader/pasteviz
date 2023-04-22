<script lang="ts">
	import { onMount } from 'svelte';
	import { fuelStoreFromURLParams } from '../../app/helpers/deploy';
	import { viz_type } from '../../stores';
	import { VizComponentMap } from '../../constants';

	const urlParams = new URLSearchParams(window.location.search);

	let renderFn: () => Promise<void>;
	onMount(() => {
		fuelStoreFromURLParams(urlParams);

		setTimeout(() => {
			renderFn();
		}, 1);
	});
	// Dispatch an event to respective child component
</script>

<div class="w-full flex">
	{#each VizComponentMap as viz}
		{#if $viz_type === viz.value}
			<svelte:component this={viz.component} bind:render={renderFn} />
		{/if}
	{/each}
</div>
