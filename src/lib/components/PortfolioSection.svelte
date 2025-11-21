<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedBackground from './AnimatedBackground.svelte';
	import GeometricPattern from './GeometricPattern.svelte';
	import { getPublishedPortfolio } from '$lib/api/portfolio';
	import type { Portfolio } from '$lib/types/portfolio';

	let portfolios = $state<Portfolio[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			portfolios = await getPublishedPortfolio();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load portfolio';
			console.error('Portfolio fetch error:', e);
		} finally {
			loading = false;
		}
	});
</script>

<section id="portfolio" class="portfolio">
	<AnimatedBackground variant="dark" />
	<GeometricPattern opacity={0.02} />
	<div class="container">
		<div class="section-header">
			<div class="section-label">Portfolio</div>
			<h2 class="section-title">Karya Terpilih Kami</h2>
		</div>

		{#if loading}
			<div class="portfolio-loading">
				<div class="loading-spinner"></div>
				<p>Loading portfolio...</p>
			</div>
		{:else if error}
			<div class="portfolio-error">
				<p>⚠️ {error}</p>
				<button onclick={() => window.location.reload()}>Retry</button>
			</div>
		{:else if portfolios.length === 0}
			<div class="portfolio-empty">
				<p>No portfolio items available yet.</p>
			</div>
		{:else}
			<div class="portfolio-grid">
				{#each portfolios as portfolio}
					<div class="portfolio-item">
						<img src={portfolio.image_url} alt={portfolio.title} loading="lazy" />
						<div class="portfolio-overlay">
							<div class="portfolio-category">{portfolio.category}</div>
							<h3 class="portfolio-title">{portfolio.title}</h3>
							{#if portfolio.description}
								<p class="portfolio-description">{portfolio.description}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.portfolio {
		position: relative;
		padding: 100px 0;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
		overflow: hidden;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		position: relative;
		z-index: 2;
	}

	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-label {
		display: inline-block;
		padding: 8px 20px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.section-title {
		font-size: 48px;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	/* Loading State */
	.portfolio-loading {
		text-align: center;
		padding: 80px 20px;
		color: #b0b0b0;
	}

	.loading-spinner {
		width: 50px;
		height: 50px;
		margin: 0 auto 20px;
		border: 4px solid #2a2a2a;
		border-top: 4px solid #ff6b35;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.portfolio-loading p {
		font-size: 16px;
		color: #b0b0b0;
	}

	/* Error State */
	.portfolio-error {
		text-align: center;
		padding: 80px 20px;
		color: #ff6b6b;
	}

	.portfolio-error p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	.portfolio-error button {
		padding: 12px 30px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border: none;
		border-radius: 25px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.portfolio-error button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
	}

	/* Empty State */
	.portfolio-empty {
		text-align: center;
		padding: 80px 20px;
		color: #b0b0b0;
		font-size: 18px;
	}

	/* Portfolio Grid */
	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 30px;
	}

	.portfolio-item {
		position: relative;
		border-radius: 15px;
		overflow: hidden;
		aspect-ratio: 4/3;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.portfolio-item:hover {
		transform: translateY(-10px);
	}

	.portfolio-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.portfolio-item:hover img {
		transform: scale(1.1);
	}

	.portfolio-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
		transform: translateY(20px);
		opacity: 0;
		transition: all 0.3s ease;
	}

	.portfolio-item:hover .portfolio-overlay {
		transform: translateY(0);
		opacity: 1;
	}

	.portfolio-category {
		display: inline-block;
		padding: 5px 15px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border-radius: 15px;
		font-size: 12px;
		font-weight: 600;
		margin-bottom: 10px;
		text-transform: uppercase;
	}

	.portfolio-title {
		font-size: 24px;
		font-weight: 700;
		color: white;
		margin: 0 0 10px 0;
	}

	.portfolio-description {
		font-size: 14px;
		color: #b0b0b0;
		margin: 0;
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media (max-width: 968px) {
		.portfolio {
			padding: 80px 0;
		}

		.section-title {
			font-size: 36px;
		}

		.portfolio-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 20px;
		}
	}

	@media (max-width: 640px) {
		.portfolio {
			padding: 60px 0;
		}

		.section-title {
			font-size: 28px;
		}

		.portfolio-grid {
			grid-template-columns: 1fr;
		}

		.portfolio-title {
			font-size: 20px;
		}
	}
</style>
