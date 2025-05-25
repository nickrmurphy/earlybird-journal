export const journalSchema = {
	meta: {
		id: {
			type: "string",
			default: crypto.randomUUID(),
		},
		name: {
			type: "string",
			default: "Unnamed Journal",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
	},
	notes: {
		title: {
			type: "string",
			default: "Untitled",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		}
	},
} as const;
