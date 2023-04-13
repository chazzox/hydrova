<script lang="ts">
	const SELECTED_THEMES = [
		'retro',
		'night',
		'forest',
		'dark',
		'coffee',
		'luxury',
		'aqua',
		'cyberpunk'
	] as const;
</script>

<h2 class="text-lg font-bold text-white/80">Colors</h2>

<div class="my-3 flex flex-wrap gap-8">
	{#each SELECTED_THEMES as theme}
		<button
			data-theme={theme}
			data-set-theme={theme}
			data-act-class="btn-active"
			class="btn btn-primary w-36 capitalize"
		>
			{theme}
		</button>
	{/each}
</div>
