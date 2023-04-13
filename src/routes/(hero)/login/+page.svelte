<script lang="ts">
	import HeroContent from '../hero-content.svelte';
</script>

<HeroContent
	title="Hydrova"
	subtitle="High Performance Reddit Client"
	description="By leveraging the power of the modern web, We aim to accelerate your reddit
		experience"
>
	<button class="btn w-full"> Sign In </button>
	<button class="btn btn-disabled w-full !cursor-not-allowed">
		Continue in guest mode (Coming at a later date...)
	</button>
	<a href="https://www.reddit.com/register/" class="btn btn-ghost w-full">Sign Up</a>
</HeroContent>
