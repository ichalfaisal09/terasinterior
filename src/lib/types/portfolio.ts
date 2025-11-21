// Portfolio type definitions
export interface Portfolio {
	id: number;
	title: string;
	description: string | null;
	category: string;
	image_url: string;
	published: boolean;
	order_index: number;
	created_at: string;
	updated_at: string | null;
}

export interface PortfolioCreate {
	title: string;
	description?: string;
	category: string;
	image_url: string;
	published: boolean;
	order_index: number;
}

export interface PortfolioUpdate {
	title?: string;
	description?: string;
	category?: string;
	image_url?: string;
	published?: boolean;
	order_index?: number;
}
