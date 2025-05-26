import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { PlusIcon } from "lucide-solid";
import { useLocation } from "@solidjs/router";
import type { ParentComponent } from "solid-js";

export const HomePageLayout: ParentComponent = (props) => {
	const location = useLocation();
	const isNewRoute = location.pathname === "/new";

	return (
		<div class="flex h-screen p-2">
			<Paper as="aside" class="w-64 min-h-full p-4 flex flex-col">
				<aside>
					<Button
						as="a"
						href={isNewRoute ? "/" : "/new"}
						variant={isNewRoute ? "secondary" : "primary"}
					>
						{isNewRoute ? (
							"Cancel"
						) : (
							<>
								Create a journal
								<PlusIcon />
							</>
						)}
					</Button>
				</aside>
			</Paper>
			<div class="flex-1 overflow-y-auto grid grid-cols-2 gap-4 px-5">
				{props.children}
			</div>
		</div>
	);
};
