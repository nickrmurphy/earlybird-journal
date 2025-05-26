import { db } from "@/db/db";
import { type NewJournal, journals } from "@/db/schema";
import { createSignal } from "solid-js";

export const useCreateJournal = () => {
	const [isCreating, setIsCreating] = createSignal(false);
	const [error, setError] = createSignal<Error | null>(null);

	const create = async (data: NewJournal) => {
		setIsCreating(true);
		setError(null);

		try {
			const result = await db
				.insert(journals)
				.values(data)
				.returning()
				.execute();
			return result;
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error("Failed to create journal");
			setError(error);
			throw error;
		} finally {
			setIsCreating(false);
		}
	};

	return {
		create,
		isCreating,
		error,
	};
};
