<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAllContacts, updateContactStatus, deleteContact } from '$lib/api/contact';
	import type { Contact } from '$lib/types/contact';

	let user = $state<any>(null);
	let token = $state<string>('');
	let contacts = $state<Contact[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let deleteConfirm = $state<number | null>(null);
	let expandedMessage = $state<number | null>(null);

	onMount(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!storedToken || !storedUser) {
			goto('/admin');
			return;
		}

		token = storedToken;
		user = JSON.parse(storedUser);

		loadContacts();
	});

	async function loadContacts() {
		loading = true;
		error = null;

		try {
			contacts = await getAllContacts(token);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal memuat kontak';
			console.error('Load error:', e);
		} finally {
			loading = false;
		}
	}

	async function handleStatusChange(id: number, newStatus: string) {
		try {
			await updateContactStatus(id, newStatus, token);
			contacts = contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal mengubah status';
			console.error('Status update error:', e);
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
			await deleteContact(id, token);
			contacts = contacts.filter((c) => c.id !== id);
			deleteConfirm = null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menghapus kontak';
			console.error('Delete error:', e);
		}
	}

	function toggleMessage(id: number) {
		expandedMessage = expandedMessage === id ? null : id;
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/admin');
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Pesan Kontak - Admin Teras Interior</title>
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
			<a href="/admin/contacts" class="nav-link active">Pesan Kontak</a>
			<a href="/admin/settings" class="nav-link">Pengaturan</a>
		</div>
	</nav>

	<main class="dashboard-main">
		<div class="container">
			<div class="page-header">
				<h2>Pesan Kontak</h2>
				<button class="btn-refresh" onclick={loadContacts} disabled={loading}>
					🔄 Refresh
				</button>
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
					<p>Memuat pesan...</p>
				</div>
			{:else if contacts.length === 0}
				<div class="empty-state">
					<span class="empty-icon">📭</span>
					<h3>Belum Ada Pesan</h3>
					<p>Pesan dari contact form akan muncul di sini</p>
				</div>
			{:else}
				<div class="contacts-list">
					{#each contacts as contact}
						<div class="contact-card" class:new={contact.status === 'new'}>
							<div class="contact-header">
								<div class="contact-info-header">
									<h3>{contact.name}</h3>
									<div class="contact-meta">
										<span class="email">📧 {contact.email}</span>
										{#if contact.phone}
											<span class="phone">📱 {contact.phone}</span>
										{/if}
									</div>
								</div>
								<div class="contact-actions">
									<select
										value={contact.status}
										onchange={(e) => handleStatusChange(contact.id, e.currentTarget.value)}
										class="status-select"
									>
										<option value="new">Baru</option>
										<option value="read">Dibaca</option>
										<option value="replied">Dibalas</option>
										<option value="archived">Arsip</option>
									</select>
									<button
										class="btn-delete-small"
										class:confirm={deleteConfirm === contact.id}
										onclick={() => handleDelete(contact.id)}
									>
										{deleteConfirm === contact.id ? '✓' : '🗑️'}
									</button>
								</div>
							</div>

							<div class="contact-message">
								<div
									class="message-preview"
									class:expanded={expandedMessage === contact.id}
									onclick={() => toggleMessage(contact.id)}
								>
									<p>{contact.message}</p>
								</div>
								{#if contact.message.length > 150}
									<button class="btn-expand" onclick={() => toggleMessage(contact.id)}>
										{expandedMessage === contact.id ? 'Tampilkan Lebih Sedikit' : 'Baca Selengkapnya'}
									</button>
								{/if}
							</div>

							<div class="contact-footer">
								<span class="timestamp">🕐 {formatDate(contact.created_at)}</span>
							</div>
						</div>
					{/each}
				</div>

				<div class="stats">
					<div class="stat-card">
						<span class="stat-value">{contacts.length}</span>
						<span class="stat-label">Total Pesan</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{contacts.filter((c) => c.status === 'new').length}</span>
						<span class="stat-label">Baru</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{contacts.filter((c) => c.status === 'replied').length}</span>
						<span class="stat-label">Dibalas</span>
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

	.btn-refresh {
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-refresh:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
	}

	.btn-refresh:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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
		margin: 0;
	}

	.contacts-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 30px;
	}

	.contact-card {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 25px;
		transition: all 0.3s ease;
	}

	.contact-card.new {
		border-color: #ff6b35;
		background: rgba(255, 107, 53, 0.05);
	}

	.contact-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 15px;
		gap: 20px;
	}

	.contact-info-header h3 {
		font-size: 20px;
		color: white;
		margin: 0 0 8px 0;
	}

	.contact-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		font-size: 14px;
		color: #b0b0b0;
	}

	.contact-actions {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.status-select {
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: white;
		font-size: 13px;
		cursor: pointer;
	}

	.btn-delete-small {
		padding: 6px 12px;
		background: rgba(244, 67, 54, 0.1);
		border: 1px solid rgba(244, 67, 54, 0.3);
		border-radius: 6px;
		color: #f44336;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-delete-small:hover {
		background: rgba(244, 67, 54, 0.2);
	}

	.btn-delete-small.confirm {
		background: #f44336;
		color: white;
	}

	.contact-message {
		margin-bottom: 15px;
	}

	.message-preview {
		background: rgba(255, 255, 255, 0.03);
		padding: 15px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.message-preview:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.message-preview p {
		color: #e0e0e0;
		margin: 0;
		line-height: 1.6;
		white-space: pre-wrap;
	}

	.message-preview:not(.expanded) p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.btn-expand {
		margin-top: 10px;
		padding: 6px 16px;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: #ff6b35;
		font-size: 13px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-expand:hover {
		background: rgba(255, 107, 53, 0.1);
	}

	.contact-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 15px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.timestamp {
		font-size: 13px;
		color: #888;
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
		.contact-header {
			flex-direction: column;
		}

		.contact-actions {
			width: 100%;
			justify-content: space-between;
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

		.dashboard-nav .container {
			gap: 15px;
		}

		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}
	}
</style>
