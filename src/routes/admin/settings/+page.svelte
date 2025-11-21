<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAllSettings, bulkUpdateSettings } from '$lib/api/setting';
	import type { Setting } from '$lib/types/setting';

	let user = $state<any>(null);
	let token = $state<string>('');
	let settings = $state<Setting[]>([]);
	let loading = $state(true);
	let saving = $state(false);
	let error = $state<string | null>(null);
	let success = $state(false);

	// Group settings by category
	let settingsByCategory = $derived.by(() => {
		const grouped: Record<string, Setting[]> = {};
		settings.forEach((setting) => {
			if (!grouped[setting.category]) {
				grouped[setting.category] = [];
			}
			grouped[setting.category].push(setting);
		});
		return grouped;
	});

	// Category labels
	const categoryLabels: Record<string, { title: string; icon: string }> = {
		contact: { title: 'Informasi Kontak', icon: '📞' },
		company: { title: 'Informasi Perusahaan', icon: '🏢' },
		social: { title: 'Media Sosial', icon: '📱' },
		seo: { title: 'SEO & Meta Tags', icon: '🔍' },
		business: { title: 'Jam Operasional', icon: '🕐' }
	};

	onMount(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!storedToken || !storedUser) {
			goto('/admin');
			return;
		}

		token = storedToken;
		user = JSON.parse(storedUser);

		loadSettings();
	});

	async function loadSettings() {
		loading = true;
		error = null;

		try {
			settings = await getAllSettings(token);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat pengaturan';
			console.error('Load error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		success = false;
		saving = true;

		try {
			// Prepare updates object
			const updates: Record<string, string> = {};
			settings.forEach((setting) => {
				updates[setting.key] = setting.value;
			});

			await bulkUpdateSettings(updates, token);
			success = true;

			// Hide success message after 3 seconds
			setTimeout(() => {
				success = false;
			}, 3000);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menyimpan pengaturan';
			console.error('Save error:', e);
		} finally {
			saving = false;
		}
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Pengaturan - Admin Teras Interior</title>
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
			<a href="/admin/services" class="nav-link">Layanan</a>
			<a href="/admin/contacts" class="nav-link">Pesan Kontak</a>
			<a href="/admin/settings" class="nav-link active">Pengaturan</a>
		</div>
	</nav>

	<main class="dashboard-main">
		<div class="container">
			<div class="page-header">
				<h2>Pengaturan Website</h2>
			</div>

			{#if success}
				<div class="success-banner">
					<span>✓</span>
					<p>Pengaturan berhasil disimpan!</p>
				</div>
			{/if}

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
					<p>Memuat pengaturan...</p>
				</div>
			{:else}
				<form class="settings-form" onsubmit={handleSubmit}>
					{#each Object.entries(settingsByCategory) as [category, categorySettings]}
						<div class="settings-section">
							<div class="section-header">
								<span class="section-icon">{categoryLabels[category]?.icon || '⚙️'}</span>
								<h3>{categoryLabels[category]?.title || category}</h3>
							</div>

							<div class="settings-grid">
								{#each categorySettings as setting}
									<div class="form-group">
										<label for={setting.key}>
											{setting.label}
											{#if setting.description}
												<span class="help-text">{setting.description}</span>
											{/if}
										</label>

										{#if setting.input_type === 'textarea'}
											<textarea
												id={setting.key}
												bind:value={setting.value}
												rows="3"
												disabled={saving}
											></textarea>
										{:else}
											<input
												id={setting.key}
												type={setting.input_type}
												bind:value={setting.value}
												disabled={saving}
											/>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each}

					<div class="form-actions">
						<button type="submit" class="btn-save" disabled={saving}>
							{#if saving}
								<span class="spinner-small"></span>
								<span>Menyimpan...</span>
							{:else}
								<span>💾 Simpan Pengaturan</span>
							{/if}
						</button>
					</div>
				</form>
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
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.page-header {
		margin-bottom: 30px;
	}

	.page-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.success-banner {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 20px;
		background: rgba(76, 175, 80, 0.1);
		border: 1px solid rgba(76, 175, 80, 0.3);
		border-radius: 10px;
		color: #4caf50;
		margin-bottom: 20px;
		animation: slideIn 0.3s ease;
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

	.error-banner p,
	.success-banner p {
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

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	.settings-form {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.settings-section {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 20px 25px;
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.section-icon {
		font-size: 24px;
	}

	.section-header h3 {
		font-size: 18px;
		color: white;
		margin: 0;
	}

	.settings-grid {
		padding: 25px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	label {
		color: #b0b0b0;
		font-size: 14px;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.help-text {
		font-size: 12px;
		font-weight: 400;
		color: #888;
	}

	input,
	textarea {
		width: 100%;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #ff6b35;
		background: rgba(255, 255, 255, 0.08);
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		padding: 20px 0;
	}

	.btn-save {
		padding: 14px 32px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		border: none;
		border-radius: 8px;
		color: white;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.btn-save:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
	}

	.btn-save:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinner-small {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@media (max-width: 768px) {
		.settings-grid {
			padding: 20px;
		}

		.section-header {
			padding: 15px 20px;
		}
	}
</style>
