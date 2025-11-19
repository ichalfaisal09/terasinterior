<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import WaveBackground from '$lib/components/WaveBackground.svelte';
	import GeometricPattern from '$lib/components/GeometricPattern.svelte';
	import MouseSpotlight from '$lib/components/MouseSpotlight.svelte';
	
	let scrollY = $state(0);
	let activeSection = $state('home');
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
	
	const projects = [
		{
			title: 'Modern Minimalist Living',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80'
		},
		{
			title: 'Luxury Penthouse',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
		},
		{
			title: 'Contemporary Office',
			category: 'Commercial',
			image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
		},
		{
			title: 'Elegant Dining Space',
			category: 'Residential',
			image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
		}
	];
	
	const services = [
		{
			icon: '🏠',
			title: 'Residential Design',
			description: 'Transformasi rumah impian Anda menjadi karya seni yang fungsional dan memukau'
		},
		{
			icon: '🏢',
			title: 'Commercial Design',
			description: 'Desain ruang komersial yang meningkatkan brand value dan produktivitas'
		},
		{
			icon: '✨',
			title: 'Renovation',
			description: 'Pembaruan total yang menghadirkan kehidupan baru pada ruang Anda'
		},
		{
			icon: '🎨',
			title: 'Custom Furniture',
			description: 'Furniture eksklusif yang dirancang khusus sesuai kebutuhan dan gaya Anda'
		}
	];
	
	const whyChooseUs = [
		{
			number: '01',
			title: 'Desain Eksklusif',
			description: 'Setiap proyek adalah unik, disesuaikan dengan kepribadian dan kebutuhan Anda'
		},
		{
			number: '02',
			title: 'Material Premium',
			description: 'Kami hanya menggunakan material berkualitas tinggi dari supplier terpercaya'
		},
		{
			number: '03',
			title: 'Tim Profesional',
			description: 'Desainer berpengalaman dengan portfolio internasional'
		},
		{
			number: '04',
			title: 'Garansi Kepuasan',
			description: 'Kami berkomitmen hingga Anda 100% puas dengan hasilnya'
		}
	];
</script>

<svelte:head>
	<title>Teras Interior Production - Premium Interior Design Makassar</title>
	<meta name="description" content="Jasa desain interior premium di Makassar. Wujudkan ruang impian Anda dengan sentuhan profesional dan estetika tinggi." />
</svelte:head>

