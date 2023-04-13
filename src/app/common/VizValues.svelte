<script lang="ts">
	import { viz_values } from '../../stores';

	function vizValuesChange(e: Event) {
		viz_values.set((e.target as HTMLInputElement).value);
	}
</script>

<div class="px-2 space-y-2 w-full">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-values">
		Values
	</label>

	<textarea
		id="viz-values"
		rows="4"
		class="block p-2.5 text-sm text-darkText bg-bg rounded-lg border border-bgLight focus:ring-primarySupLight focus:border-primarySupLight w-[100%]"
		placeholder="Paste your Values here, comma or space separated....10000,999,1200000"
		on:input={vizValuesChange}
	/>
</div>
