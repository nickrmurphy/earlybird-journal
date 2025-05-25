import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { Input, Textarea } from "@/components/input";
import { ArrowRightIcon } from "lucide-react";

export const NewJournalPage = () => {
	return (
		<Paper asChild variant="white">
			<main className="col-span-2 p-4">
				<form className="flex flex-col gap-4 mt-6" autoComplete="off">
					<Input
						label="Title"
						type="text"
						name="title"
						placeholder="Journal title"
						required
					/>
					<Textarea
						label="Intention"
						name="intention"
						rows={6}
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
