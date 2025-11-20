<script lang="ts">
	import AnimatedBackground from './AnimatedBackground.svelte';

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
