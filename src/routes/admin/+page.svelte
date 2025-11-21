<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/auth';
	import type { LoginResponse } from '$lib/api/auth';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state<string | null>(null);
	let showPassword = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = null;
		loading = true;

		try {
			const response: LoginResponse = await login({ email, password });
			
			// Store token and user info
			localStorage.setItem('token', response.access_token);
			localStorage.setItem('user', JSON.stringify(response.user));
			
			// Redirect to dashboard
			goto('/admin/dashboard');
		} catch (e) {
			error = e instanceof Error ? e.message : 'Login gagal. Silakan coba lagi.';
			console.error('Login error:', e);
		} finally {
			loading = false;
		}
	}

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<svelte:head>
	<title>Admin Login - Teras Interior</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="login-page">
	<div class="login-container">
		<div class="login-header">
			<div class="logo">
				<span class="logo-icon">🏠</span>
				<h1>Teras Interior</h1>
			</div>
			<p class="subtitle">Dashboard Admin</p>
		</div>

		<form class="login-form" onsubmit={handleLogin}>
			{#if error}
				<div class="error-message">
					<span class="error-icon">⚠️</span>
					<p>{error}</p>
				</div>
			{/if}

			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="admin@terasinterior.com"
					required
					disabled={loading}
					autocomplete="email"
				/>
			</div>

			<div class="form-group">
				<label for="password">Kata Sandi</label>
				<div class="password-input">
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						bind:value={password}
						placeholder="Masukkan kata sandi"
						required
						disabled={loading}
						autocomplete="current-password"
					/>
					<button
						type="button"
						class="toggle-password"
						onclick={togglePassword}
						disabled={loading}
						aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
					>
						{showPassword ? '👁️' : '👁️‍🗨️'}
					</button>
				</div>
			</div>

			<button type="submit" class="login-button" disabled={loading}>
				{#if loading}
					<span class="spinner"></span>
					<span>Masuk...</span>
				{:else}
					<span>Masuk</span>
				{/if}
			</button>
		</form>

		<div class="login-footer">
			<p>Hanya untuk personel yang berwenang</p>
			<a href="/">← Kembali ke Website</a>
		</div>
	</div>

	<div class="background-decoration">
		<div class="circle circle-1"></div>
		<div class="circle circle-2"></div>
		<div class="circle circle-3"></div>
	</div>
</div>

<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
		padding: 20px;
		position: relative;
		overflow: hidden;
	}

	.background-decoration {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		opacity: 0.1;
		filter: blur(60px);
		animation: float 20s infinite ease-in-out;
	}

	.circle-1 {
		width: 300px;
		height: 300px;
		top: -100px;
		left: -100px;
		animation-delay: 0s;
	}

	.circle-2 {
		width: 400px;
		height: 400px;
		bottom: -150px;
		right: -150px;
		animation-delay: 7s;
	}

	.circle-3 {
		width: 250px;
		height: 250px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: 14s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	.login-container {
		width: 100%;
		max-width: 450px;
		background: rgba(26, 26, 26, 0.8);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 50px 40px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		position: relative;
		z-index: 1;
	}

	.login-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		margin-bottom: 10px;
	}

	.logo-icon {
		font-size: 48px;
		filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.5));
	}

	.logo h1 {
		font-size: 32px;
		font-weight: 700;
		color: white;
		margin: 0;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: 16px;
		color: #b0b0b0;
		margin: 0;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 15px;
		background: rgba(255, 107, 107, 0.1);
		border: 1px solid rgba(255, 107, 107, 0.3);
		border-radius: 10px;
		color: #ff6b6b;
		animation: shake 0.5s ease;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-10px);
		}
		75% {
			transform: translateX(10px);
		}
	}

	.error-icon {
		font-size: 20px;
	}

	.error-message p {
		margin: 0;
		font-size: 14px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group label {
		font-size: 14px;
		font-weight: 600;
		color: #e0e0e0;
	}

	.form-group input {
		padding: 15px 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: white;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	.form-group input:focus {
		outline: none;
		border-color: #ff6b35;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
	}

	.form-group input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.form-group input::placeholder {
		color: #666;
	}

	.password-input {
		position: relative;
		display: flex;
		align-items: center;
	}

	.password-input input {
		flex: 1;
		padding-right: 50px;
	}

	.toggle-password {
		position: absolute;
		right: 15px;
		background: none;
		border: none;
		color: #b0b0b0;
		cursor: pointer;
		font-size: 20px;
		padding: 5px;
		transition: color 0.3s ease;
	}

	.toggle-password:hover:not(:disabled) {
		color: #ff6b35;
	}

	.toggle-password:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.login-button {
		padding: 15px 30px;
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 10px;
	}

	.login-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
	}

	.login-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.login-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.login-footer {
		margin-top: 30px;
		text-align: center;
		color: #b0b0b0;
		font-size: 14px;
	}

	.login-footer p {
		margin: 0 0 10px 0;
	}

	.login-footer a {
		color: #ff6b35;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.login-footer a:hover {
		color: #f7931e;
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.login-container {
			padding: 40px 30px;
		}

		.logo h1 {
			font-size: 28px;
		}

		.logo-icon {
			font-size: 40px;
		}
	}
</style>
