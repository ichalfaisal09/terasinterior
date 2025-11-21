// Authentication API Functions
import { apiRequest } from './client';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface User {
	id: number;
	email: string;
	name: string | null;
	role: string;
}

export interface LoginResponse {
	access_token: string;
	token_type: string;
	user: User;
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
	return apiRequest<LoginResponse>('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(credentials)
	});
}

/**
 * Get current user info (requires authentication)
 */
export async function getCurrentUser(token: string): Promise<User> {
	return apiRequest<User>('/api/auth/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
