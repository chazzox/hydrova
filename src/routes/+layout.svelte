<script>
	import './styles.css';
	import { afterUpdate } from 'svelte';
	import { themeChange } from 'theme-change';

	afterUpdate(() => {
		themeChange(false);
	});
</script>

<div>
	<main>
		<slot />
	</main>
</div>
