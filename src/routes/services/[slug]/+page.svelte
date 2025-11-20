<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import WaveBackground from '$lib/components/WaveBackground.svelte';
	import GeometricPattern from '$lib/components/GeometricPattern.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
	
	const slug = $page.params.slug;
	
	const servicesData: Record<string, any> = {
		'residential-design': {
			icon: '🏠',
			title: 'Residential Design',
			subtitle: 'Transformasi Rumah Impian Anda',
			description: 'Kami menghadirkan desain interior residential yang tidak hanya indah secara visual, tetapi juga fungsional dan mencerminkan kepribadian Anda. Setiap detail dirancang dengan cermat untuk menciptakan rumah yang nyaman dan memukau.',
			image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
			features: [
				{
					title: 'Living Room Design',
					description: 'Ruang tamu yang elegan dan nyaman untuk berkumpul bersama keluarga',
					icon: '🛋️'
				},
				{
					title: 'Bedroom Design',
					description: 'Kamar tidur yang tenang dan personal untuk istirahat maksimal',
					icon: '🛏️'
				},
				{
					title: 'Kitchen Design',
					description: 'Dapur modern yang fungsional dengan estetika tinggi',
					icon: '🍳'
				},
				{
					title: 'Bathroom Design',
					description: 'Kamar mandi mewah dengan sentuhan spa pribadi',
					icon: '🚿'
				}
			],
			process: [
				'Konsultasi awal untuk memahami kebutuhan dan gaya hidup Anda',
				'Survey lokasi dan pengukuran detail',
				'Pembuatan konsep desain 3D yang realistis',
				'Presentasi dan revisi desain hingga sempurna',
				'Eksekusi dengan supervisi ketat dan quality control',
				'Handover dan after-sales service'
			],
			benefits: [
				'Desain custom sesuai kepribadian Anda',
				'Material premium berkualitas tinggi',
				'Garansi hasil kerja',
				'Timeline yang jelas dan terukur',
				'Budget transparan tanpa biaya tersembunyi'
			],
			portfolio: [
				{
					title: 'Modern Minimalist Living',
					image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
					description: 'Desain minimalis dengan sentuhan modern'
				},
				{
					title: 'Luxury Penthouse',
					image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
					description: 'Penthouse mewah dengan view spektakuler'
				},
				{
					title: 'Elegant Dining Space',
					image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
					description: 'Ruang makan elegan untuk keluarga'
				}
			]
		},
		'commercial-design': {
			icon: '🏢',
			title: 'Commercial Design',
			subtitle: 'Tingkatkan Brand Value Bisnis Anda',
			description: 'Desain interior komersial yang strategis untuk meningkatkan produktivitas, brand image, dan customer experience. Kami memahami bahwa ruang bisnis yang baik adalah investasi jangka panjang',
			image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
			features: [
				{
					title: 'Office Design',
					description: 'Ruang kerja modern yang meningkatkan produktivitas tim',
					icon: '💼'
				},
				{
					title: 'Retail Design',
					description: 'Toko yang menarik dan meningkatkan penjualan',
					icon: '🏪'
				},
				{
					title: 'Restaurant Design',
					description: 'Restoran dengan ambiance yang memorable',
					icon: '🍽️'
				},
				{
					title: 'Cafe Design',
					description: 'Cafe instagramable yang ramai pengunjung',
					icon: '☕'
				}
			],
			process: [
				'Analisis bisnis dan target market Anda',
				'Site survey dan space planning',
				'Konsep desain yang align dengan brand identity',
				'3D visualization dan material selection',
				'Project management dan quality control',
				'Grand opening support'
			],
			benefits: [
				'Desain yang meningkatkan brand awareness',
				'Space planning optimal untuk efisiensi',
				'Material tahan lama untuk high traffic',
				'Compliance dengan regulasi dan standar',
				'ROI yang terukur'
			],
			portfolio: [
				{
					title: 'Contemporary Office',
					image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
					description: 'Office modern dengan open space concept'
				},
				{
					title: 'Modern Cafe',
					image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
					description: 'Cafe dengan industrial chic design'
				},
				{
					title: 'Luxury Restaurant',
					image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
					description: 'Restaurant fine dining yang elegan'
				}
			]
		},
		'renovation': {
			icon: '✨',
			title: 'Renovation',
			subtitle: 'Hadirkan Kehidupan Baru pada Ruang Anda',
			description: 'Renovasi total atau parsial yang mengubah ruang lama menjadi fresh dan modern. Kami menangani semua aspek renovasi dari perencanaan hingga finishing dengan hasil yang memuaskan.',
			image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80',
			features: [
				{
					title: 'Full Renovation',
					description: 'Renovasi menyeluruh dari struktur hingga finishing',
					icon: '🏗️'
				},
				{
					title: 'Partial Renovation',
					description: 'Renovasi area tertentu sesuai kebutuhan',
					icon: '🔨'
				},
				{
					title: 'Facade Renovation',
					description: 'Pembaruan tampilan eksterior bangunan',
					icon: '🏛️'
				},
				{
					title: 'Interior Refresh',
					description: 'Update interior tanpa perubahan struktur',
					icon: '🎨'
				}
			],
			process: [
				'Inspeksi kondisi existing dan assessment',
				'Perencanaan renovasi dan budget estimation',
				'Desain konsep baru dengan 3D visualization',
				'Demolition dan structural work (jika perlu)',
				'Installation dan finishing work',
				'Final inspection dan handover'
			],
			benefits: [
				'Meningkatkan nilai properti',
				'Efisiensi energi dan maintenance',
				'Desain up-to-date dan modern',
				'Perbaikan struktur dan fungsi',
				'Garansi hasil renovasi'
			],
			portfolio: [
				{
					title: 'House Renovation',
					image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
					description: 'Renovasi rumah dari klasik ke modern'
				},
				{
					title: 'Kitchen Makeover',
					image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
					description: 'Transformasi dapur menjadi lebih fungsional'
				},
				{
					title: 'Bathroom Upgrade',
					image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
					description: 'Upgrade kamar mandi dengan sentuhan luxury'
				}
			]
		},
		'custom-furniture': {
			icon: '🎨',
			title: 'Custom Furniture',
			subtitle: 'Furniture Eksklusif Sesuai Kebutuhan Anda',
			description: 'Kami merancang dan memproduksi furniture custom yang unik, berkualitas tinggi, dan sesuai dengan kebutuhan spesifik Anda. Setiap piece adalah karya seni yang fungsional.',
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
			features: [
				{
					title: 'Custom Cabinets',
					description: 'Lemari dan kabinet sesuai ukuran dan kebutuhan',
					icon: '🗄️'
				},
				{
					title: 'Bespoke Tables',
					description: 'Meja makan, kerja, atau coffee table custom',
					icon: '🪑'
				},
				{
					title: 'Built-in Furniture',
					description: 'Furniture built-in yang maksimalkan space',
					icon: '📐'
				},
				{
					title: 'Decorative Pieces',
					description: 'Furniture dekoratif sebagai statement piece',
					icon: '🎭'
				}
			],
			process: [
				'Konsultasi kebutuhan dan preferensi desain',
				'Pengukuran dan space planning',
				'Desain 3D dan material selection',
				'Approval desain dan quotation',
				'Production dengan quality control ketat',
				'Delivery dan installation'
			],
			benefits: [
				'Desain 100% sesuai keinginan Anda',
				'Material pilihan berkualitas premium',
				'Ukuran pas dengan space Anda',
				'Craftsmanship detail dan presisi',
				'Garansi produk dan after-sales'
			],
			portfolio: [
				{
					title: 'Custom Dining Set',
					image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
					description: 'Set meja makan custom dengan desain unik'
				},
				{
					title: 'Built-in Wardrobe',
					image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
					description: 'Lemari built-in yang maksimalkan ruang'
				},
				{
					title: 'Custom Bookshelf',
					image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
					description: 'Rak buku custom dengan desain modern'
				}
			]
		}
	};
	
	const service = servicesData[slug] || servicesData['residential-design'];
