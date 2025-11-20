<script lang="ts">
	import { onMount } from 'svelte';
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
	
	onMount(() => {
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
	<title>Teras Interior Production - Premium Interior Design Makassar</title>
	<meta name="description" content="Jasa desain interior premium di Makassar. Wujudkan ruang impian Anda dengan sentuhan profesional dan estetika tinggi." />
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
