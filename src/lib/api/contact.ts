// Contact API Functions
import { apiRequest } from './client';
import type { Contact, ContactCreate } from '$lib/types/contact';

/**
 * Submit contact form (public endpoint)
 */
export async function submitContact(data: ContactCreate): Promise<Contact> {
	return apiRequest<Contact>('/api/contact/', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}

/**
 * Get all contacts (admin only)
 */
export async function getAllContacts(token: string): Promise<Contact[]> {
	return apiRequest<Contact[]>('/api/contact/', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Get single contact (admin only)
 */
export async function getContactById(id: number, token: string): Promise<Contact> {
	return apiRequest<Contact>(`/api/contact/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Update contact status (admin only)
 */
export async function updateContactStatus(
	id: number,
	status: string,
	token: string
): Promise<Contact> {
	return apiRequest<Contact>(`/api/contact/${id}/status?status=${status}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

/**
 * Delete contact (admin only)
 */
export async function deleteContact(id: number, token: string): Promise<void> {
	return apiRequest<void>(`/api/contact/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
