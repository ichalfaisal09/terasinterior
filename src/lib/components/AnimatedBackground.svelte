<script lang="ts">
	let { variant = 'default' } = $props();
</script>

<div class="animated-background {variant}">
	<div class="shape shape-1"></div>
	<div class="shape shape-2"></div>
	<div class="shape shape-3"></div>
	<div class="lines">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</div>
</div>

<style>
	.animated-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	/* Floating Shapes */
	.shape {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.15;
		animation: float-shape 20s ease-in-out infinite;
	}

	.shape-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, transparent 70%);
		top: -100px;
		left: -100px;
		animation-duration: 25s;
		animation-delay: 0s;
	}

	.shape-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(247, 147, 30, 0.4) 0%, transparent 70%);
		bottom: -100px;
		right: -100px;
		animation-duration: 30s;
		animation-delay: 5s;
	}

	.shape-3 {
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-duration: 35s;
		animation-delay: 10s;
	}

	@keyframes float-shape {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(50px, -50px) scale(1.1);
		}
		50% {
			transform: translate(-30px, 30px) scale(0.9);
		}
		75% {
			transform: translate(40px, 40px) scale(1.05);
		}
	}

	/* Animated Lines */
	.lines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.line {
		position: absolute;
		width: 1px;
		height: 100%;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(255, 107, 53, 0.1) 50%,
			transparent 100%
		);
		animation: line-move 15s linear infinite;
	}

	.line:nth-child(1) {
		left: 10%;
		animation-delay: 0s;
	}

	.line:nth-child(2) {
		left: 30%;
		animation-delay: 3s;
	}

	.line:nth-child(3) {
		left: 50%;
		animation-delay: 6s;
	}

	.line:nth-child(4) {
		left: 70%;
		animation-delay: 9s;
	}

	.line:nth-child(5) {
		left: 90%;
		animation-delay: 12s;
	}

	@keyframes line-move {
		0% {
			transform: translateY(-100%);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(100%);
			opacity: 0;
		}
	}

	/* Variant: Dark */
	.animated-background.dark .shape {
		opacity: 0.08;
	}

	/* Variant: Light */
	.animated-background.light .shape {
		opacity: 0.2;
	}

	/* Variant: Subtle */
	.animated-background.subtle .shape {
		opacity: 0.05;
		filter: blur(100px);
	}
</style>
