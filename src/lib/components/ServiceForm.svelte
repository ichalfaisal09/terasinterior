<script lang="ts">
	import type { ServiceCreate, ServiceUpdate } from '$lib/types/service';

	interface Props {
		initialData?: ServiceUpdate & { id?: number };
		onSubmit: (data: ServiceCreate | ServiceUpdate) => Promise<void>;
		onCancel: () => void;
		isEdit?: boolean;
	}

	let { initialData, onSubmit, onCancel, isEdit = false }: Props = $props();

	let title = $state(initialData?.title || '');
	let description = $state(initialData?.description || '');
	let icon = $state(initialData?.icon || '🏠');
	let featuresText = $state(initialData?.features?.join('\n') || '');
	let displayOrder = $state(initialData?.display_order || 0);
	let published = $state(initialData?.published ?? true);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// Common icons for quick selection
	const commonIcons = ['🏠', '🏢', '🔨', '💡', '🪑', '🎨', '✨', '🏗️', '🖼️', '🛋️', '🚪', '🪟'];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		loading = true;

		try {
			const features = featuresText
				.split('\n')
				.map((f) => f.trim())
				.filter((f) => f.length > 0);

			const data: ServiceCreate = {
				title: title.trim(),
				description: description.trim(),
				icon: icon.trim(),
				features,
				display_order: displayOrder,
				published
			};

			await onSubmit(data);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menyimpan layanan';
			console.error('Submit error:', e);
		} finally {
			loading = false;
		}
	}
</script>

<form class="service-form" onsubmit={handleSubmit}>
	{#if error}
		<div class="error-message">
			<span>⚠️</span>
			<p>{error}</p>
			<button type="button" onclick={() => (error = null)}>✕</button>
		</div>
	{/if}

	<div class="form-section">
		<h3>Informasi Dasar</h3>

		<div class="form-group">
			<label for="title">Nama Layanan *</label>
			<input
				id="title"
				type="text"
				bind:value={title}
				placeholder="Contoh: Desain Residential"
				required
				disabled={loading}
			/>
		</div>

		<div class="form-group">
			<label for="description">Deskripsi *</label>
			<textarea
				id="description"
				bind:value={description}
				placeholder="Jelaskan layanan ini..."
				rows="4"
				required
				disabled={loading}
			></textarea>
		</div>

		<div class="form-group">
			<label for="icon">Icon *</label>
			<div class="icon-input-group">
				<input
					id="icon"
					type="text"
					bind:value={icon}
					placeholder="🏠"
					maxlength="10"
					required
					disabled={loading}
					class="icon-input"
				/>
				<div class="icon-preview">{icon}</div>
			</div>
			<div class="icon-picker">
				{#each commonIcons as emoji}
					<button
						type="button"
						class="icon-btn"
						class:active={icon === emoji}
						onclick={() => (icon = emoji)}
						disabled={loading}
					>
						{emoji}
					</button>
				{/each}
			</div>
			<p class="help-text">Pilih dari icon di atas atau ketik emoji sendiri</p>
		</div>
	</div>

	<div class="form-section">
		<h3>Fitur Layanan</h3>

		<div class="form-group">
			<label for="features">Fitur (satu per baris)</label>
			<textarea
				id="features"
				bind:value={featuresText}
				placeholder="Desain Ruang Tamu&#10;Desain Kamar Tidur&#10;Desain Dapur"
				rows="6"
				disabled={loading}
			></textarea>
			<p class="help-text">Tulis satu fitur per baris</p>
		</div>
	</div>

	<div class="form-section">
		<h3>Pengaturan</h3>

		<div class="form-row">
			<div class="form-group">
				<label for="order">Urutan Tampilan</label>
				<input
					id="order"
					type="number"
					bind:value={displayOrder}
					min="0"
					disabled={loading}
				/>
				<p class="help-text">Angka lebih kecil tampil lebih dulu</p>
			</div>

			<div class="form-group">
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={published} disabled={loading} />
					<span>Publikasikan layanan ini</span>
				</label>
			</div>
		</div>
	</div>

	<div class="form-actions">
		<button type="button" class="btn-cancel" onclick={onCancel} disabled={loading}>
			Batal
		</button>
		<button type="submit" class="btn-submit" disabled={loading}>
			{#if loading}
				<span class="spinner"></span>
				<span>Menyimpan...</span>
			{:else}
				<span>{isEdit ? 'Update Layanan' : 'Tambah Layanan'}</span>
			{/if}
		</button>
	</div>
</form>

<style>
	.service-form {
		max-width: 800px;
		margin: 0 auto;
	}

	.form-section {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 30px;
		margin-bottom: 25px;
	}

	.form-section h3 {
		font-size: 18px;
		color: white;
		margin: 0 0 20px 0;
		padding-bottom: 15px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	label {
		display: block;
		color: #b0b0b0;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	input[type='text'],
	input[type='number'],
	textarea {
		width: 100%;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	input[type='text']:focus,
	input[type='number']:focus,
	textarea:focus {
		outline: none;
		border-color: #ff6b35;
		background: rgba(255, 255, 255, 0.08);
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	textarea {
		resize: vertical;
		min-height: 100px;
	}

	.icon-input-group {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.icon-input {
		flex: 1;
	}

	.icon-preview {
		width: 60px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		font-size: 32px;
	}

	.icon-picker {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 12px;
	}

	.icon-btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		font-size: 24px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.icon-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.1);
	}

	.icon-btn.active {
		background: rgba(255, 107, 53, 0.2);
		border-color: #ff6b35;
	}

	.icon-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		padding: 12px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 8px;
		transition: all 0.3s ease;
	}

	.checkbox-label:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.checkbox-label input[type='checkbox'] {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}

	.checkbox-label span {
		color: white;
		font-size: 14px;
	}

	.help-text {
		margin: 8px 0 0 0;
		font-size: 12px;
		color: #888;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 20px;
		background: rgba(255, 107, 107, 0.1);
		border: 1px solid rgba(255, 107, 107, 0.3);
		border-radius: 10px;
		color: #ff6b6b;
		margin-bottom: 20px;
	}

	.error-message p {
		flex: 1;
		margin: 0;
	}

	.error-message button {
		background: none;
		border: none;
		color: #ff6b6b;
		cursor: pointer;
		font-size: 18px;
		padding: 5px;
	}

	.form-actions {
		display: flex;
		gap: 15px;
		justify-content: flex-end;
		margin-top: 30px;
	}

	.btn-cancel,
	.btn-submit {
		padding: 12px 32px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.btn-cancel {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
	}

	.btn-cancel:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
	}

	.btn-submit {
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
	}

	.btn-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
	}

	.btn-cancel:disabled,
	.btn-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.form-section {
			padding: 20px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column-reverse;
		}

		.btn-cancel,
		.btn-submit {
			width: 100%;
			justify-content: center;
		}
	}
</style>
