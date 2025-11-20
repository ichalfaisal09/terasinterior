<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';
	import GeometricPattern from './GeometricPattern.svelte';

	const projects = [
		{
			title: 'Modern Minimalist Living',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80'
		},
		{
			title: 'Luxury Penthouse',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
		},
		{
			title: 'Contemporary Office',
			category: 'Commercial',
			image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
		},
		{
			title: 'Elegant Dining Space',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
		}
	];
</script>

<section id="portfolio" class="portfolio">
	<AnimatedBackground variant="dark" />
	<GeometricPattern opacity={0.02} />
	<div class="container">
		<div class="section-header">
			<div class="section-label">Portfolio</div>
			<h2 class="section-title">Karya Terpilih Kami</h2>
		</div>
		<div class="portfolio-grid">
			{#each projects as project}
				<div class="portfolio-item">
					<img src={project.image} alt={project.title} />
					<div class="portfolio-overlay">
						<div class="portfolio-category">{project.category}</div>
						<h3 class="portfolio-title">{project.title}</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
