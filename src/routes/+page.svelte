<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublicSettings } from '$lib/api/setting';
	import MouseSpotlight from '$lib/components/MouseSpotlight.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ServicesSection from '$lib/components/ServicesSection.svelte';
	import PortfolioSection from '$lib/components/PortfolioSection.svelte';
	import WhyChooseSection from '$lib/components/WhyChooseSection.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import ProcessSection from '$lib/components/ProcessSection.svelte';
	import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let scrollY = $state(0);
	let isMenuOpen = $state(false);
	
	// SEO Settings
	let seoTitle = $state('Teras Interior - Premium Interior Design Makassar');
	let seoDescription = $state('Jasa desain interior premium di Makassar. Wujudkan ruang impian Anda dengan sentuhan profesional dan estetika tinggi.');
	let seoKeywords = $state('desain interior, interior design, makassar, renovasi, furniture custom');
	
	onMount(async () => {
		// Load SEO settings
		try {
			const settings = await getPublicSettings();
			if (settings.seo_title) seoTitle = settings.seo_title;
			if (settings.seo_description) seoDescription = settings.seo_description;
			if (settings.seo_keywords) seoKeywords = settings.seo_keywords;
		} catch (error) {
			console.error('Failed to load SEO settings:', error);
		}
		
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		
		// Smooth scroll for anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				const href = this.getAttribute('href');
				if (href && href !== '#') {
					e.preventDefault();
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({ behavior: 'smooth', block: 'start' });
						isMenuOpen = false;
					}
				}
			});
		});
		
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<meta name="keywords" content={seoKeywords} />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="twitter:title" content={seoTitle} />
	<meta property="twitter:description" content={seoDescription} />
</svelte:head>

<div class="website">
	<MouseSpotlight />
	<Navigation bind:scrollY bind:isMenuOpen />
	<HeroSection />
	<AboutSection />
	<ServicesSection />
	<PortfolioSection />
	<WhyChooseSection />
	<StatsSection />
	<ProcessSection />
	<TestimonialsSection />
	<CTASection />
	<ContactSection />
	<FloatingWhatsApp />
	<Footer />
</div>
