// API Client Configuration
import { env } from '$env/dynamic/public';

export const API_URL = env.PUBLIC_API_URL || import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export class APIError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: any
	) {
		super(message);
		this.name = 'APIError';
	}
}

export async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${API_URL}${endpoint}`;
	
	const config: RequestInit = {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	};

	try {
		const response = await fetch(url, config);
		
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new APIError(
				errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
				response.status,
				errorData
			);
		}

		// Handle 204 No Content
		if (response.status === 204) {
			return null as T;
		}

		return await response.json();
	} catch (error) {
		if (error instanceof APIError) {
			throw error;
		}
		
		// Network or other errors
		throw new APIError(
			error instanceof Error ? error.message : 'Network error',
			0
		);
	}
}
