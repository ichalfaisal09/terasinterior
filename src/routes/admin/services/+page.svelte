<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAllServices, deleteService } from '$lib/api/service';
	import type { Service } from '$lib/types/service';

	let user = $state<any>(null);
	let token = $state<string>('');
	let services = $state<Service[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let deleteConfirm = $state<number | null>(null);

	onMount(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!storedToken || !storedUser) {
			goto('/admin');
			return;
		}

		token = storedToken;
		user = JSON.parse(storedUser);

		loadServices();
	});

	async function loadServices() {
		loading = true;
		error = null;

		try {
			services = await getAllServices(false); // Load all including unpublished
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat layanan';
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
			await deleteService(id, token);
			services = services.filter((s) => s.id !== id);
			deleteConfirm = null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menghapus layanan';
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
	<title>Kelola Layanan - Admin Teras Interior</title>
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
			<a href="/admin/dashboard" class="nav-link">Portfolio</a>
			<a href="/admin/services" class="nav-link active">Layanan</a>
			<a href="/admin/contacts" class="nav-link">Pesan Kontak</a>
			<a href="/admin/settings" class="nav-link">Pengaturan</a>
		</div>
	</nav>

	<main class="dashboard-main">
		<div class="container">
			<div class="page-header">
				<h2>Kelola Layanan</h2>
				<a href="/admin/services/create" class="btn btn-primary">+ Tambah Layanan</a>
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
					<p>Memuat layanan...</p>
				</div>
			{:else if services.length === 0}
				<div class="empty-state">
					<span class="empty-icon">📦</span>
					<h3>Belum Ada Layanan</h3>
					<p>Mulai tambahkan layanan pertama Anda</p>
					<a href="/admin/services/create" class="btn btn-primary">+ Tambah Layanan</a>
				</div>
			{:else}
				<div class="services-grid">
					{#each services as service}
						<div class="service-card" class:draft={!service.published}>
							<div class="card-header">
								<div class="service-icon-large">{service.icon}</div>
								{#if !service.published}
									<span class="draft-badge">Draft</span>
								{/if}
							</div>
							<div class="card-body">
								<h3>{service.title}</h3>
								<p class="description">{service.description}</p>
								{#if service.features && service.features.length > 0}
									<div class="features">
										<strong>Fitur:</strong>
										<ul>
											{#each service.features.slice(0, 3) as feature}
												<li>{feature}</li>
											{/each}
											{#if service.features.length > 3}
												<li class="more">+{service.features.length - 3} lainnya</li>
											{/if}
										</ul>
									</div>
								{/if}
							</div>
							<div class="card-footer">
								<span class="order-badge">Urutan: {service.display_order}</span>
								<div class="card-actions">
									<a href="/admin/services/{service.id}/edit" class="btn-edit">✏️ Edit</a>
									<button
										class="btn-delete"
										class:confirm={deleteConfirm === service.id}
										onclick={() => handleDelete(service.id)}
									>
										{deleteConfirm === service.id ? '✓ Konfirmasi' : '🗑️ Hapus'}
									</button>
								</div>
							</div>
						</div>
					{/each}
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

	.btn {
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		display: inline-block;
	}

	.btn-primary {
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border: none;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
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

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 25px;
	}

	.service-card {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.service-card:hover {
		border-color: #ff6b35;
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
	}

	.service-card.draft {
		opacity: 0.7;
		border-style: dashed;
	}

	.card-header {
		padding: 25px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background: rgba(255, 255, 255, 0.02);
	}

	.service-icon-large {
		font-size: 48px;
	}

	.draft-badge {
		padding: 4px 12px;
		background: rgba(255, 193, 7, 0.2);
		border: 1px solid rgba(255, 193, 7, 0.4);
		border-radius: 20px;
		color: #ffc107;
		font-size: 12px;
		font-weight: 600;
	}

	.card-body {
		padding: 0 25px 25px;
	}

	.card-body h3 {
		font-size: 20px;
		color: white;
		margin: 0 0 12px 0;
	}

	.description {
		color: #b0b0b0;
		line-height: 1.6;
		margin: 0 0 15px 0;
	}

	.features {
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.features strong {
		color: #ff6b35;
		font-size: 13px;
		display: block;
		margin-bottom: 8px;
	}

	.features ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.features li {
		padding: 4px 0;
		color: #888;
		font-size: 13px;
	}

	.features li.more {
		color: #ff6b35;
		font-style: italic;
	}

	.card-footer {
		padding: 15px 25px;
		background: rgba(255, 255, 255, 0.02);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order-badge {
		font-size: 12px;
		color: #888;
	}

	.card-actions {
		display: flex;
		gap: 10px;
	}

	.btn-edit,
	.btn-delete {
		padding: 8px 16px;
		border-radius: 6px;
		font-size: 13px;
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
	}

	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
		}

		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}
	}
</style>
