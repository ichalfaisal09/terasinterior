<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';
	import WaveBackground from './WaveBackground.svelte';

	const services = [
		{
			icon: '🏠',
			title: 'Residential Design',
			description: 'Transformasi rumah impian Anda menjadi karya seni yang fungsional dan memukau'
		},
		{
			icon: '🏢',
			title: 'Commercial Design',
			description: 'Desain ruang komersial yang meningkatkan brand value dan produktivitas'
		},
		{
			icon: '✨',
			title: 'Renovation',
			description: 'Pembaruan total yang menghadirkan kehidupan baru pada ruang Anda'
		},
		{
			icon: '🎨',
			title: 'Custom Furniture',
			description: 'Furniture eksklusif yang dirancang khusus sesuai kebutuhan dan gaya Anda'
		}
	];
</script>

<section id="services" class="services">
	<AnimatedBackground variant="subtle" />
	<WaveBackground color="#f7931e" />
	<div class="container">
		<div class="section-header">
			<div class="section-label">Our Services</div>
			<h2 class="section-title">Layanan Eksklusif Kami</h2>
		</div>
		<div class="services-grid">
			{#each services as service}
				<div class="service-card">
					<div class="service-icon">{service.icon}</div>
					<h3 class="service-title">{service.title}</h3>
					<p class="service-description">{service.description}</p>
					<a href="#contact" class="service-link">Learn More →</a>
				</div>
			{/each}
		</div>
	</div>
</section>
