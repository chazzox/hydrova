<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { getDateDiffString } from '$lib/utils';
	import PostIcon from '$lib/assets/post-icon.svelte';
	import { getListing } from '$lib/reddit';

	export let listing_id: string;

	$: listingQuery = createQuery({
		queryKey: ['timeline', listing_id],
		queryFn: () => getListing(listing_id)
	});
</script>

{#if $listingQuery.isLoading}
	<p>loading</p>
{:else if $listingQuery.isError}
	<p>Error</p>
{:else if $listingQuery.isSuccess}
	{#each $listingQuery.data.data.children as postPreviewData}
		<a
			href={`/${listing_id}/${postPreviewData.data.id}`}
			class="flex h-28 w-full flex-row items-center px-3"
		>
			<div class="flex flex-1 flex-col">
				<!-- fucking horrible nested link hack 😍 -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<object>
					<p>
						<a href={`/user/${postPreviewData.data.author}`} class="rounded-xl bg-white/40 px-2">
							{postPreviewData.data.author}
						</a>
						<span>{getDateDiffString(postPreviewData.data.created * 1000)}</span>
						<a
							href={`/${postPreviewData.data.subreddit_name_prefixed}`}
							class="rounded-xl bg-white/40 px-2"
						>
							{postPreviewData.data.subreddit_name_prefixed}
						</a>
					</p>
				</object>
				<p class="flex-1 text-ellipsis">{postPreviewData.data.title}</p>
			</div>

			<PostIcon class="h-20 w-20 rounded-lg bg-white/10 p-2" />
		</a>
		<div class="divider m-0" />
	{/each}
{/if}
