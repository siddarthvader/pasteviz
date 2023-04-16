<script lang="ts">
	import { onMount } from 'svelte';
	import Choropleth from '../../app/Choropleth.svelte';
	import { fuelStoreFromURLParams } from '../../app/helpers/deploy';
	import { viz_type, viz_values } from '../../stores';

	const urlParams = new URLSearchParams(window.location.search);

	fuelStoreFromURLParams(urlParams);
	let renderChoropleth: () => Promise<void>;
	onMount(() => {
		renderChoropleth();
	});
	// Dispatch an event to respective child component
</script>

<div class="w-full flex">
	<Choropleth bind:render={renderChoropleth} />
</div>
