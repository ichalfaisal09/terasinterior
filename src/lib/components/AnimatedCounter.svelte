<script lang="ts">
	import { onMount } from 'svelte';
	
	let { target = 0, duration = 2000, suffix = '' } = $props();
	let count = $state(0);
	
	onMount(() => {
		const increment = target / (duration / 16);
		const timer = setInterval(() => {
			count += increment;
			if (count >= target) {
				count = target;
				clearInterval(timer);
			}
		}, 16);
		
		return () => clearInterval(timer);
	});
</script>

<span>{Math.floor(count)}{suffix}</span>
