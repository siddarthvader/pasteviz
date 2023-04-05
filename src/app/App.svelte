<script>
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizSelector from './common/VizType.svelte';
</script>

<div class="flex m-auto w-[80%] border-bgLight border-x mt-6">
	<div class="w-[37%] p-6 flex flex-col space-y-6 items-start border-r border-bgLight">
		<VizSelector />
		<VizInput />
	</div>
	<Choropleth />
</div>
