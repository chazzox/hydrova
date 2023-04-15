<script lang="ts">
	export let post_id: undefined | string;
</script>

<div>
	{#if post_id}
		<p>post preview for {post_id}</p>
	{:else}
		<p>no post id</p>
	{/if}
</div>
