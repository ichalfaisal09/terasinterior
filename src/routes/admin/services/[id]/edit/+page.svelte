<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ServiceForm from '$lib/components/ServiceForm.svelte';
	import { getServiceById, updateService } from '$lib/api/service';
	import type { Service, ServiceUpdate } from '$lib/types/service';

	let user = $state<any>(null);
	let token = $state<string>('');
	let service = $state<Service | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let serviceId = $state<number>(0);

	onMount(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!storedToken || !storedUser) {
			goto('/admin');
			return;
		}

		token = storedToken;
		user = JSON.parse(storedUser);

		// Get service ID from URL
		const id = parseInt($page.params.id);
		if (isNaN(id)) {
			goto('/admin/services');
			return;
		}

		serviceId = id;
		loadService();
	});

	async function loadService() {
		loading = true;
		error = null;

		try {
			service = await getServiceById(serviceId);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat layanan';
			console.error('Load error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleSubmit(data: ServiceUpdate) {
		await updateService(serviceId, data, token);
		goto('/admin/services');
	}

	function handleCancel() {
		goto('/admin/services');
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Edit Layanan - Admin Teras Interior</title>
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
		</div>
	</nav>

	<main class="dashboard-main">
		<div class="container">
			{#if loading}
				<div class="loading-state">
					<div class="spinner"></div>
					<p>Memuat layanan...</p>
				</div>
			{:else if error}
				<div class="error-state">
					<span class="error-icon">⚠️</span>
					<h3>Gagal Memuat Layanan</h3>
					<p>{error}</p>
					<a href="/admin/services" class="btn-back">← Kembali ke Daftar Layanan</a>
				</div>
			{:else if service}
				<div class="page-header">
					<div>
						<a href="/admin/services" class="back-link">← Kembali</a>
						<h2>Edit Layanan</h2>
					</div>
				</div>

				<ServiceForm
					initialData={service}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isEdit={true}
				/>
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
		margin-bottom: 30px;
	}

	.back-link {
		display: inline-block;
		color: #b0b0b0;
		text-decoration: none;
		font-size: 14px;
		margin-bottom: 10px;
		transition: color 0.3s ease;
	}

	.back-link:hover {
		color: #ff6b35;
	}

	.page-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.loading-state,
	.error-state {
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

	.error-icon {
		font-size: 64px;
		display: block;
		margin-bottom: 20px;
	}

	.error-state h3 {
		font-size: 24px;
		color: white;
		margin: 0 0 10px 0;
	}

	.error-state p {
		margin: 0 0 30px 0;
		color: #ff6b6b;
	}

	.btn-back {
		display: inline-block;
		padding: 12px 24px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.btn-back:hover {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
