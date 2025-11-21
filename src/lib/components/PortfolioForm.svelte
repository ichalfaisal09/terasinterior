<script lang="ts">
	import type { Portfolio, PortfolioCreate, PortfolioUpdate } from '$lib/types/portfolio';

	interface Props {
		initialData?: Portfolio;
		onSubmit: (data: PortfolioCreate | PortfolioUpdate) => Promise<void>;
		onCancel: () => void;
		submitLabel?: string;
	}

	let { initialData, onSubmit, onCancel, submitLabel = 'Save' }: Props = $props();

	let title = $state(initialData?.title || '');
	let description = $state(initialData?.description || '');
	let category = $state(initialData?.category || 'Residential');
	let imageUrl = $state(initialData?.image_url || '');
	let published = $state(initialData?.published ?? true);
	let orderIndex = $state(initialData?.order_index || 0);

	let loading = $state(false);
	let error = $state<string | null>(null);
	let imagePreview = $state(imageUrl);

	function handleImageUrlChange() {
		imagePreview = imageUrl;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		loading = true;

		try {
			const data = {
				title: title.trim(),
				description: description.trim() || undefined,
				category,
				image_url: imageUrl.trim(),
				published,
				order_index: orderIndex
			};

			await onSubmit(data);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Gagal menyimpan portfolio';
			console.error('Form submit error:', e);
		} finally {
			loading = false;
		}
	}
</script>

<form class="portfolio-form" onsubmit={handleSubmit}>
	{#if error}
		<div class="error-banner">
			<span>⚠️</span>
			<p>{error}</p>
			<button type="button" onclick={() => (error = null)}>✕</button>
		</div>
	{/if}

	<div class="form-grid">
		<!-- Title -->
		<div class="form-group full-width">
			<label for="title">
				Judul <span class="required">*</span>
			</label>
			<input
				type="text"
				id="title"
				bind:value={title}
				placeholder="Contoh: Ruang Tamu Modern"
				required
				disabled={loading}
				maxlength="255"
			/>
			<span class="hint">{title.length}/255 karakter</span>
		</div>

		<!-- Description -->
		<div class="form-group full-width">
			<label for="description">Deskripsi</label>
			<textarea
				id="description"
				bind:value={description}
				placeholder="Deskripsikan item portfolio..."
				disabled={loading}
				rows="4"
			></textarea>
			<span class="hint">Opsional - Deskripsi singkat tentang proyek</span>
		</div>

		<!-- Category -->
		<div class="form-group">
			<label for="category">
				Kategori <span class="required">*</span>
			</label>
			<select id="category" bind:value={category} required disabled={loading}>
				<option value="Residential">Residensial</option>
				<option value="Commercial">Komersial</option>
			</select>
		</div>

		<!-- Order Index -->
		<div class="form-group">
			<label for="order">Urutan Tampilan</label>
			<input
				type="number"
				id="order"
				bind:value={orderIndex}
				min="0"
				disabled={loading}
				placeholder="0"
			/>
			<span class="hint">Angka lebih kecil muncul lebih dulu</span>
		</div>

		<!-- Image URL -->
		<div class="form-group full-width">
			<label for="imageUrl">
				URL Gambar <span class="required">*</span>
			</label>
			<input
				type="url"
				id="imageUrl"
				bind:value={imageUrl}
				oninput={handleImageUrlChange}
				placeholder="https://example.com/image.jpg"
				required
				disabled={loading}
			/>
			<span class="hint">Link langsung ke gambar (jpg, png, webp)</span>
		</div>

		<!-- Image Preview -->
		{#if imagePreview}
			<div class="form-group full-width">
				<label>Pratinjau</label>
				<div class="image-preview">
					<img src={imagePreview} alt="Pratinjau" onerror={() => (imagePreview = '')} />
				</div>
			</div>
		{/if}

		<!-- Published Toggle -->
		<div class="form-group full-width">
			<label class="checkbox-label">
				<input type="checkbox" bind:checked={published} disabled={loading} />
				<span>Publikasikan sekarang</span>
			</label>
			<span class="hint">
				{published ? 'Akan terlihat di website' : 'Akan disimpan sebagai draft'}
			</span>
		</div>
	</div>

	<!-- Form Actions -->
	<div class="form-actions">
		<button type="button" class="btn-secondary" onclick={onCancel} disabled={loading}>
			Batal
		</button>
		<button type="submit" class="btn-primary" disabled={loading}>
			{#if loading}
				<span class="spinner"></span>
				<span>Menyimpan...</span>
			{:else}
				<span>{submitLabel}</span>
			{/if}
		</button>
	</div>
</form>

<style>
	.portfolio-form {
		background: #1a1a1a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 30px;
	}

	.error-banner {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 20px;
		background: rgba(255, 107, 107, 0.1);
		border: 1px solid rgba(255, 107, 107, 0.3);
		border-radius: 10px;
		color: #ff6b6b;
		margin-bottom: 25px;
	}

	.error-banner p {
		flex: 1;
		margin: 0;
	}

	.error-banner button {
		background: none;
		border: none;
		color: #ff6b6b;
		cursor: pointer;
		font-size: 18px;
		padding: 5px;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 25px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	label {
		font-size: 14px;
		font-weight: 600;
		color: #e0e0e0;
	}

	.required {
		color: #ff6b35;
	}

	input[type='text'],
	input[type='url'],
	input[type='number'],
	select,
	textarea {
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: white;
		font-size: 15px;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #ff6b35;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
	}

	input:disabled,
	select:disabled,
	textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	input::placeholder,
	textarea::placeholder {
		color: #666;
	}

	textarea {
		resize: vertical;
		min-height: 100px;
	}

	.hint {
		font-size: 12px;
		color: #888;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-weight: normal;
	}

	.checkbox-label input[type='checkbox'] {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}

	.image-preview {
		width: 100%;
		max-width: 600px;
		aspect-ratio: 16/9;
		border-radius: 8px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.image-preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 15px;
		margin-top: 30px;
		padding-top: 25px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.btn-primary,
	.btn-secondary {
		padding: 12px 30px;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.btn-primary {
		background: linear-gradient(135deg, #ff6b35, #f7931e);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
	}

	.btn-secondary:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
	}

	.btn-primary:disabled,
	.btn-secondary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
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

	@media (max-width: 640px) {
		.portfolio-form {
			padding: 20px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column-reverse;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
