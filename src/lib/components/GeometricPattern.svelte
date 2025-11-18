<script lang="ts">
	let { opacity = 0.03 } = $props();
</script>

<div class="geometric-pattern" style="opacity: {opacity}">
	<div class="pattern-grid">
		{#each Array(20) as _, i}
			<div class="pattern-item" style="animation-delay: {i * 0.2}s"></div>
		{/each}
	</div>
</div>

<style>
	.geometric-pattern {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	.pattern-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4rem;
		padding: 4rem;
		width: 100%;
		height: 100%;
	}

	.pattern-item {
		width: 100%;
		height: 100%;
		border: 2px solid #ff6b35;
		border-radius: 10px;
		animation: pattern-pulse 4s ease-in-out infinite;
		transform-origin: center;
	}

	.pattern-item:nth-child(odd) {
		border-color: #f7931e;
	}

	.pattern-item:nth-child(3n) {
		border-radius: 50%;
	}

	.pattern-item:nth-child(4n) {
		transform: rotate(45deg);
	}

	@keyframes pattern-pulse {
		0%, 100% {
			transform: scale(1) rotate(0deg);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.1) rotate(5deg);
			opacity: 0.6;
		}
	}
</style>
