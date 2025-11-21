<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublicSettings } from '$lib/api/setting';
	
	let whatsappNumber = $state('6281xxxxxxxx');
	
	onMount(async () => {
		try {
			const settings = await getPublicSettings();
			if (settings.contact_whatsapp) {
				whatsappNumber = settings.contact_whatsapp;
			}
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
</script>

<section class="cta-section">
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-title">Siap Mewujudkan Ruang Impian Anda?</h2>
			<p class="cta-text">
				Dapatkan konsultasi gratis dan penawaran terbaik untuk proyek desain interior Anda. 
				Tim kami siap membantu mewujudkan visi Anda menjadi kenyataan.
			</p>
			<div class="cta-buttons">
				<a href="#contact" class="btn btn-primary btn-large">Konsultasi Gratis</a>
				<a href="https://wa.me/{whatsappNumber}" class="btn btn-whatsapp btn-large">
					<span class="whatsapp-icon">📱</span> WhatsApp Kami
				</a>
			</div>
		</div>
	</div>
</section>
