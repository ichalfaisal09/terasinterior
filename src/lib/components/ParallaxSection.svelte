<script lang="ts">
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let offsetY = $state(0);
	
	onMount(() => {
		const handleScroll = () => {
			offsetY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="parallax" style="transform: translateY({offsetY * 0.5}px)">
	{@render children()}
</div>

<style>
	.parallax {
		transition: transform 0.1s ease-out;
	}
</style>
