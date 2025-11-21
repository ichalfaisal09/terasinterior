<script lang="ts">
	import { onMount } from 'svelte';
	import ParticlesBackground from './ParticlesBackground.svelte';
	import { getPublicSettings } from '$lib/api/setting';
	
	let companyName = $state('Teras Interior');
	let companyTagline = $state('Premium Interior Design');
	let companyDescription = $state('Transformasi ruang Anda menjadi masterpiece yang mencerminkan kepribadian dan gaya hidup Anda');
	
	onMount(async () => {
		try {
			const settings = await getPublicSettings();
			if (settings.company_name) companyName = settings.company_name;
			if (settings.company_tagline) companyTagline = settings.company_tagline;
			if (settings.company_description) companyDescription = settings.company_description;
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
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
		<div class="hero-badge">{companyTagline}</div>
		<h1 class="hero-title">
			<span class="title-line">Crafting Spaces</span>
			<span class="title-line accent">That Inspire</span>
		</h1>
		<p class="hero-subtitle">
			{companyDescription}
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
