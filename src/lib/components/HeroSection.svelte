<script lang="ts">
	import ParticlesBackground from './ParticlesBackground.svelte';
</script>

<section id="home" class="hero">
	<div class="hero-overlay"></div>
	<div class="animated-bg">
		<div class="floating-shape shape-1"></div>
		<div class="floating-shape shape-2"></div>
		<div class="floating-shape shape-3"></div>
		<div class="floating-shape shape-4"></div>
	</div>
	<ParticlesBackground />
	<div class="hero-content">
		<div class="hero-badge">Premium Interior Design</div>
		<h1 class="hero-title">
			<span class="title-line">Crafting Spaces</span>
			<span class="title-line accent">That Inspire</span>
		</h1>
		<p class="hero-subtitle">
			Transformasi ruang Anda menjadi masterpiece yang mencerminkan kepribadian dan gaya hidup Anda
		</p>
		<div class="hero-buttons">
			<a href="#contact" class="btn btn-primary">Mulai Konsultasi</a>
			<a href="#portfolio" class="btn btn-secondary">Lihat Portfolio</a>
		</div>
		<div class="hero-trust">
			<div class="trust-item">
				<div class="trust-icon">✓</div>
				<span>Garansi Kepuasan</span>
			</div>
			<div class="trust-item">
				<div class="trust-icon">✓</div>
				<span>Free Konsultasi</span>
			</div>
			<div class="trust-item">
				<div class="trust-icon">✓</div>
				<span>Harga Transparan</span>
			</div>
		</div>
	</div>
	<div class="scroll-indicator">
		<span>Gulir ke bawah</span>
		<div class="scroll-line"></div>
	</div>
</section>
