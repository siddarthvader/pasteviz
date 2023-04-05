<script>
	import { vizList } from '../constants';
</script>

<div class="w-[80%] m-auto p-6">
	<div class="px-2 flex items-center space-x-2 justify-center">
		<label class="block uppercase tracking-wide text-darkText text-xs font-bold" for="viz-type">
			Visualisation Type
		</label>
		<div class="relative w-[240px]">
			<select
				class="block appearance-none w-full bg-bg border border-bgLight text-darkText p-1 rounded leading-tight focus:outline-none focus:bg-bg focus:border-primarySupLight"
				id="viz-type"
			>
				<option selected>Choose a visualisation</option>
				{#each vizList as viz}
					<option value={viz}>{viz.toUpperCase()}</option>
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
</div>
