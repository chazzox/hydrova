<script>
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { afterUpdate } from 'svelte';
	import { themeChange } from 'theme-change';

	import './styles.css';

	afterUpdate(() => {
		themeChange(false);
	});

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<main>
		<slot />
	</main>
</QueryClientProvider>
