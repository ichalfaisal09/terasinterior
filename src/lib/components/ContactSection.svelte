<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';
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
