<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { getFullPost } from '$lib/reddit';

	export let post_id: undefined | string;

	$: postQuery = createQuery({
		queryKey: ['post', post_id],
		// @ts-expect-error
		queryFn: () => getFullPost(post_id),
		enabled: !!post_id
	});
</script>

{#if $postQuery.isSuccess}
	<p class="h-full w-full">{$postQuery.data[0].data.children[0].data.title}</p>
{/if}
