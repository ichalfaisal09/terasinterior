<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublicSettings } from '$lib/api/setting';
	
	let companyName = $state('TERAS INTERIOR');
	let companyTagline = $state('Premium Interior Design Studio');
	let socialInstagram = $state('https://instagram.com/terasinterior');
	let socialFacebook = $state('https://facebook.com/terasinterior');
	let socialYoutube = $state('');
	let socialTiktok = $state('');
	let contactWhatsapp = $state('6281xxxxxxxx');
	
	onMount(async () => {
		try {
			const settings = await getPublicSettings();
			if (settings.company_name) companyName = settings.company_name.toUpperCase();
			if (settings.company_tagline) companyTagline = settings.company_tagline;
			if (settings.social_instagram) socialInstagram = settings.social_instagram;
			if (settings.social_facebook) socialFacebook = settings.social_facebook;
			if (settings.social_youtube) socialYoutube = settings.social_youtube;
			if (settings.social_tiktok) socialTiktok = settings.social_tiktok;
			if (settings.contact_whatsapp) contactWhatsapp = settings.contact_whatsapp;
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<div class="logo">
					<span class="logo-icon">◆</span>
					<span class="logo-text">{companyName}</span>
				</div>
				<p>{companyTagline}</p>
			</div>
			<div class="footer-social">
				{#if socialInstagram}
					<a href={socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
				{/if}
				{#if socialFacebook}
					<a href={socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
				{/if}
				{#if socialYoutube}
					<a href={socialYoutube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
				{/if}
				{#if socialTiktok}
					<a href={socialTiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">TikTok</a>
				{/if}
				<a href="https://wa.me/{contactWhatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
		</div>
	</div>
</footer>
