<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { Route_List } from '$lib/constants';
	import { page } from '$app/stores';
</script>

<div
	class="w-100 bg-primaryLight space-x-2 flex items-center px-12 justify-between text-lightText h-[70px] border-b-white border-b"
>
	<div class="flex justify-start items-end space-x-2">
		<div class="font-bold text-2xl leading-none">Pasteviz</div>
		<div class="text-sm font-semibold">visualisation on fly, you fools!!!</div>
	</div>
	<div class="flex space-x-8 cursor-pointer self-stretch">
		<ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
			{#each Route_List as Route}
				<li class="flex items-end">
					<a
						href={Route.path}
						class=" mt-4 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-sm font-bold leading-tight text-white hover:isolate hover:border-transparent hover:bg-white focus:isolate focus:border-transparent hover:text-blue-500"
						class:bg-white={Route.path === $page.route.id}
						class:text-blue-500={Route.path === $page.route.id}
					>
						{Route.name}
					</a>
				</li>
			{/each}
		</ul>
		<a href="https://github.com/siddarthvader/pasteviz" target="_blank" class="self-end py-2">
			<Fa icon={faGithub} size="2x" />
		</a>
	</div>
</div>
