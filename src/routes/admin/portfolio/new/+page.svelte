<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import PortfolioForm from '$lib/components/PortfolioForm.svelte';
	import { createPortfolio } from '$lib/api/portfolio';
	import type { PortfolioCreate } from '$lib/types/portfolio';

	let token = $state('');

	onMount(() => {
		const storedToken = localStorage.getItem('token');
		if (!storedToken) {
			goto('/admin');
		} else {
			token = storedToken;
		}
	});

	async function handleSubmit(data: PortfolioCreate) {
		await createPortfolio(data, token);
		goto('/admin/dashboard');
	}

	function handleCancel() {
		goto('/admin/dashboard');
	}
</script>

<svelte:head>
	<title>Tambah Portfolio - Admin Teras Interior</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="page">
	<div class="container">
		<div class="header">
			<h1>Tambah Portfolio Baru</h1>
			<a href="/admin/dashboard" class="btn-back">← Kembali ke Dashboard</a>
		</div>

		<PortfolioForm onSubmit={handleSubmit} onCancel={handleCancel} submitLabel="Buat Portfolio" />
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

	.coming-soon {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 80px 40px;
		text-align: center;
	}

	.icon {
		font-size: 64px;
		display: block;
		margin-bottom: 20px;
	}

	.coming-soon h2 {
		font-size: 28px;
		color: white;
		margin: 0 0 15px 0;
	}

	.coming-soon p {
		color: #b0b0b0;
		margin: 0 0 10px 0;
		font-size: 16px;
	}

	.note {
		font-size: 14px;
		color: #666;
		margin-top: 20px;
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

		.coming-soon {
			padding: 60px 30px;
		}
	}
</style>
