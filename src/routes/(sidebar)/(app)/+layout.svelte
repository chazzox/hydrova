<script lang="ts">
	import Timeline from '$lib/components/timeline.svelte';
	import { page } from '$app/stores';
	import PostPreview from '$lib/components/post-preview.svelte';

	$: console.log($page.params);

	let listing_id: string | undefined;
</script>

<div class="drawer-content flex flex-col gap-5 p-3 lg:flex-row">
	<div class="rounded-box h-full w-full flex-1 overflow-y-auto bg-base-300 p-2">
		<Timeline
			listing_id={$page.params?.subreddit
				? `r/${$page.params?.subreddit}`
				: $page.params.user_id
				? `user/${$page.params.user_id}`
				: undefined}
		/>
	</div>
	<div class="rounded-box flex h-full w-full flex-1 items-center justify-center bg-base-300">
		<PostPreview post_id={$page.params?.post_id} />
	</div>
</div>
