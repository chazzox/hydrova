<script>
	import { afterUpdate } from 'svelte';
	import { themeChange } from 'theme-change';

	import Header from '$lib/components/header.svelte';

	import './styles.css';

	afterUpdate(() => {
		themeChange(false);
	});
</script>

<Header />
<main>
	<slot />
</main>
