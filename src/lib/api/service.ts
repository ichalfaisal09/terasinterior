// Service API Functions
import { apiRequest } from './client';
import type { Service, ServiceCreate, ServiceUpdate } from '$lib/types/service';

/**
 * Get all services (public endpoint)
 */
export async function getAllServices(publishedOnly: boolean = true): Promise<Service[]> {
	return apiRequest<Service[]>(`/api/services/?published_only=${publishedOnly}`);
}

/**
 * Get service by ID
 */
export async function getServiceById(id: number): Promise<Service> {
	return apiRequest<Service>(`/api/services/${id}`);
}

/**
 * Create new service (admin only)
 */
export async function createService(data: ServiceCreate, token: string): Promise<Service> {
	return apiRequest<Service>('/api/services/', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
}

/**
 * Update service (admin only)
 */
export async function updateService(
	id: number,
	data: ServiceUpdate,
	token: string
): Promise<Service> {
	return apiRequest<Service>(`/api/services/${id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
}

/**
 * Delete service (admin only)
 */
export async function deleteService(id: number, token: string): Promise<void> {
	return apiRequest<void>(`/api/services/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
