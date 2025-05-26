import { db } from "@/db/db";
import { type NewJournal, journals } from "@/db/schema";
import { createSignal } from "solid-js";

/**
 * Creates a mutation helper for creating new journals
 * @returns Mutation functions and state for creating journals
 */
export function createJournalMutation() {
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

	const reset = () => {
		setError(null);
		setIsCreating(false);
	};

	return {
		create,
		reset,
		get isCreating() {
			return isCreating();
		},
		get error() {
			return error();
		},
	};
}
