<script lang="ts">
	import { VizList } from '$lib/constants';
	import { IVizRunning, type IVizType } from '$lib/interface';
	import { viz_running, viz_type } from '$lib/store';

	function vizTypeChange(e: Event) {
		viz_type.set((e.target as HTMLInputElement).value as IVizType);
		viz_running.set(IVizRunning.Idle);
	}
</script>

<div class="px-2 space-y-2 w-auto">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-type">
		Visualisation Type
	</label>
	<div class="relative">
		<select
			class="block appearance-none w-full bg-bg border border-bgLight text-darkText p-1 rounded leading-tight focus:outline-none focus:bg-bg shadow-sm pr-6 focus:ring-primarySupLight focus:border-primarySupLight"
			id="viz-type"
			on:change={vizTypeChange}
			required
		>
			<option value="">Select..</option>
			{#each VizList as viz}
				<option value={viz} class="text-darkText">{viz}</option>
			{/each}
		</select>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-darkText"
		>
			<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</div>
	</div>
</div>
