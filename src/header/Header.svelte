<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<div
	class="w-100 p-2 bg-primaryLight space-x-2 flex items-center px-12 justify-between text-lightText h-[70px]"
>
	<div class="flex flex-col justify-start">
		<div class="font-bold text-2xl">Pasteviz</div>
		<div class="font-light text-sm">visualisation on fly, you fools!!!</div>
	</div>
	<a href="https://github.com/siddarthvader/pasteviz" target="_blank">
		<Fa icon={faGithub} size="2x" />
	</a>
</div>
