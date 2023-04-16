<script lang="ts">
	import { color_pallette, opacity_values, viz_keys, viz_type, viz_values } from '../../stores';

	let isDeploying: boolean = false;

	$: queryParams = {
		type: $viz_type,
		keys: $viz_keys,
		values: $viz_values,
		color_pallette: $color_pallette,
		opacity: $opacity_values.toString()
	};
</script>

<a
	type="button"
	class=" hover:primaryLight text-lightText font-bold py-1 px-4 rounded disabled:bg-bgLight"
	class:bg-primary={!isDeploying}
	class:bg-secondary={isDeploying}
	href={`/deploy?${new URLSearchParams(queryParams)}`}
	target="_blank"
>
	Deploy
</a>
