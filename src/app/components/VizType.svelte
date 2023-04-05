<script>
	import { vizList } from '../../constants';
</script>

<div class="px-2 space-x-2 w-auto">
	<label class="block uppercase tracking-wide text-midText text-xs font-bold" for="viz-type">
		Visualisation Type
	</label>
	<div class="relative">
		<select
			class="block appearance-none w-full bg-bg border border-bgLight text-darkText p-1 rounded leading-tight focus:outline-none focus:bg-bg shadow-sm pr-6 focus:ring-primarySupLight focus:border-primarySupLight"
			id="viz-type"
		>
			<option selected>select type</option>
			{#each vizList as viz}
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