<div class="website">
	<!-- Mouse Spotlight Effect -->
	<MouseSpotlight />
	
	<!-- Navigation -->
	<nav class="nav" class:scrolled={scrollY > 50}>
		<div class="nav-container">
			<div class="logo">
				<span class="logo-icon">◆</span>
				<span class="logo-text">TERAS INTERIOR</span>
			</div>
			<div class="nav-links">
				<a href="#home">Home</a>
				<a href="#about">About</a>
				<a href="#services">Services</a>
				<a href="#portfolio">Portfolio</a>
				<a href="#contact" class="btn-contact">Contact Us</a>
			</div>
			<button class="menu-toggle" onclick={() => isMenuOpen = !isMenuOpen} aria-label="Toggle menu">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div 
			class="mobile-menu" 
			role="dialog" 
			aria-modal="true"
			onclick={() => isMenuOpen = false}
			onkeydown={(e) => e.key === 'Escape' && (isMenuOpen = false)}
		>
			<div class="mobile-menu-content">
				<a href="#home" onclick={() => isMenuOpen = false}>Home</a>
				<a href="#about" onclick={() => isMenuOpen = false}>About</a>
				<a href="#services" onclick={() => isMenuOpen = false}>Services</a>
				<a href="#portfolio" onclick={() => isMenuOpen = false}>Portfolio</a>
				<a href="#contact" onclick={() => isMenuOpen = false}>Contact Us</a>
			</div>
		</div>
	{/if}

	<!-- Hero Section -->
	<section id="home" class="hero">
		<div class="hero-overlay"></div>
		<div class="animated-bg">
			<div class="floating-shape shape-1"></div>
			<div class="floating-shape shape-2"></div>
			<div class="floating-shape shape-3"></div>
			<div class="floating-shape shape-4"></div>
		</div>
		<ParticlesBackground />
		<div class="hero-content">
			<div class="hero-badge">Premium Interior Design</div>
			<h1 class="hero-title">
				<span class="title-line">Crafting Spaces</span>
				<span class="title-line accent">That Inspire</span>
			</h1>
			<p class="hero-subtitle">
				Transformasi ruang Anda menjadi masterpiece yang mencerminkan kepribadian dan gaya hidup Anda
			</p>
			<div class="hero-buttons">
				<a href="#contact" class="btn btn-primary">Mulai Konsultasi</a>
				<a href="#portfolio" class="btn btn-secondary">Lihat Portfolio</a>
			</div>
			<div class="hero-trust">
				<div class="trust-item">
					<div class="trust-icon">✓</div>
					<span>Garansi Kepuasan</span>
				</div>
				<div class="trust-item">
					<div class="trust-icon">✓</div>
					<span>Free Konsultasi</span>
				</div>
				<div class="trust-item">
					<div class="trust-icon">✓</div>
					<span>Harga Transparan</span>
				</div>
			</div>
		</div>
		<div class="scroll-indicator">
			<span>Scroll</span>
			<div class="scroll-line"></div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="about">
		<AnimatedBackground variant="dark" />
		<WaveBackground color="#ff6b35" />
		<div class="container">
			<div class="about-grid">
				<div class="about-image">
					<img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="Interior Design" />
					<div class="about-badge">
						<div class="badge-number"><AnimatedCounter target={10} suffix="+" /></div>
						<div class="badge-text">Years Experience</div>
					</div>
				</div>
				<div class="about-content">
					<div class="section-label">About Us</div>
					<h2 class="section-title">Menciptakan Ruang yang Bercerita</h2>
					<p class="about-text">
						<strong>Teras Interior Production</strong> adalah studio desain interior premium yang berbasis di Makassar, 
						menghadirkan solusi desain yang inovatif dan berkelas tinggi. Kami percaya bahwa setiap ruang 
						memiliki potensi untuk menjadi karya seni yang fungsional.
					</p>
					<p class="about-text">
						Dengan tim profesional yang berpengalaman dan passion dalam menciptakan keindahan, 
						kami berkomitmen untuk mewujudkan visi Anda menjadi kenyataan yang melebihi ekspektasi.
					</p>
					<div class="about-features">
						<div class="feature-item">
							<div class="feature-icon">✓</div>
							<div>Professional Team</div>
						</div>
						<div class="feature-item">
							<div class="feature-icon">✓</div>
							<div>Premium Quality</div>
						</div>
						<div class="feature-item">
							<div class="feature-icon">✓</div>
							<div>Timely Delivery</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section id="services" class="services">
		<AnimatedBackground variant="subtle" />
		<WaveBackground color="#f7931e" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Our Services</div>
				<h2 class="section-title">Layanan Eksklusif Kami</h2>
			</div>
			<div class="services-grid">
				{#each services as service}
					<div class="service-card">
						<div class="service-icon">{service.icon}</div>
						<h3 class="service-title">{service.title}</h3>
						<p class="service-description">{service.description}</p>
						<a href="#contact" class="service-link">Learn More →</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section id="portfolio" class="portfolio">
		<AnimatedBackground variant="dark" />
		<GeometricPattern opacity={0.02} />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Portfolio</div>
				<h2 class="section-title">Karya Terpilih Kami</h2>
			</div>
			<div class="portfolio-grid">
				{#each projects as project}
					<div class="portfolio-item">
						<img src={project.image} alt={project.title} />
						<div class="portfolio-overlay">
							<div class="portfolio-category">{project.category}</div>
							<h3 class="portfolio-title">{project.title}</h3>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why Choose Us Section -->
	<section class="why-choose">
		<AnimatedBackground variant="subtle" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Why Choose Us</div>
				<h2 class="section-title">Mengapa Memilih Teras Interior?</h2>
			</div>
			<div class="why-grid">
				{#each whyChooseUs as item}
					<div class="why-card">
						<div class="why-number">{item.number}</div>
						<h3 class="why-title">{item.title}</h3>
						<p class="why-description">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats">
		<div class="container">
			<div class="stats-grid">
				<div class="stat-item">
					<div class="stat-number"><AnimatedCounter target={150} suffix="+" /></div>
					<div class="stat-label">Projects Completed</div>
				</div>
				<div class="stat-item">
					<div class="stat-number"><AnimatedCounter target={120} suffix="+" /></div>
					<div class="stat-label">Happy Clients</div>
				</div>
				<div class="stat-item">
					<div class="stat-number"><AnimatedCounter target={15} suffix="+" /></div>
					<div class="stat-label">Awards Won</div>
				</div>
				<div class="stat-item">
					<div class="stat-number"><AnimatedCounter target={10} suffix="+" /></div>
					<div class="stat-label">Years Experience</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="process">
		<AnimatedBackground variant="dark" />
		<GeometricPattern opacity={0.015} />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Our Process</div>
				<h2 class="section-title">Proses Kerja Kami</h2>
			</div>
			<div class="process-grid">
				<div class="process-card">
					<div class="process-number">01</div>
					<div class="process-icon">💬</div>
					<h3 class="process-title">Konsultasi</h3>
					<p class="process-description">Diskusi mendalam tentang visi, kebutuhan, dan budget Anda</p>
				</div>
				<div class="process-card">
					<div class="process-number">02</div>
					<div class="process-icon">📐</div>
					<h3 class="process-title">Desain Konsep</h3>
					<p class="process-description">Pembuatan konsep desain 3D yang detail dan realistis</p>
				</div>
				<div class="process-card">
					<div class="process-number">03</div>
					<div class="process-icon">✅</div>
					<h3 class="process-title">Approval</h3>
					<p class="process-description">Revisi dan finalisasi desain sesuai feedback Anda</p>
				</div>
				<div class="process-card">
					<div class="process-number">04</div>
					<div class="process-icon">🔨</div>
					<h3 class="process-title">Eksekusi</h3>
					<p class="process-description">Implementasi dengan supervisi ketat dan quality control</p>
				</div>
				<div class="process-card">
					<div class="process-number">05</div>
					<div class="process-icon">🎉</div>
					<h3 class="process-title">Handover</h3>
					<p class="process-description">Serah terima proyek yang sempurna dan siap digunakan</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="testimonials">
		<AnimatedBackground variant="dark" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Testimonials</div>
				<h2 class="section-title">Apa Kata Klien Kami</h2>
			</div>
			<div class="testimonials-grid">
				<div class="testimonial-card">
					<div class="testimonial-stars">★★★★★</div>
					<p class="testimonial-text">
						"Teras Interior Production benar-benar mengubah rumah kami menjadi istana impian. 
						Profesional, detail, dan hasil yang melebihi ekspektasi!"
					</p>
					<div class="testimonial-author">
						<div class="author-name">Ibu Sarah</div>
						<div class="author-title">Residential Client</div>
					</div>
				</div>
				<div class="testimonial-card">
					<div class="testimonial-stars">★★★★★</div>
					<p class="testimonial-text">
						"Desain office kami menjadi sangat modern dan fungsional. Tim yang sangat responsif 
						dan memahami kebutuhan bisnis kami."
					</p>
					<div class="testimonial-author">
						<div class="author-name">Bapak Andi</div>
						<div class="author-title">Commercial Client</div>
					</div>
				</div>
				<div class="testimonial-card">
					<div class="testimonial-stars">★★★★★</div>
					<p class="testimonial-text">
						"Kualitas furniture custom yang luar biasa! Setiap detail diperhatikan dengan sempurna. 
						Highly recommended!"
					</p>
					<div class="testimonial-author">
						<div class="author-name">Ibu Dina</div>
						<div class="author-title">Residential Client</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
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
					<a href="https://wa.me/6281xxxxxxxx" class="btn btn-whatsapp btn-large">
						<span class="whatsapp-icon">📱</span> WhatsApp Kami
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
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
								<div class="contact-value">Makassar, Sulawesi Selatan</div>
							</div>
						</div>
						<div class="contact-item">
							<div class="contact-icon">📧</div>
							<div>
								<div class="contact-label">Email</div>
								<div class="contact-value">hello@terasinterior.com</div>
							</div>
						</div>
						<div class="contact-item">
							<div class="contact-icon">📱</div>
							<div>
								<div class="contact-label">Phone</div>
								<div class="contact-value">+62 811-xxxx-xxxx</div>
							</div>
						</div>
					</div>
				</div>
				<div class="contact-form">
					<form>
						<div class="form-group">
							<input type="text" placeholder="Nama Lengkap" required />
						</div>
						<div class="form-group">
							<input type="email" placeholder="Email" required />
						</div>
						<div class="form-group">
							<input type="tel" placeholder="Nomor Telepon" required />
						</div>
						<div class="form-group">
							<textarea placeholder="Ceritakan tentang proyek Anda..." rows="5" required></textarea>
						</div>
						<button type="submit" class="btn btn-primary btn-full">Kirim Pesan</button>
					</form>
				</div>
			</div>
		</div>
	</section>

	<!-- Floating WhatsApp Button -->
	<a href="https://wa.me/6281xxxxxxxx" class="whatsapp-float" aria-label="Chat WhatsApp" target="_blank">
		<svg viewBox="0 0 32 32" fill="currentColor">
			<path d="M16 0C7.164 0 0 7.164 0 16c0 2.828.736 5.484 2.016 7.792L0 32l8.384-2.016C10.692 31.264 13.348 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.496 0-4.864-.672-6.912-1.856l-.496-.288-5.152 1.248 1.28-4.992-.32-.512C2.688 20.896 2.016 18.496 2.016 16c0-7.728 6.272-14 14-14s14 6.272 14 14-6.272 13.344-14 13.344zm7.68-10.016c-.416-.208-2.464-1.216-2.848-1.36-.384-.128-.672-.192-.944.208-.272.416-1.056 1.36-1.296 1.632-.24.272-.48.304-.896.096-.416-.208-1.76-.656-3.36-2.08-1.232-1.104-2.064-2.464-2.304-2.88-.24-.416-.016-.64.176-.848.192-.192.416-.496.624-.752.208-.24.272-.416.416-.688.128-.272.064-.512-.032-.72-.096-.208-.944-2.272-1.296-3.104-.336-.8-.672-.688-.944-.688-.24 0-.512-.032-.784-.032s-.72.096-1.104.512c-.384.416-1.472 1.44-1.472 3.52s1.504 4.08 1.712 4.352c.208.272 2.944 4.496 7.136 6.304 1.008.432 1.792.688 2.4.88.992.32 1.904.272 2.624.16.8-.128 2.464-1.008 2.816-1.984.352-.976.352-1.808.24-1.984-.096-.192-.368-.304-.784-.512z"/>
		</svg>
	</a>

	<!-- Footer -->
	<footer class="footer">
		<div class="container">
			<div class="footer-content">
				<div class="footer-brand">
					<div class="logo">
						<span class="logo-icon">◆</span>
						<span class="logo-text">TERAS INTERIOR</span>
					</div>
					<p>Premium Interior Design Studio</p>
				</div>
				<div class="footer-social">
					<a href="https://instagram.com/terasinterior" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
					<a href="https://facebook.com/terasinterior" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
					<a href="https://wa.me/6281xxxxxxxx" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
				</div>
			</div>
			<div class="footer-bottom">
				<p>&copy; 2025 Teras Interior Production. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		overflow-x: hidden;
		background: #0a0a0a;
		color: #ffffff;
		background-image: 
			linear-gradient(rgba(255, 107, 53, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 107, 53, 0.02) 1px, transparent 1px);
		background-size: 50px 50px;
		background-position: 0 0, 0 0;
		animation: grid-move 20s linear infinite;
	}

	@keyframes grid-move {
		0% {
			background-position: 0 0, 0 0;
		}
		100% {
			background-position: 50px 50px, 50px 50px;
		}
	}

	.website {
		position: relative;
	}

	/* Navigation */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: 1.5rem 0;
		transition: all 0.3s ease;
	}

	.nav.scrolled {
		background: rgba(10, 10, 10, 0.95);
		backdrop-filter: blur(20px);
		padding: 1rem 0;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 2px;
	}

	.logo-icon {
		color: #ff6b35;
		font-size: 1.5rem;
	}

	.nav-links {
		display: flex;
		gap: 2.5rem;
		align-items: center;
	}

	.nav-links a {
		color: #ffffff;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
		position: relative;
	}

	.nav-links a:not(.btn-contact):hover {
		color: #ff6b35;
	}

	.btn-contact {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		font-weight: 600;
	}

	.btn-contact:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
	}

	/* Hero Section */
	.hero {
		position: relative;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(247, 147, 30, 0.15) 0%, transparent 50%);
		animation: gradientShift 15s ease infinite;
	}

	@keyframes gradientShift {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	/* Animated Background */
	.animated-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 0;
	}

	.floating-shape {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.3;
		animation: float 20s ease-in-out infinite;
	}

	.shape-1 {
		width: 400px;
		height: 400px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		top: 10%;
		left: 10%;
		animation-delay: 0s;
		animation-duration: 25s;
	}

	.shape-2 {
		width: 300px;
		height: 300px;
		background: linear-gradient(135deg, #f7931e, #ff6b35);
		top: 60%;
		right: 15%;
		animation-delay: 5s;
		animation-duration: 20s;
	}

	.shape-3 {
		width: 350px;
		height: 350px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		bottom: 10%;
		left: 50%;
		animation-delay: 10s;
		animation-duration: 30s;
	}

	.shape-4 {
		width: 250px;
		height: 250px;
		background: linear-gradient(135deg, #f7931e, #ff6b35);
		top: 30%;
		right: 30%;
		animation-delay: 15s;
		animation-duration: 22s;
	}

	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.1);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		75% {
			transform: translate(20px, 30px) scale(1.05);
		}
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80') center/cover;
		opacity: 0.1;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 900px;
		padding: 0 2rem;
		margin-top: 5rem;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		background: rgba(255, 107, 53, 0.1);
		border: 1px solid rgba(255, 107, 53, 0.3);
		border-radius: 50px;
		color: #ff6b35;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		text-transform: uppercase;
		margin-bottom: 2rem;
	}

	.hero-title {
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		letter-spacing: -2px;
	}

	.title-line {
		display: block;
	}

	.title-line.accent {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: #b0b0b0;
		margin-bottom: 3rem;
		line-height: 1.6;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		display: inline-block;
		font-size: 1rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		color: #ffffff;
	}

	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
	}

	.btn-secondary {
		background: transparent;
		color: #ffffff;
		border: 2px solid #ffffff;
	}

	.btn-secondary:hover {
		background: #ffffff;
		color: #0a0a0a;
	}

	.hero-trust {
		display: flex;
		gap: 3rem;
		justify-content: center;
		margin-top: 3rem;
		flex-wrap: wrap;
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #b0b0b0;
		font-size: 0.95rem;
	}

	.trust-icon {
		width: 24px;
		height: 24px;
		background: rgba(255, 107, 53, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff6b35;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: #ffffff;
		font-size: 0.875rem;
		letter-spacing: 2px;
		font-weight: 600;
		z-index: 10;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.scroll-line {
		width: 2px;
		height: 50px;
		background: linear-gradient(to bottom, #ff6b35, #f7931e, transparent);
		animation: scroll 2s ease-in-out infinite;
		box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
	}

	@keyframes scroll {
		0%, 100% { transform: translateY(0); opacity: 0.3; }
		50% { transform: translateY(20px); opacity: 1; }
	}

	/* Container */
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	/* Section Styles */
	section {
		padding: 8rem 0;
	}

	.section-label {
		color: #ff6b35;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		line-height: 1.2;
		margin-bottom: 2rem;
		letter-spacing: -1px;
	}

	.section-header {
		text-align: center;
		margin-bottom: 5rem;
	}

	/* About Section */
	.about {
		background: #0f0f0f;
		position: relative;
		overflow: hidden;
	}

	.about::before {
		content: '';
		position: absolute;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
		top: 50%;
		left: -250px;
		animation: pulse-glow 8s ease-in-out infinite;
	}

	.about::after {
		content: '';
		position: absolute;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(247, 147, 30, 0.05) 0%, transparent 70%);
		top: 50%;
		right: -250px;
		animation: pulse-glow 8s ease-in-out infinite;
		animation-delay: 4s;
	}

	@keyframes pulse-glow {
		0%, 100% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.6;
		}
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: center;
	}

	.about-image {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid #1a1a1a;
		transition: all 0.3s ease;
	}

	.about-image::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 1;
	}

	.about-image:hover::before {
		opacity: 1;
	}

	.about-image:hover {
		border-color: #ff6b35;
		box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
	}

	.about-image img {
		width: 100%;
		height: 600px;
		object-fit: cover;
		display: block;
		transition: transform 0.5s ease;
	}

	.about-image:hover img {
		transform: scale(1.05);
	}

	.about-badge {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		padding: 2rem;
		border-radius: 15px;
		text-align: center;
		z-index: 2;
		box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4);
		transition: all 0.3s ease;
		animation: badge-float 3s ease-in-out infinite;
	}

	@keyframes badge-float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.about-image:hover .about-badge {
		transform: scale(1.05) translateY(-5px);
		box-shadow: 0 15px 50px rgba(255, 107, 53, 0.6);
	}

	.badge-number {
		font-size: 3rem;
		font-weight: 800;
		line-height: 1;
	}

	.badge-text {
		font-size: 0.875rem;
		font-weight: 600;
		margin-top: 0.5rem;
	}

	.about-text {
		color: #b0b0b0;
		line-height: 1.8;
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
	}

	.about-text strong {
		color: #ffffff;
		font-weight: 700;
	}

	.about-features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 3rem;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 600;
		transition: all 0.3s ease;
		cursor: default;
	}

	.feature-item:hover {
		transform: translateX(5px);
		color: #ff6b35;
	}

	.feature-icon {
		width: 30px;
		height: 30px;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		transition: all 0.3s ease;
		box-shadow: 0 3px 10px rgba(255, 107, 53, 0.3);
	}

	.feature-item:hover .feature-icon {
		transform: rotate(360deg) scale(1.1);
		box-shadow: 0 5px 20px rgba(255, 107, 53, 0.5);
	}

	/* Services Section */
	.services {
		position: relative;
	}

	.services::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(circle at 10% 20%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
			radial-gradient(circle at 90% 80%, rgba(247, 147, 30, 0.03) 0%, transparent 50%);
		animation: moveBackground 20s ease infinite;
	}

	@keyframes moveBackground {
		0%, 100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(20px, -20px);
		}
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		position: relative;
		z-index: 1;
	}

	.service-card {
		background: #0f0f0f;
		padding: 3rem 2rem;
		border-radius: 20px;
		border: 1px solid #1a1a1a;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.service-card::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
		transform: translate(-50%, -50%);
		transition: width 0.6s ease, height 0.6s ease;
	}

	.service-card:hover::before {
		width: 300px;
		height: 300px;
	}

	.service-card:hover {
		transform: translateY(-10px);
		border-color: #ff6b35;
		box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
	}

	.service-icon {
		font-size: 3rem;
		margin-bottom: 1.5rem;
		position: relative;
		z-index: 1;
	}

	.service-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		position: relative;
		z-index: 1;
	}

	.service-description {
		color: #b0b0b0;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		position: relative;
		z-index: 1;
	}

	.service-link {
		color: #ff6b35;
		text-decoration: none;
		font-weight: 600;
		transition: gap 0.3s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}

	.service-link:hover {
		gap: 1rem;
	}

	/* Portfolio Section */
	.portfolio {
		background: #0f0f0f;
		position: relative;
		overflow: hidden;
	}

	.portfolio::before {
		content: '';
		position: absolute;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
		top: -100px;
		right: -100px;
		animation: rotate-glow 30s linear infinite;
	}

	@keyframes rotate-glow {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}

	.portfolio-item {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		aspect-ratio: 4/3;
		cursor: pointer;
		border: 1px solid #1a1a1a;
		transition: all 0.3s ease;
	}

	.portfolio-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(247, 147, 30, 0.2) 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 1;
	}

	.portfolio-item:hover::before {
		opacity: 1;
	}

	.portfolio-item:hover {
		border-color: #ff6b35;
		box-shadow: 0 15px 50px rgba(255, 107, 53, 0.3);
		transform: translateY(-5px);
	}

	.portfolio-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease, filter 0.3s ease;
	}

	.portfolio-item:hover img {
		filter: brightness(0.8);
	}

	.portfolio-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2rem;
		background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
		transform: translateY(100%);
		transition: transform 0.4s ease;
		z-index: 2;
	}

	.portfolio-item:hover img {
		transform: scale(1.1);
	}

	.portfolio-item:hover .portfolio-overlay {
		transform: translateY(0);
	}

	.portfolio-category {
		color: #ff6b35;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.portfolio-title {
		font-size: 1.5rem;
		font-weight: 700;
	}

	/* Contact Section */
	.contact {
		position: relative;
		overflow: hidden;
	}

	.contact::before {
		content: '';
		position: absolute;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
		top: 0;
		right: 0;
		animation: float-diagonal 20s ease-in-out infinite;
	}

	@keyframes float-diagonal {
		0%, 100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-50px, 50px);
		}
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: start;
		position: relative;
		z-index: 1;
	}

	.contact-text {
		color: #b0b0b0;
		line-height: 1.8;
		margin-bottom: 3rem;
		font-size: 1.1rem;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.contact-item {
		display: flex;
		gap: 1.5rem;
		align-items: start;
		transition: transform 0.3s ease;
	}

	.contact-item:hover {
		transform: translateX(10px);
	}

	.contact-icon {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		flex-shrink: 0;
		transition: all 0.3s ease;
		box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
	}

	.contact-item:hover .contact-icon {
		transform: rotate(10deg) scale(1.1);
		box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
	}

	.contact-label {
		color: #b0b0b0;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.contact-value {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.contact-form {
		background: #0f0f0f;
		padding: 3rem;
		border-radius: 20px;
		border: 1px solid #1a1a1a;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.contact-form::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(135deg, #ff6b35, #f7931e, #ff6b35);
		background-size: 200% 200%;
		border-radius: 20px;
		opacity: 0;
		z-index: -1;
		transition: opacity 0.3s ease;
		animation: gradient-rotate 3s linear infinite;
	}

	.contact-form:hover::before {
		opacity: 0.5;
	}

	@keyframes gradient-rotate {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem 1.5rem;
		background: #1a1a1a;
		border: 1px solid #2a2a2a;
		border-radius: 12px;
		color: #ffffff;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.3s ease;
		position: relative;
		z-index: 1;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #ff6b35;
		background: #0a0a0a;
		box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
		transform: translateY(-2px);
	}

	.form-group textarea {
		resize: vertical;
	}

	.btn-full {
		width: 100%;
	}

	/* Footer */
	.footer {
		background: #0f0f0f;
		border-top: 1px solid #1a1a1a;
		padding: 3rem 0 2rem;
		position: relative;
		overflow: hidden;
	}

	.footer::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		top: 0;
		left: -100%;
		background: linear-gradient(90deg, transparent, #ff6b35, #f7931e, transparent);
		animation: border-flow 3s linear infinite;
	}

	@keyframes border-flow {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.footer-brand p {
		color: #b0b0b0;
		margin-top: 0.5rem;
	}

	.footer-social {
		display: flex;
		gap: 2rem;
	}

	.footer-social a {
		color: #b0b0b0;
		text-decoration: none;
		transition: all 0.3s ease;
		position: relative;
		padding: 0.5rem 1rem;
	}

	.footer-social a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #ff6b35, #f7931e);
		transform: translateX(-50%);
		transition: width 0.3s ease;
	}

	.footer-social a:hover {
		color: #ff6b35;
		transform: translateY(-3px);
	}

	.footer-social a:hover::after {
		width: 80%;
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid #1a1a1a;
		color: #666;
		font-size: 0.875rem;
	}

	/* Responsive */
	@media (max-width: 968px) {
		.nav-links {
			gap: 1.5rem;
		}

		.about-grid,
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.about-features {
			grid-template-columns: 1fr;
		}

		.portfolio-grid {
			grid-template-columns: 1fr;
		}

		section {
			padding: 5rem 0;
		}
	}

	/* Stats Section */
	.stats {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		padding: 5rem 0;
		position: relative;
		overflow: hidden;
	}

	.stats::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 80% 50%, rgba(0, 0, 0, 0.1) 0%, transparent 50%);
		animation: wave 10s ease-in-out infinite;
	}

	@keyframes wave {
		0%, 100% {
			transform: translateX(0) translateY(0);
		}
		50% {
			transform: translateX(20px) translateY(-10px);
		}
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 3rem;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.stat-item {
		transition: all 0.3s ease;
		cursor: default;
	}

	.stat-item:hover {
		transform: scale(1.05);
	}

	.stat-number {
		font-size: 4rem;
		font-weight: 900;
		line-height: 1;
		margin-bottom: 0.5rem;
		transition: all 0.3s ease;
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}

	.stat-item:hover .stat-number {
		text-shadow: 0 6px 30px rgba(0, 0, 0, 0.5);
	}

	.stat-label {
		font-size: 1rem;
		font-weight: 600;
		opacity: 0.9;
		transition: opacity 0.3s ease;
	}

	.stat-item:hover .stat-label {
		opacity: 1;
	}

	/* Testimonials Section */
	.testimonials {
		background: #0f0f0f;
		position: relative;
		overflow: hidden;
	}

	.testimonials::before,
	.testimonials::after {
		content: '';
		position: absolute;
		width: 400px;
		height: 400px;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.15;
	}

	.testimonials::before {
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		top: 20%;
		left: -200px;
		animation: float-left 15s ease-in-out infinite;
	}

	.testimonials::after {
		background: linear-gradient(135deg, #f7931e, #ff6b35);
		bottom: 20%;
		right: -200px;
		animation: float-right 15s ease-in-out infinite;
	}

	@keyframes float-left {
		0%, 100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(50px, -30px);
		}
	}

	@keyframes float-right {
		0%, 100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-50px, 30px);
		}
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		position: relative;
		z-index: 1;
	}

	.testimonial-card {
		background: #1a1a1a;
		padding: 3rem 2rem;
		border-radius: 20px;
		border: 1px solid #2a2a2a;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.testimonial-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.05), transparent);
		transition: left 0.5s ease;
	}

	.testimonial-card:hover::before {
		left: 100%;
	}

	.testimonial-card:hover {
		transform: translateY(-10px);
		border-color: #ff6b35;
		box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
	}

	.testimonial-stars {
		color: #f7931e;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		position: relative;
		z-index: 1;
		display: inline-block;
		transition: all 0.3s ease;
	}

	.testimonial-card:hover .testimonial-stars {
		transform: scale(1.1);
		text-shadow: 0 0 20px rgba(247, 147, 30, 0.5);
	}

	.testimonial-text {
		color: #b0b0b0;
		line-height: 1.8;
		margin-bottom: 2rem;
		font-style: italic;
		position: relative;
		z-index: 1;
	}

	.author-name {
		font-weight: 700;
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
		position: relative;
		z-index: 1;
		transition: color 0.3s ease;
	}

	.testimonial-card:hover .author-name {
		color: #ff6b35;
	}

	.author-title {
		color: #ff6b35;
		font-size: 0.875rem;
		font-weight: 600;
		position: relative;
		z-index: 1;
	}

	/* Mobile Menu */
	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.menu-toggle span {
		width: 25px;
		height: 3px;
		background: #ffffff;
		border-radius: 3px;
		transition: all 0.3s ease;
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(10, 10, 10, 0.98);
		backdrop-filter: blur(20px);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.mobile-menu-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		text-align: center;
	}

	.mobile-menu-content a {
		color: #ffffff;
		text-decoration: none;
		font-size: 2rem;
		font-weight: 700;
		transition: color 0.3s ease;
	}

	.mobile-menu-content a:hover {
		color: #ff6b35;
	}

	/* Why Choose Us Section */
	.why-choose {
		background: #0a0a0a;
		position: relative;
		overflow: hidden;
	}

	.why-choose::before {
		content: '';
		position: absolute;
		width: 700px;
		height: 700px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: rotate-slow 40s linear infinite;
	}

	.why-choose::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: radial-gradient(circle, rgba(255, 107, 53, 0.1) 1px, transparent 1px);
		background-size: 30px 30px;
		animation: dots-move 20s linear infinite;
		opacity: 0.3;
	}

	@keyframes rotate-slow {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes dots-move {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 30px 30px;
		}
	}

	.why-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
		position: relative;
		z-index: 1;
	}

	.why-card {
		position: relative;
		padding: 3rem;
		background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
		border-radius: 20px;
		border: 1px solid #2a2a2a;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.why-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.why-card::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.why-card:hover::before {
		transform: scaleX(1);
	}

	.why-card:hover::after {
		opacity: 1;
	}

	.why-card:hover {
		transform: translateY(-5px);
		border-color: #ff6b35;
		box-shadow: 0 15px 50px rgba(255, 107, 53, 0.15);
	}

	.why-number {
		font-size: 4rem;
		font-weight: 900;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
		margin-bottom: 1rem;
		opacity: 0.3;
		position: relative;
		z-index: 1;
		transition: all 0.3s ease;
	}

	.why-card:hover .why-number {
		opacity: 0.5;
		transform: scale(1.1);
	}

	.why-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
		position: relative;
		z-index: 1;
		transition: color 0.3s ease;
	}

	.why-card:hover .why-title {
		color: #ff6b35;
	}

	.why-description {
		color: #b0b0b0;
		line-height: 1.6;
		font-size: 1.05rem;
		position: relative;
		z-index: 1;
	}

	/* Process Section */
	.process {
		background: #0f0f0f;
		position: relative;
		overflow: hidden;
	}

	.process::before {
		content: '';
		position: absolute;
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(247, 147, 30, 0.06) 0%, transparent 70%);
		bottom: -200px;
		left: 50%;
		transform: translateX(-50%);
		animation: breathe 12s ease-in-out infinite;
	}

	@keyframes breathe {
		0%, 100% {
			transform: translateX(-50%) scale(1);
		}
		50% {
			transform: translateX(-50%) scale(1.15);
		}
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.process-card {
		background: #1a1a1a;
		padding: 3rem 2rem;
		border-radius: 20px;
		border: 1px solid #2a2a2a;
		text-align: center;
		position: relative;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.process-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.process-card:hover::before {
		transform: scaleX(1);
	}

	.process-card:hover {
		transform: translateY(-10px);
		border-color: #ff6b35;
		box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
	}

	.process-number {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		font-size: 3rem;
		font-weight: 900;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		opacity: 0.2;
		line-height: 1;
	}

	.process-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		margin: 0 auto 1.5rem;
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
		transition: all 0.3s ease;
	}

	.process-card:hover .process-icon {
		transform: scale(1.1) rotate(10deg);
		box-shadow: 0 15px 40px rgba(255, 107, 53, 0.5);
	}

	.process-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.process-description {
		color: #b0b0b0;
		line-height: 1.7;
		font-size: 1rem;
	}

	/* CTA Section */
	.cta-section {
		background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
		position: relative;
		overflow: hidden;
	}

	.cta-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 30% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 70% 50%, rgba(247, 147, 30, 0.1) 0%, transparent 50%);
		animation: shimmer 8s ease-in-out infinite;
	}

	.cta-section::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 200%;
		height: 100%;
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 50px,
			rgba(255, 107, 53, 0.02) 50px,
			rgba(255, 107, 53, 0.02) 100px
		);
		animation: stripes-move 20s linear infinite;
	}

	@keyframes shimmer {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.05);
		}
	}

	@keyframes stripes-move {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.cta-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.cta-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		margin-bottom: 1.5rem;
		line-height: 1.2;
	}

	.cta-text {
		color: #b0b0b0;
		font-size: 1.25rem;
		line-height: 1.8;
		margin-bottom: 3rem;
	}

	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-large {
		padding: 1.25rem 3rem;
		font-size: 1.1rem;
	}

	.btn-whatsapp {
		background: #25D366;
		color: #ffffff;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.btn-whatsapp:hover {
		background: #20BA5A;
		transform: translateY(-3px);
		box-shadow: 0 15px 40px rgba(37, 211, 102, 0.4);
	}

	.whatsapp-icon {
		font-size: 1.5rem;
	}

	/* Floating WhatsApp Button */
	.whatsapp-float {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 60px;
		height: 60px;
		background: #25D366;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
		z-index: 999;
		transition: all 0.3s ease;
		animation: pulse 2s infinite;
	}

	.whatsapp-float:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
	}

	.whatsapp-float svg {
		width: 32px;
		height: 32px;
	}

	@keyframes pulse {
		0%, 100% {
			box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
		}
		50% {
			box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7);
		}
	}

	@media (max-width: 968px) {
		.why-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.process-grid {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.btn-large {
			width: 100%;
		}
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}

		.hero-buttons {
			flex-direction: column;
			width: 100%;
		}

		.btn {
			width: 100%;
		}

		.footer-content {
			flex-direction: column;
			gap: 2rem;
			text-align: center;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.stat-number {
			font-size: 3rem;
		}
	}
</style>
