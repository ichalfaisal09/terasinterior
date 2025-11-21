<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import PortfolioForm from '$lib/components/PortfolioForm.svelte';
	import { getPortfolioById, updatePortfolio } from '$lib/api/portfolio';
	import type { Portfolio, PortfolioUpdate } from '$lib/types/portfolio';

	let token = $state('');
	let portfolioId = $derived(parseInt($page.params.id));
	let portfolio = $state<Portfolio | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		const storedToken = localStorage.getItem('token');
		if (!storedToken) {
			goto('/admin');
			return;
		}

		token = storedToken;

		try {
			portfolio = await getPortfolioById(portfolioId);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat portfolio';
			console.error('Load error:', e);
		} finally {
			loading = false;
		}
	});

	async function handleSubmit(data: PortfolioUpdate) {
		await updatePortfolio(portfolioId, data, token);
		goto('/admin/dashboard');
	}

	function handleCancel() {
		goto('/admin/dashboard');
	}
</script>

<svelte:head>
	<title>Edit Portfolio - Admin Teras Interior</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="page">
	<div class="container">
		<div class="header">
			<h1>Edit Portfolio #{portfolioId}</h1>
			<a href="/admin/dashboard" class="btn-back">← Kembali ke Dashboard</a>
		</div>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Memuat portfolio...</p>
			</div>
		{:else if error}
			<div class="error-state">
				<span class="icon">⚠️</span>
				<h2>Error Memuat Portfolio</h2>
				<p>{error}</p>
				<a href="/admin/dashboard" class="btn-back">← Kembali ke Dashboard</a>
			</div>
		{:else if portfolio}
			<PortfolioForm
				initialData={portfolio}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				submitLabel="Perbarui Portfolio"
			/>
		{/if}
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		background: #0a0a0a;
		padding: 40px 20px;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40px;
	}

	h1 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.btn-back {
		display: inline-block;
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		text-decoration: none;
		font-size: 14px;
		transition: all 0.3s ease;
	}

	.btn-back:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.loading-state {
		text-align: center;
		padding: 80px 20px;
		color: #b0b0b0;
	}

	.spinner {
		width: 50px;
		height: 50px;
		margin: 0 auto 20px;
		border: 4px solid #2a2a2a;
		border-top: 4px solid #ff6b35;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-state {
		text-align: center;
		padding: 80px 40px;
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
	}

	.error-state .icon {
		font-size: 64px;
		display: block;
		margin-bottom: 20px;
	}

	.error-state h2 {
		font-size: 28px;
		color: white;
		margin: 0 0 15px 0;
	}

	.error-state p {
		color: #ff6b6b;
		margin: 0 0 30px 0;
		font-size: 16px;
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		h1 {
			font-size: 24px;
		}
	}
</style>
