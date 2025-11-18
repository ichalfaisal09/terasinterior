<script lang="ts">
	import { onMount } from 'svelte';
	
	let mouseX = $state(0);
	let mouseY = $state(0);
	let isVisible = $state(false);
	
	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			isVisible = true;
		};
		
		const handleMouseLeave = () => {
			isVisible = false;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

{#if isVisible}
	<div 
		class="spotlight" 
		style="left: {mouseX}px; top: {mouseY}px;"
	></div>
{/if}

<style>
	.spotlight {
		position: fixed;
		width: 600px;
		height: 600px;
		background: radial-gradient(
			circle,
			rgba(255, 107, 53, 0.08) 0%,
			rgba(247, 147, 30, 0.04) 30%,
			transparent 70%
		);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 1;
		transition: left 0.15s ease-out, top 0.15s ease-out;
		mix-blend-mode: screen;
	}
</style>
