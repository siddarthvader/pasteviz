<script lang="ts">
	import VizRun from '$lib/components/VizRun.svelte';
	import VizSelector from '$lib/components/VizSelector.svelte';
	import { generateDataFromOpenAI } from '$lib/helpers/api';
	import { IVizRunning, type IRenderFn, type IVizComponent } from '$lib/interface';

	import { openai_query, viz_keys, viz_running, viz_type, viz_values } from '$lib/store';

	import Choropleth from '$lib/visualisation/choropleth/Choropleth.svelte';
	import BarChart from '$lib/visualisation/barchart/BarChart.svelte';
	import EmptyViz from '$lib/visualisation/EmptyViz.svelte';
	import PieChart from '$lib/visualisation/piechart/PieChart.svelte';

	const VizComponentMap: IVizComponent[] = [
		{
			component: EmptyViz,
			value: ''
		},
		{
			component: Choropleth,
			value: 'choropleth'
		},
		{
			component: BarChart,
			value: 'barchart'
		},
		{
			component: PieChart,
			value: 'piechart'
		}
	];

	let isRunning: boolean = false;
	let renderFn: IRenderFn;

	viz_running.subscribe(() => {
		isRunning = $viz_running === IVizRunning.Running;
	});

	async function vizRunChange() {
		viz_running.set(IVizRunning.Running);

		const data = await generateDataFromOpenAI($openai_query);

		console.log(data);

		viz_type.set('barchart');
		viz_keys.set(data.map((item) => item.key).toString());
		viz_values.set(data.map((item) => item.value).toString());

		vizRender();

		viz_running.set(IVizRunning.Idle);
	}

	function vizRender() {
		console.log('viz gonna render');
		if (renderFn) {
			renderFn();
		}
	}

	function setOpenAIQuery(e: Event): void {
		openai_query.set((e.target as HTMLInputElement).value);
	}
</script>

<div class="flex m-auto w-[87%] border-bgLight border-x h-[calc(100vh-100px)]">
	<div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full">
		<div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
			<div class="relative flex items-center space-x-4">
				<div class="flex flex-col leading-tight">
					<div class="text-2xl mt-1 flex items-center">
						<span class="text-gray-700 mr-3">Generate Charts using ChatGPT</span>
					</div>
					<!-- <span class="text-lg text-gray-600">Type Your query</span> -->
				</div>
			</div>
		</div>
		<div class="flex-1 w-full flex flex-col h-[800px] overflow-auto">
			<form class="w-[24%] flex space-x-4 items-end" on:submit|preventDefault={vizRender}>
				<VizSelector />
				<VizRun />
			</form>
			{#each VizComponentMap as viz}
				{#if $viz_type === viz.value}
					<svelte:component this={viz.component} bind:render={renderFn} />
				{/if}
			{/each}
		</div>

		<div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
			<div class="relative flex">
				<input
					type="text"
					placeholder="Write your message!"
					on:change={setOpenAIQuery}
					class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
				/>
				<div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
					<button
						type="button"
						class=" hover:primaryLight text-lightText font-bold py-1 px-4 rounded"
						on:click={vizRunChange}
						class:bg-primary={!isRunning}
						class:bg-secondary={isRunning}
					>
						{#if !isRunning}
							Generate
						{:else}
							<svg
								aria-hidden="true"
								role="status"
								class="inline mr-3 w-4 h-4 text-white animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="#E5E7EB"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentColor"
								/>
							</svg>
							Stop
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
