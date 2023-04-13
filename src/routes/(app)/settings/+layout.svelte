<script lang="ts">
	const settings = {
		'/settings/general': 'General',
		'/settings/appearance': 'Appearance',
		'/settings/account': 'Account',
		'/settings/keybindings': 'Keybindings'
	} as const;
</script>

<div class="drawer-content flex flex-1 flex-col p-6">
	<div class="tabs tabs-boxed mx-auto mb-4 gap-2 p-2 shadow-xl">
		{#each Object.entries(settings) as [settingPillPath, settingPillTextValue]}
			<a
				href={settingPillPath}
				class={'tab rounded-lg capitalize transition-colors hover:bg-accent hover:text-accent-content'}
			>
				{settingPillTextValue}
			</a>
		{/each}
	</div>
	<div class="flex-1 flex-col rounded-box bg-base-300 p-10 shadow-lg">
		<slot />
	</div>
</div>
