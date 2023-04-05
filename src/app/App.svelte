<script>
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizSelector from './common/VizType.svelte';
</script>

<div class="w-[80%] m-auto p-6 flex items-start justify-center">
	<VizSelector />
	<VizInput />
</div>
<div class="w-[80%] m-auto p-6 flex items-start justify-center">
	<Choropleth />
</div>
