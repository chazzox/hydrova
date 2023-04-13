<script lang="ts">
	import Hydrova from '$lib/assets/hydrova.svelte';

	export let title: string;
	export let subtitle: string;
	export let description: string;
</script>

<div
	class="relative min-w-full rounded-lg bg-secondary p-3 pt-14 text-center text-secondary-content/70"
>
	<Hydrova class="absolute -top-10 left-1/2 h-24 -translate-x-1/2 drop-shadow-lg" />
	<h2 class="text-2xl font-bold text-secondary-content">{title}</h2>
	<h4 class="text-xl font-bold">{subtitle}</h4>
	<p class="font-semibold">{description}</p>
</div>
<slot />
