<script lang="ts">
	import { viz_keys } from '../../stores';

	function vizKeysChange(e) {
		viz_keys.set(e.target.value);
	}
</script>

<div class="px-2 space-y-2 w-full">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-keys">
		Keys
	</label>

	<textarea
		id="viz-keys"
		rows="4"
		class="block p-2.5 text-sm text-darkText bg-bg rounded-lg border border-bgLight focus:ring-primarySupLight focus:border-primarySupLight w-[100%]"
		placeholder="Paste your Keys here, comma or space separated.... India, Argentina, AUS"
		on:input={vizKeysChange}
	/>
</div>
