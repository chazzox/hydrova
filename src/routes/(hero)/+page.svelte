<script lang="ts">
	import Hydrova from '$lib/assets/hydrova.svelte';
</script>

<div
	class="relative min-w-full rounded-lg bg-secondary p-3 pt-14 text-center text-secondary-content/70"
>
	<Hydrova class="absolute -top-10 left-1/2 h-24 -translate-x-1/2 drop-shadow-lg" />
	<h2 class="text-2xl font-bold text-secondary-content">This project is being retired</h2>
	<p class="my-5 font-semibold">
		Because of the recent reddit api changes, this project has become somewhat pointless. For
		reasons you can read about <a
			target="_blank"
			rel="noreferrer"
			href="https://www.reddit.com/r/apolloapp/comments/144f6xm/apollo_will_close_down_on_june_30th_reddits/"
			class="link">here</a
		>. I've learnt so much from the making of this and its sad ill never be able to complete it.<br
		/><br /> Oh well. You can checkout my other projects
		<a target="_blank" rel="noreferrer" class="link" href="https://github.com/chazzox"
			>on my github</a
		>.
	</p>
</div>
<slot />
