export const prerender = true;

// Generate static pages for all slugs
export function entries() {
	return [
		{ slug: 'residential-design' },
		{ slug: 'commercial-design' },
		{ slug: 'renovation' },
		{ slug: 'custom-furniture' }
	];
}