</script>

<svelte:head>
	<title>{service.title} - Teras Interior Production</title>
	<meta name="description" content={service.description} />
</svelte:head>

<div class="service-detail">
	<!-- Hero Section -->
	<section class="service-hero">
		<AnimatedBackground variant="dark" />
		<div class="service-hero-overlay" style="background-image: url('{service.image}')"></div>
		<div class="container">
			<div class="service-hero-content">
				<a href="/#services" class="back-link">← Kembali ke Services</a>
				<div class="service-icon-large">{service.icon}</div>
				<h1 class="service-hero-title">{service.title}</h1>
				<p class="service-hero-subtitle">{service.subtitle}</p>
			</div>
		</div>
	</section>

	<!-- Description Section -->
	<section class="service-description">
		<div class="container">
			<div class="description-content">
				<div class="section-label">About This Service</div>
				<h2 class="section-title">Apa yang Kami Tawarkan</h2>
				<p class="description-text">{service.description}</p>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="service-features">
		<AnimatedBackground variant="subtle" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Features</div>
				<h2 class="section-title">Layanan yang Kami Sediakan</h2>
			</div>
			<div class="features-grid">
				{#each service.features as feature}
					<div class="feature-card">
						<div class="feature-icon-large">{feature.icon}</div>
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="service-process">
		<GeometricPattern opacity={0.02} />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Our Process</div>
				<h2 class="section-title">Bagaimana Kami Bekerja</h2>
			</div>
			<div class="process-list">
				{#each service.process as step, index}
					<div class="process-step">
						<div class="step-number">{String(index + 1).padStart(2, '0')}</div>
						<p class="step-text">{step}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="service-benefits">
		<WaveBackground color="#ff6b35" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Benefits</div>
				<h2 class="section-title">Keuntungan Bekerja dengan Kami</h2>
			</div>
			<div class="benefits-grid">
				{#each service.benefits as benefit}
					<div class="benefit-item">
						<div class="benefit-icon">✓</div>
						<p class="benefit-text">{benefit}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section class="service-portfolio">
		<AnimatedBackground variant="dark" />
		<div class="container">
			<div class="section-header">
				<div class="section-label">Portfolio</div>
				<h2 class="section-title">Proyek Terkait</h2>
			</div>
			<div class="portfolio-grid">
				{#each service.portfolio as project}
					<div class="portfolio-card">
						<img src={project.image} alt={project.title} />
						<div class="portfolio-info">
							<h3 class="portfolio-title">{project.title}</h3>
							<p class="portfolio-description">{project.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<CTASection />
	
	<!-- Floating WhatsApp -->
	<FloatingWhatsApp />
	
	<!-- Footer -->
	<Footer />
</div>
