<script>
	import Timeline from '$lib/components/timeline.svelte';
</script>

<div class="drawer-content flex flex-col gap-5 p-3 lg:flex-row">
	<div class="rounded-box h-full w-full flex-1 overflow-y-auto bg-base-300 p-2">
		<Timeline />
	</div>
	<div class="rounded-box flex h-full w-full flex-1 items-center justify-center bg-base-300">
		<p class="text-center text-3xl font-bold">This is where the post you click on is</p>
	</div>
</div>
