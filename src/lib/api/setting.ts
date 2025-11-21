// Settings API Functions
import { apiRequest } from './client';
import type { Setting, SettingUpdate, SettingsPublic } from '$lib/types/setting';

/**
 * Get public settings (no auth required)
 */
export async function getPublicSettings(): Promise<SettingsPublic> {
	return apiRequest<SettingsPublic>('/api/settings/public');
}

/**
 * Get all settings (admin only)
 */
export async function getAllSettings(token: string): Promise<Setting[]> {
	return apiRequest<Setting[]>('/api/settings/', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Get settings by category (admin only)
 */
export async function getSettingsByCategory(
	category: string,
	token: string
): Promise<Setting[]> {
	return apiRequest<Setting[]>(`/api/settings/category/${category}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Update single setting (admin only)
 */
export async function updateSetting(
	key: string,
	data: SettingUpdate,
	token: string
): Promise<Setting> {
	return apiRequest<Setting>(`/api/settings/${key}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
}

/**
 * Bulk update settings (admin only)
 */
export async function bulkUpdateSettings(
	updates: Record<string, string>,
	token: string
): Promise<{ message: string; count: number }> {
	return apiRequest<{ message: string; count: number }>('/api/settings/bulk-update', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(updates)
	});
}
