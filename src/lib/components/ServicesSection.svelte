<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedBackground from './AnimatedBackground.svelte';
	import WaveBackground from './WaveBackground.svelte';
	import { getAllServices } from '$lib/api/service';
	import type { Service } from '$lib/types/service';

	let services = $state<Service[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			services = await getAllServices(true);
		} catch (error) {
			console.error('Failed to load services:', error);
		} finally {
			loading = false;
		}
	});
</script>

<section id="services" class="services">
	<AnimatedBackground variant="subtle" />
	<WaveBackground color="#f7931e" />
	<div class="container">
		<div class="section-header">
			<div class="section-label">Our Services</div>
			<h2 class="section-title">Layanan Eksklusif Kami</h2>
		</div>
		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Memuat layanan...</p>
			</div>
		{:else if services.length === 0}
			<div class="empty-state">
				<p>Belum ada layanan tersedia</p>
			</div>
		{:else}
			<div class="services-grid">
				{#each services as service}
					<div class="service-card">
						<div class="service-icon">{service.icon}</div>
						<h3 class="service-title">{service.title}</h3>
						<p class="service-description">{service.description}</p>
						{#if service.features && service.features.length > 0}
							<ul class="service-features">
								{#each service.features.slice(0, 3) as feature}
									<li>✓ {feature}</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.loading-state,
	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: #b0b0b0;
	}

	.spinner {
		width: 40px;
		height: 40px;
		margin: 0 auto 20px;
		border: 4px solid rgba(255, 255, 255, 0.1);
		border-top: 4px solid #ff6b35;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 20px 0 0 0;
	}

	.service-features li {
		padding: 8px 0;
		color: #b0b0b0;
		font-size: 14px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.service-features li:first-child {
		border-top: none;
		padding-top: 0;
	}
</style>
