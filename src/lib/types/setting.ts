export interface Setting {
	id: number;
	key: string;
	value: string;
	category: string;
	label: string;
	description?: string;
	input_type: string;
	created_at: string;
	updated_at: string;
}

export interface SettingUpdate {
	value: string;
}

export interface SettingsPublic {
	contact_phone?: string;
	contact_whatsapp?: string;
	contact_email?: string;
	contact_address?: string;
	company_name?: string;
	company_tagline?: string;
	company_description?: string;
	social_instagram?: string;
	social_facebook?: string;
	social_youtube?: string;
	social_tiktok?: string;
	seo_title?: string;
	seo_description?: string;
	seo_keywords?: string;
	hours_weekday?: string;
	hours_weekend?: string;
}

export type SettingCategory = 'contact' | 'company' | 'social' | 'seo' | 'business';
