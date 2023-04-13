<script>
	import Sidebar from './sidebar.svelte';

	const drawerId = crypto.randomUUID();
</script>

<div class="drawer-mobile drawer">
	<input id={drawerId} type="checkbox" class="drawer-toggle" />
	<label
		for={drawerId}
		class="swap-rotate btn swap btn-circle drawer-button fixed inset-2 z-40 shadow-2xl lg:hidden"
	>
		<svg
			class="swap-off fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 512 512"
		>
			<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
		</svg>
		<svg
			class="swap-on fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 512 512"
		>
			<polygon
				points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
			/>
		</svg>
	</label>
	<slot />

	<Sidebar {...{ drawerId }} />
</div>
