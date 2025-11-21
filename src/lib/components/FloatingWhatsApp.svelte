<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublicSettings } from '$lib/api/setting';
	
	// WhatsApp Configuration
	let WHATSAPP_NUMBER = $state('6281xxxxxxxx');
	let COMPANY_NAME = $state('Teras Interior');
	const DEFAULT_MESSAGE = $derived(`Halo ${COMPANY_NAME}, saya tertarik dengan layanan desain interior Anda.`);
	
	onMount(async () => {
		try {
			const settings = await getPublicSettings();
			if (settings.contact_whatsapp) {
				WHATSAPP_NUMBER = settings.contact_whatsapp;
			}
			if (settings.company_name) {
				COMPANY_NAME = settings.company_name;
			}
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
	
	let isOpen = $state(false);
	let showTooltip = $state(true);
	
	// Hide tooltip after 5 seconds
	$effect(() => {
		if (showTooltip) {
			const timer = setTimeout(() => {
				showTooltip = false;
			}, 5000);
			return () => clearTimeout(timer);
		}
	});
	
	function openWhatsApp(message: string = DEFAULT_MESSAGE) {
		const encodedMessage = encodeURIComponent(message);
		const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
		window.open(url, '_blank');
		isOpen = false;
	}
	
	function toggleMenu() {
		isOpen = !isOpen;
		showTooltip = false;
	}
	
	const quickMessages = [
		{
			icon: '🏠',
			title: 'Konsultasi Desain',
			message: 'Halo, saya ingin konsultasi tentang desain interior untuk rumah saya.'
		},
		{
			icon: '💰',
			title: 'Tanya Harga',
			message: 'Halo, saya ingin menanyakan estimasi biaya untuk proyek desain interior.'
		},
		{
			icon: '📐',
			title: 'Renovasi',
			message: 'Halo, saya ingin berkonsultasi tentang renovasi dan desain ulang ruangan.'
		},
		{
			icon: '🏢',
			title: 'Proyek Komersial',
			message: 'Halo, saya tertarik dengan layanan desain interior untuk proyek komersial.'
		}
	];
</script>

<div class="whatsapp-widget">
	{#if isOpen}
		<div class="whatsapp-menu">
			<div class="menu-header">
				<div class="header-content">
					<div class="avatar">
						<span>🏠</span>
					</div>
					<div class="header-text">
						<h4>{COMPANY_NAME}</h4>
						<p>Biasanya membalas dalam beberapa menit</p>
					</div>
				</div>
				<button class="close-btn" onclick={toggleMenu} aria-label="Tutup">✕</button>
			</div>
			<div class="menu-body">
				<p class="menu-intro">Halo! 👋 Pilih topik yang ingin Anda diskusikan:</p>
				<div class="quick-messages">
					{#each quickMessages as msg}
						<button class="quick-message-btn" onclick={() => openWhatsApp(msg.message)}>
							<span class="msg-icon">{msg.icon}</span>
							<span class="msg-title">{msg.title}</span>
						</button>
					{/each}
				</div>
				<button class="custom-message-btn" onclick={() => openWhatsApp()}>
					<span>💬</span>
					<span>Kirim Pesan Custom</span>
				</button>
			</div>
		</div>
	{/if}
	
	{#if showTooltip && !isOpen}
		<div class="tooltip">
			<p>Ada yang bisa kami bantu? 😊</p>
		</div>
	{/if}
	
	<button 
		class="whatsapp-float" 
		class:active={isOpen}
		onclick={toggleMenu}
		aria-label="Chat WhatsApp"
	>
		{#if isOpen}
			<span class="close-icon">✕</span>
		{:else}
			<svg viewBox="0 0 32 32" fill="currentColor">
				<path d="M16 0C7.164 0 0 7.164 0 16c0 2.828.736 5.484 2.016 7.792L0 32l8.384-2.016C10.692 31.264 13.348 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.496 0-4.864-.672-6.912-1.856l-.496-.288-5.152 1.248 1.28-4.992-.32-.512C2.688 20.896 2.016 18.496 2.016 16c0-7.728 6.272-14 14-14s14 6.272 14 14-6.272 13.344-14 13.344zm7.68-10.016c-.416-.208-2.464-1.216-2.848-1.36-.384-.128-.672-.192-.944.208-.272.416-1.056 1.36-1.296 1.632-.24.272-.48.304-.896.096-.416-.208-1.76-.656-3.36-2.08-1.232-1.104-2.064-2.464-2.304-2.88-.24-.416-.016-.64.176-.848.192-.192.416-.496.624-.752.208-.24.272-.416.416-.688.128-.272.064-.512-.032-.72-.096-.208-.944-2.272-1.296-3.104-.336-.8-.672-.688-.944-.688-.24 0-.512-.032-.784-.032s-.72.096-1.104.512c-.384.416-1.472 1.44-1.472 3.52s1.504 4.08 1.712 4.352c.208.272 2.944 4.496 7.136 6.304 1.008.432 1.792.688 2.4.88.992.32 1.904.272 2.624.16.8-.128 2.464-1.008 2.816-1.984.352-.976.352-1.808.24-1.984-.096-.192-.368-.304-.784-.512z"/>
			</svg>
			<span class="pulse-ring"></span>
		{/if}
	</button>
</div>

<style>
	.whatsapp-widget {
		position: fixed;
		bottom: 30px;
		right: 30px;
		z-index: 1000;
	}

	.whatsapp-float {
		position: relative;
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #25d366, #128c7e);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: pointer;
		border: none;
		box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
		transition: all 0.3s ease;
		animation: bounce 2s infinite;
	}

	.whatsapp-float:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
	}

	.whatsapp-float.active {
		background: #dc3545;
		animation: none;
	}

	.whatsapp-float svg {
		width: 32px;
		height: 32px;
	}

	.close-icon {
		font-size: 28px;
		font-weight: 300;
	}

	.pulse-ring {
		position: absolute;
		width: 100%;
		height: 100%;
		border: 3px solid #25d366;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	.tooltip {
		position: absolute;
		bottom: 100px;
		right: 0;
		background: white;
		color: #333;
		padding: 12px 16px;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		white-space: nowrap;
		animation: slideIn 0.3s ease;
	}

	.tooltip::after {
		content: '';
		position: absolute;
		bottom: -8px;
		right: 20px;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid white;
	}

	.tooltip p {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
	}

	.whatsapp-menu {
		position: absolute;
		bottom: 80px;
		right: 0;
		width: 320px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.menu-header {
		background: linear-gradient(135deg, #25d366, #128c7e);
		padding: 20px;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.header-content {
		display: flex;
		gap: 12px;
		flex: 1;
	}

	.avatar {
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
	}

	.header-text h4 {
		margin: 0 0 4px 0;
		font-size: 16px;
		font-weight: 600;
	}

	.header-text p {
		margin: 0;
		font-size: 12px;
		opacity: 0.9;
	}

	.close-btn {
		background: none;
		border: none;
		color: white;
		font-size: 24px;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.3s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.menu-body {
		padding: 20px;
	}

	.menu-intro {
		margin: 0 0 15px 0;
		color: #333;
		font-size: 14px;
		line-height: 1.5;
	}

	.quick-messages {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 15px;
	}

	.quick-message-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: #f5f5f5;
		border: 1px solid #e0e0e0;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		width: 100%;
	}

	.quick-message-btn:hover {
		background: #e8f5e9;
		border-color: #25d366;
		transform: translateX(5px);
	}

	.msg-icon {
		font-size: 24px;
	}

	.msg-title {
		color: #333;
		font-size: 14px;
		font-weight: 500;
	}

	.custom-message-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 14px;
		background: linear-gradient(135deg, #25d366, #128c7e);
		border: none;
		border-radius: 10px;
		color: white;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.custom-message-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
	}

	@media (max-width: 640px) {
		.whatsapp-widget {
			bottom: 20px;
			right: 20px;
		}

		.whatsapp-menu {
			width: calc(100vw - 40px);
			right: -10px;
		}

		.whatsapp-float {
			width: 56px;
			height: 56px;
		}

		.whatsapp-float svg {
			width: 28px;
			height: 28px;
		}
	}
</style>
