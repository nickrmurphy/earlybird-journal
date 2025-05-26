import { Button, Input, Textarea } from "@/components";
import { Paper } from "@/components/surfaces";
import { createJournal } from "@/resources";
import { useNavigate } from "@solidjs/router";
import { ArrowRightIcon } from "lucide-solid";
import { createSignal } from "solid-js";

export const NewJournalPage = () => {
	const navigate = useNavigate();

	const [title, setTitle] = createSignal("");
	const [intention, setIntention] = createSignal("");

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		try {
			// TODO: Replace "clientId" with actual client ID or context
			const { id } = await createJournal({
				title: title(),
				intention: intention(),
				updatedBy: "clientId",
			});
			navigate(`/journal/${id}`);
		} catch (err) {
			// Error is handled by the hook
			console.error("Failed to create journal:", err);
		}
	};

	return (
		<Paper variant="white">
			<main class="col-span-2 p-4">
				<form
					class="flex flex-col gap-4 mt-6"
					autocomplete="off"
					onSubmit={handleSubmit}
				>
					<Input
						label="Title"
						type="text"
						name="title"
						value={title()}
						onInput={(e) => setTitle(e.currentTarget.value)}
						placeholder="Journal title"
						required
					/>
					<Textarea
						label="Intention"
						name="intention"
						rows={6}
						value={intention()}
						onInput={(e) => setIntention(e.currentTarget.value)}
						placeholder="What is your intention for this journal?"
						required
					/>
					<div>
						<Button type="submit">
							Continue <ArrowRightIcon />
						</Button>
					</div>
				</form>
			</main>
		</Paper>
	);
};
