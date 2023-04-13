<script lang="ts">
	import Close from '$lib/assets/close.svelte';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

	let showHeader: string | undefined = 'no';

	onMount(() => {
		showHeader = Cookies.get('hydrova-header');
	});

	const hide_header = () => {
		Cookies.set('hydrova-header', 'no', { sameSite: 'strict' });
		showHeader = 'no';
	};
</script>

{#if !showHeader}
	<div class="text-center bg-accent text-accent-content p-4 relative">
		<span>
			If you want to checkout the older version of hydrova (which is just as unfinished as this)
			check it out <a class="link" href="https://hydrova.chazzox.uk">here</a>
		</span>
		<button on:click={hide_header} class="absolute right-2"><Close /></button>
	</div>
{/if}
