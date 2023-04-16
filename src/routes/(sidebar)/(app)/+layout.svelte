<script lang="ts">
	import { page } from '$app/stores';
	import Timeline from '$lib/components/timeline.svelte';
	import PostPreview from '$lib/components/post-preview.svelte';

	let listing_id = 'r/all';
	$: listing_id = $page.params?.subreddit
		? `r/${$page.params?.subreddit}`
		: $page.params.user_id
		? `user/${$page.params.user_id}`
		: 'r/all';
</script>

<div class="drawer-content flex flex-col gap-5 p-3 lg:flex-row">
	<div class="rounded-box h-full w-full flex-1 overflow-y-auto bg-base-300 p-2">
		<Timeline {listing_id} />
	</div>
	<div class="rounded-box flex h-full w-full flex-1 items-center justify-center bg-base-300">
		<PostPreview post_id={$page.params?.post_id} />
	</div>
</div>
