<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { getDateDiffString } from '$lib/utils';
	import PostIcon from '$lib/assets/post-icon.svelte';

	export let listing_id: string = 'r/farnham';

	const query = createQuery({
		queryKey: ['timeline', listing_id],
		queryFn: () =>
			fetch(new URL(listing_id, 'https://api.reddit.com/')).then((res) => res.json() as any)
	});
</script>

{#if $query.isLoading}
	<p>loading</p>
{:else if $query.isError}
	<p>Error</p>
{:else if $query.isSuccess}
	{#each $query.data.data.children as postPreviewData}
		<div class="flex h-32 w-full flex-row px-3">
			<div class="flex-1">
				<p>
					<span class="rounded-xl bg-white/40 px-2">{postPreviewData.data.author}</span>
					<span>{getDateDiffString(postPreviewData.data.created * 1000)}</span>
					<span class="rounded-xl bg-white/40 px-2"
						>{postPreviewData.data.subreddit_name_prefixed}</span
					>
				</p>
				<p>{postPreviewData.data.title}</p>
			</div>

			<PostIcon class="h-20 w-20 rounded-lg bg-white/10 p-2" />
		</div>
	{/each}
{/if}
