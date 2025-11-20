<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';
	import GeometricPattern from './GeometricPattern.svelte';
</script>

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
