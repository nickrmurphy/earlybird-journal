import { button } from "@/components";
import { Paper } from "@/components/surfaces";
import { A, useLocation } from "@solidjs/router";
import { PlusIcon } from "lucide-solid";
import type { ParentComponent } from "solid-js";
import { Match, Switch } from "solid-js";

export const HomePageLayout: ParentComponent = (props) => {
	const location = useLocation();
	const isNewRoute = location.pathname === "/new";

	return (
		<div class="flex h-screen p-2">
			<Paper as="aside" class="w-64 min-h-full p-4 flex flex-col">
				<A
					class={button({ variant: isNewRoute ? "secondary" : "primary" })}
					href={isNewRoute ? "/" : "/new"}
				>
					<Switch>
						<Match when={isNewRoute}>Cancel</Match>
						<Match when={!isNewRoute}>
							Create a journal
							<PlusIcon />
						</Match>
					</Switch>
				</A>
			</Paper>
			<div class="flex-1 overflow-y-auto grid grid-cols-2 gap-4 px-5">
				{props.children}
			</div>
		</div>
	);
};
