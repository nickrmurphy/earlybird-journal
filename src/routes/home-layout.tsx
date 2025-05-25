import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { PlusIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { Link, useRoute } from "wouter";

export const HomePageLayout: FC<PropsWithChildren> = ({ children }) => {
	const [isNewRoute] = useRoute("/new");

	return (
		<div className="flex h-screen p-2">
			<Paper asChild className="w-64 min-h-full p-4 flex flex-col">
				<aside>
					<Button asChild variant={isNewRoute ? "secondary" : "primary"}>
						<Link href={isNewRoute ? "/" : "/new"}>
							{isNewRoute ? "Cancel" : "Create a journal"}
							<PlusIcon />
						</Link>
					</Button>
				</aside>
			</Paper>
			<div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 px-5">
				{children}
			</div>
		</div>
	);
};
