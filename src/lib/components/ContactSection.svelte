<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedBackground from './AnimatedBackground.svelte';
	import { submitContact } from '$lib/api/contact';
	import { getPublicSettings } from '$lib/api/setting';
	import type { ContactCreate } from '$lib/types/contact';
	import type { SettingsPublic } from '$lib/types/setting';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let loading = $state(false);
	let success = $state(false);
	let error = $state<string | null>(null);
	let settings = $state<SettingsPublic>({});

	onMount(async () => {
		try {
			settings = await getPublicSettings();
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		success = false;
		loading = true;

		try {
			const data: ContactCreate = {
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim() || undefined,
				message: message.trim()
			};

			await submitContact(data);
			
			// Reset form
			name = '';
			email = '';
			phone = '';
			message = '';
			success = true;

			// Hide success message after 5 seconds
			setTimeout(() => {
				success = false;
			}, 5000);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal mengirim pesan. Silakan coba lagi.';
			console.error('Contact form error:', e);
		} finally {
			loading = false;
		}
	}
</script>

<section id="contact" class="contact">
	<AnimatedBackground variant="subtle" />
	<div class="container">
		<div class="contact-grid">
			<div class="contact-info">
				<div class="section-label">Get In Touch</div>
				<h2 class="section-title">Mari Wujudkan Ruang Impian Anda</h2>
				<p class="contact-text">
					Hubungi kami untuk konsultasi gratis dan diskusikan proyek desain interior Anda bersama tim profesional kami.
				</p>
				<div class="contact-details">
					<div class="contact-item">
						<div class="contact-icon">📍</div>
						<div>
							<div class="contact-label">Location</div>
							<div class="contact-value">{settings.contact_address || 'Makassar, Sulawesi Selatan'}</div>
						</div>
					</div>
					<div class="contact-item">
						<div class="contact-icon">📧</div>
						<div>
							<div class="contact-label">Email</div>
							<div class="contact-value">{settings.contact_email || 'hello@terasinterior.com'}</div>
						</div>
					</div>
					<div class="contact-item">
						<div class="contact-icon">📱</div>
						<div>
							<div class="contact-label">Phone</div>
							<div class="contact-value">{settings.contact_phone || '+62 811-xxxx-xxxx'}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="contact-form">
				{#if success}
					<div class="success-message">
						<span class="success-icon">✓</span>
						<h3>Pesan Terkirim!</h3>
						<p>Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.</p>
					</div>
				{/if}

				{#if error}
					<div class="error-message">
						<span class="error-icon">⚠️</span>
						<p>{error}</p>
						<button type="button" onclick={() => (error = null)}>✕</button>
					</div>
				{/if}

				<form onsubmit={handleSubmit}>
					<div class="form-group">
						<input
							type="text"
							bind:value={name}
							placeholder="Nama Lengkap"
							required
							disabled={loading}
						/>
					</div>
					<div class="form-group">
						<input
							type="email"
							bind:value={email}
							placeholder="Email"
							required
							disabled={loading}
						/>
					</div>
					<div class="form-group">
						<input
							type="tel"
							bind:value={phone}
							placeholder="Nomor Telepon"
							disabled={loading}
						/>
					</div>
					<div class="form-group">
						<textarea
							bind:value={message}
							placeholder="Ceritakan tentang proyek Anda..."
							rows="5"
							required
							disabled={loading}
						></textarea>
					</div>
					<button type="submit" class="btn btn-primary btn-full" disabled={loading}>
						{#if loading}
							<span class="spinner"></span>
							<span>Mengirim...</span>
						{:else}
							<span>Kirim Pesan</span>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.success-message {
		background: rgba(76, 175, 80, 0.1);
		border: 2px solid #4caf50;
		border-radius: 12px;
		padding: 30px;
		text-align: center;
		margin-bottom: 20px;
		animation: slideIn 0.3s ease;
	}

	.success-icon {
		display: block;
		font-size: 48px;
		color: #4caf50;
		margin-bottom: 15px;
	}

	.success-message h3 {
		font-size: 24px;
		color: #4caf50;
		margin: 0 0 10px 0;
	}

	.success-message p {
		color: #b0b0b0;
		margin: 0;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 20px;
		background: rgba(255, 107, 107, 0.1);
		border: 1px solid rgba(255, 107, 107, 0.3);
		border-radius: 10px;
		color: #ff6b6b;
		margin-bottom: 20px;
		animation: shake 0.5s ease;
	}

	.error-icon {
		font-size: 24px;
	}

	.error-message p {
		flex: 1;
		margin: 0;
	}

	.error-message button {
		background: none;
		border: none;
		color: #ff6b6b;
		cursor: pointer;
		font-size: 20px;
		padding: 5px;
	}

	.spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		margin-right: 8px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-10px);
		}
		75% {
			transform: translateX(10px);
		}
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
