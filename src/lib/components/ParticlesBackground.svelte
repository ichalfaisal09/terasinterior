<script lang="ts">
	import { onMount } from 'svelte';
	
	let particles: Array<{ x: number; y: number; size: number; delay: number }> = [];
	
	onMount(() => {
		// Generate random particles
		particles = Array.from({ length: 20 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 2,
			delay: Math.random() * 10
		}));
	});
</script>

<div class="particles">
	{#each particles as particle}
		<div 
			class="particle" 
			style="
				left: {particle.x}%; 
				top: {particle.y}%; 
				width: {particle.size}px; 
				height: {particle.size}px;
				animation-delay: {particle.delay}s;
			"
		></div>
	{/each}
</div>

<style>
	.particles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.6) 0%, transparent 70%);
		border-radius: 50%;
		animation: particle-float 15s ease-in-out infinite;
	}

	@keyframes particle-float {
		0%, 100% {
			transform: translateY(0) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) translateX(50px);
			opacity: 0;
		}
	}
</style>
