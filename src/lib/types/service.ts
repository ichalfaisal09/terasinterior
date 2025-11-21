export interface Service {
	id: number;
	title: string;
	description: string;
	icon: string;
	features: string[];
	display_order: number;
	published: boolean;
	created_at: string;
	updated_at: string;
}

export interface ServiceCreate {
	title: string;
	description: string;
	icon: string;
	features: string[];
	display_order?: number;
	published?: boolean;
}

export interface ServiceUpdate {
	title?: string;
	description?: string;
	icon?: string;
	features?: string[];
	display_order?: number;
	published?: boolean;
}
