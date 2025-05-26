import { db } from "@/db/db";
import { journals, type NewJournal } from "@/db/schema";

export const useCreateJournal = () => {
	const create = (data: NewJournal) =>
		db.insert(journals).values(data).returning().execute();

	return {
		create,
	};
};
