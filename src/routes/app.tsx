import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext, RootStoreContext } from "@/contexts";
import { HomePage } from "@/routes/home";
import { JournalPage } from "@/routes/journal";

export const App = () => (
	<RootStoreContext>
		<Switch>
			<Route path="/" component={HomePage} />
			<Route
				path="/journal/:journalId"
				component={() => {
					const { journalId } = useParams<{ journalId: string }>();
					return (
						<JournalStoreContext journalId={journalId}>
							<JournalPage journalId={journalId} />
						</JournalStoreContext>
					);
				}}
			/>
			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	</RootStoreContext>
);
