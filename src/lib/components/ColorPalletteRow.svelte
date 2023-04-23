<script lang="ts">
	import type { ColorList } from '$lib/interface';

	export let colorPallette: ColorList = [];
</script>

<div class="flex items-center w-[90%] overflow-hidden flex-wrap">
	{#each colorPallette as color}
		<div class="h-5 w-5 flex-shrink-0 inline" style:background-color={color} />
	{/each}
</div>
