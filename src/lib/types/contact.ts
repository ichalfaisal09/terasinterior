// Contact type definitions
export interface Contact {
	id: number;
	name: string;
	email: string;
	phone: string | null;
	message: string;
	status: string;
	created_at: string;
	updated_at: string | null;
}

export interface ContactCreate {
	name: string;
	email: string;
	phone?: string;
	message: string;
}
