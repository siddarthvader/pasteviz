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
				<li
					class=" border-b-4 border-transparent hover:text-gray-100 hover:border-gray-100 group flex hover:bg-blue-600"
					class:bg-blue-600={Route.path === $page.route.id}
					class:border-white={Route.path === $page.route.id}
				>
					<a href={Route.path} class="p-4 items-center justify-center flex">
						{Route.name}
					</a>
				</li>
			{/each}
		</ul>
		<a href="https://github.com/siddarthvader/pasteviz" target="_blank" class="self-center">
			<Fa icon={faGithub} size="2x" />
		</a>
	</div>
</div>
