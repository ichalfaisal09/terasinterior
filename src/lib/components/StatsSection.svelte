<script lang="ts">
	import AnimatedCounter from './AnimatedCounter.svelte';
</script>

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
