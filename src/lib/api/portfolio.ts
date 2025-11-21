// Portfolio API Functions
import { apiRequest } from './client';
import type { Portfolio, PortfolioCreate, PortfolioUpdate } from '$lib/types/portfolio';

/**
 * Get all published portfolio items (public endpoint)
 */
export async function getPublishedPortfolio(): Promise<Portfolio[]> {
	return apiRequest<Portfolio[]>('/api/portfolio/');
}

/**
 * Get all portfolio items including unpublished (admin only)
 */
export async function getAllPortfolio(token: string): Promise<Portfolio[]> {
	return apiRequest<Portfolio[]>('/api/portfolio/admin', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Get single portfolio item by ID
 */
export async function getPortfolioById(id: number): Promise<Portfolio> {
	return apiRequest<Portfolio>(`/api/portfolio/${id}`);
}

/**
 * Create new portfolio item (admin only)
 */
export async function createPortfolio(
	data: PortfolioCreate,
	token: string
): Promise<Portfolio> {
	return apiRequest<Portfolio>('/api/portfolio/', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
}

/**
 * Update portfolio item (admin only)
 */
export async function updatePortfolio(
	id: number,
	data: PortfolioUpdate,
	token: string
): Promise<Portfolio> {
	return apiRequest<Portfolio>(`/api/portfolio/${id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
}

/**
 * Delete portfolio item (admin only)
 */
export async function deletePortfolio(id: number, token: string): Promise<void> {
	return apiRequest<void>(`/api/portfolio/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
