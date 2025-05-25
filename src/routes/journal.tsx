import type { FC } from "react";
import { useNotesList } from "@/hooks";

interface JournalPageProps {
	journalId: string;
}

export const JournalPage: FC<JournalPageProps> = ({ journalId }) => {
	const { ids, actions } = useNotesList();

	return (
		<div>
			{journalId}
			{/* You can now use the notes data here */}
		</div>
	);
};
