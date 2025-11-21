<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAllPortfolio, deletePortfolio } from '$lib/api/portfolio';
	import type { Portfolio } from '$lib/types/portfolio';

	let user = $state<any>(null);
	let token = $state<string>('');
	let portfolios = $state<Portfolio[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let deleteConfirm = $state<number | null>(null);

	onMount(() => {
		// Check authentication
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!storedToken || !storedUser) {
			goto('/admin');
			return;
		}

		token = storedToken;
		user = JSON.parse(storedUser);

		loadPortfolios();
	});

	async function loadPortfolios() {
		loading = true;
		error = null;

		try {
			portfolios = await getAllPortfolio(token);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat portfolio';
			console.error('Load error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleDelete(id: number) {
		if (deleteConfirm !== id) {
			deleteConfirm = id;
			setTimeout(() => {
				deleteConfirm = null;
			}, 3000);
			return;
		}

		try {
			await deletePortfolio(id, token);
			portfolios = portfolios.filter((p) => p.id !== id);
			deleteConfirm = null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menghapus portfolio';
			console.error('Delete error:', e);
		}
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Dashboard - Teras Interior Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="dashboard">
	<header class="dashboard-header">
		<div class="header-content">
			<div class="logo">
				<span class="logo-icon">🏠</span>
				<h1>Teras Interior</h1>
			</div>
			<div class="user-menu">
				<span class="user-name">👤 {user?.name || user?.email}</span>
				<button class="logout-button" onclick={handleLogout}>Keluar</button>
			</div>
		</div>
	</header>

	<nav class="dashboard-nav">
		<div class="container">
			<a href="/admin/dashboard" class="nav-link active">Portfolio</a>
			<a href="/admin/services" class="nav-link">Layanan</a>
			<a href="/admin/contacts" class="nav-link">Pesan Kontak</a>
			<a href="/admin/settings" class="nav-link">Pengaturan</a>
		</div>
	</nav>

	<main class="dashboard-main">
		<div class="container">
			<div class="page-header">
				<h2>Manajemen Portfolio</h2>
				<a href="/admin/portfolio/new" class="btn-primary">+ Tambah Portfolio Baru</a>
			</div>

			{#if error}
				<div class="error-banner">
					<span>⚠️</span>
					<p>{error}</p>
					<button onclick={() => (error = null)}>✕</button>
				</div>
			{/if}

			{#if loading}
				<div class="loading-state">
					<div class="spinner"></div>
					<p>Memuat portfolio...</p>
				</div>
			{:else if portfolios.length === 0}
				<div class="empty-state">
					<span class="empty-icon">📁</span>
					<h3>Tidak Ada Item Portfolio</h3>
					<p>Mulai dengan menambahkan item portfolio pertama Anda</p>
					<a href="/admin/portfolio/new" class="btn-primary">Tambah Portfolio</a>
				</div>
			{:else}
				<div class="portfolio-table">
					<table>
						<thead>
							<tr>
								<th>Gambar</th>
								<th>Judul</th>
								<th>Kategori</th>
								<th>Status</th>
								<th>Urutan</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{#each portfolios as portfolio}
								<tr>
									<td>
										<img
											src={portfolio.image_url}
											alt={portfolio.title}
											class="thumbnail"
											loading="lazy"
										/>
									</td>
									<td>
										<div class="title-cell">
											<strong>{portfolio.title}</strong>
											{#if portfolio.description}
												<span class="description">{portfolio.description.slice(0, 60)}...</span>
											{/if}
										</div>
									</td>
									<td>
										<span class="category-badge">{portfolio.category}</span>
									</td>
									<td>
										<span class="status-badge" class:published={portfolio.published}>
											{portfolio.published ? '✓ Dipublikasi' : '✗ Draft'}
										</span>
									</td>
									<td>{portfolio.order_index}</td>
									<td>
										<div class="actions">
											<a href="/admin/portfolio/{portfolio.id}/edit" class="btn-edit">Edit</a>
											<button
												class="btn-delete"
												class:confirm={deleteConfirm === portfolio.id}
												onclick={() => handleDelete(portfolio.id)}
											>
												{deleteConfirm === portfolio.id ? 'Konfirmasi?' : 'Hapus'}
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="stats">
					<div class="stat-card">
						<span class="stat-value">{portfolios.length}</span>
						<span class="stat-label">Total Item</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{portfolios.filter((p) => p.published).length}</span>
						<span class="stat-label">Dipublikasi</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{portfolios.filter((p) => !p.published).length}</span>
						<span class="stat-label">Draft</span>
					</div>
				</div>
			{/if}
		</div>
	</main>
</div>

<style>
	.dashboard {
		min-height: 100vh;
		background: #0a0a0a;
	}

	.dashboard-header {
		background: #1a1a1a;
		border-bottom: none;
		padding: 20px 0 0 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.dashboard-nav {
		background: #1a1a1a;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0;
	}

	.dashboard-nav .container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		gap: 30px;
	}

	.nav-link {
		padding: 15px 0;
		color: #b0b0b0;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		border-bottom: 2px solid transparent;
		transition: all 0.3s ease;
	}

	.nav-link:hover {
		color: white;
	}

	.nav-link.active {
		color: #ff6b35;
		border-bottom-color: #ff6b35;
	}

	.header-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-icon {
		font-size: 32px;
	}

	.logo h1 {
		font-size: 24px;
		font-weight: 700;
		color: white;
		margin: 0;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.user-name {
		color: #b0b0b0;
		font-size: 14px;
	}

	.logout-button {
		padding: 8px 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.logout-button:hover {
		background: rgba(255, 107, 53, 0.1);
		border-color: #ff6b35;
		color: #ff6b35;
	}

	.dashboard-main {
		padding: 40px 0;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.page-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.btn-primary {
		padding: 12px 24px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		display: inline-block;
		transition: all 0.3s ease;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
	}

	.error-banner {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 20px;
		background: rgba(255, 107, 107, 0.1);
		border: 1px solid rgba(255, 107, 107, 0.3);
		border-radius: 10px;
		color: #ff6b6b;
		margin-bottom: 20px;
	}

	.error-banner p {
		flex: 1;
		margin: 0;
	}

	.error-banner button {
		background: none;
		border: none;
		color: #ff6b6b;
		cursor: pointer;
		font-size: 18px;
		padding: 5px;
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

	.empty-state {
		text-align: center;
		padding: 80px 20px;
		color: #b0b0b0;
	}

	.empty-icon {
		font-size: 64px;
		display: block;
		margin-bottom: 20px;
	}

	.empty-state h3 {
		font-size: 24px;
		color: white;
		margin: 0 0 10px 0;
	}

	.empty-state p {
		margin: 0 0 30px 0;
	}

	.portfolio-table {
		background: #1a1a1a;
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 30px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: rgba(255, 255, 255, 0.05);
	}

	th {
		padding: 15px 20px;
		text-align: left;
		font-size: 14px;
		font-weight: 600;
		color: #b0b0b0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	td {
		padding: 15px 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		color: white;
	}

	.thumbnail {
		width: 80px;
		height: 60px;
		object-fit: cover;
		border-radius: 8px;
	}

	.title-cell {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.title-cell strong {
		color: white;
	}

	.description {
		font-size: 13px;
		color: #b0b0b0;
	}

	.category-badge {
		display: inline-block;
		padding: 5px 12px;
		background: rgba(255, 107, 53, 0.1);
		border: 1px solid rgba(255, 107, 53, 0.3);
		border-radius: 6px;
		font-size: 12px;
		color: #ff6b35;
		font-weight: 600;
	}

	.status-badge {
		display: inline-block;
		padding: 5px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		font-size: 12px;
		color: #b0b0b0;
		font-weight: 600;
	}

	.status-badge.published {
		background: rgba(76, 175, 80, 0.1);
		border-color: rgba(76, 175, 80, 0.3);
		color: #4caf50;
	}

	.actions {
		display: flex;
		gap: 10px;
	}

	.btn-edit,
	.btn-delete {
		padding: 6px 16px;
		border-radius: 6px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		border: none;
	}

	.btn-edit {
		background: rgba(33, 150, 243, 0.1);
		border: 1px solid rgba(33, 150, 243, 0.3);
		color: #2196f3;
	}

	.btn-edit:hover {
		background: rgba(33, 150, 243, 0.2);
	}

	.btn-delete {
		background: rgba(244, 67, 54, 0.1);
		border: 1px solid rgba(244, 67, 54, 0.3);
		color: #f44336;
	}

	.btn-delete:hover {
		background: rgba(244, 67, 54, 0.2);
	}

	.btn-delete.confirm {
		background: #f44336;
		color: white;
		animation: pulse 0.5s ease;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}

	.stat-card {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 30px;
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 48px;
		font-weight: 700;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 10px;
	}

	.stat-label {
		display: block;
		font-size: 14px;
		color: #b0b0b0;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	@media (max-width: 968px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		.portfolio-table {
			overflow-x: auto;
		}

		table {
			min-width: 800px;
		}
	}

	@media (max-width: 640px) {
		.header-content {
			flex-direction: column;
			gap: 15px;
		}

		.user-menu {
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
