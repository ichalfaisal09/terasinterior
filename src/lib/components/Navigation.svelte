<script lang="ts">
	let { scrollY = 0, isMenuOpen = $bindable(false) } = $props();
</script>

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

{#if isMenuOpen}
	<div 
		class="mobile-menu" 
		role="dialog" 
		aria-modal="true"
		tabindex="-1"
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
