<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';
	import WaveBackground from './WaveBackground.svelte';
	import AnimatedCounter from './AnimatedCounter.svelte';
</script>

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
