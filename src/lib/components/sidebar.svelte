<script lang="ts">
	import Settings from '$lib/assets/settings.svelte';
	import Hydrova from '$lib/assets/hydrova.svelte';
	import Search from '$lib/assets/search.svelte';
	import Home from '$lib/assets/home.svelte';
	import Mail from '$lib/assets/mail.svelte';
	import Post from '$lib/assets/post.svelte';

	import Subreddits from '$lib/components/subreddits.svelte';
	import Feeds from '$lib/components/feeds.svelte';

	export let drawerId: string;
</script>

<div class="drawer-side">
	<label for={drawerId} class="drawer-overlay" />
	<ul
		class="menu z-10 flex h-full w-64 gap-3 overflow-y-auto overscroll-none bg-base-300 p-4 pb-0 pt-0 text-base-content"
	>
		<li class="sticky top-0 z-10 bg-base-300 pt-4">
			<a href="/" class="font-bold">
				<Hydrova class="h-8 w-8" />
				Hydrova
			</a>
		</li>

		<div class="input-group">
			<input type="text" placeholder="Search…" class="input-bordered input w-full" />
			<button class="btn-square btn">
				<Search class="h-5 w-5" />
			</button>
		</div>

		<li>
			<a href="/">
				<Home class="h-5 w-5" />
				Home
			</a>
		</li>
		<li>
			<a href="/post">
				<Post class="h-5 w-5" />
				Post
			</a>
		</li>
		<li>
			<a href="/mail">
				<Mail class="h-5 w-5" />
				Mail
			</a>
		</li>
		<li>
			<a href="/settings/appearance">
				<Settings class="h-5 w-5" />
				Settings
			</a>
		</li>

		<Feeds />
		<Subreddits />

		<!-- 
            <div class="sticky bottom-0 mt-auto flex w-full items-center gap-10 bg-base-300 p-4">
			<div class="avatar">
				<div class="h-14 w-14 rounded-xl ring ring-accent">
					<img src={data.user.image} alt={`profile picture of ${data.user.name}`} />
				</div>
			</div>
			<div>{data.user?.name}</div>
		    </div>
        -->
	</ul>
</div>
