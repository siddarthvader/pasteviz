<script lang="ts">
	import { opacity_values } from '../../stores';

	function rangeChange(e) {
		$opacity_values = e.target.value;
	}
</script>

<div class="px-2 space-y-2 w-full">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-type">
		Opacity
	</label>
	<input
		id="default-range"
		type="range"
		value={$opacity_values}
		on:input={rangeChange}
		class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
	/>
</div>
