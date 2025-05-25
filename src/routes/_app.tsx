import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext, RootStoreContext } from "@/contexts";
import { HomePage } from "@/routes/home";

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
							<div>Journal Page for {journalId}</div>
						</JournalStoreContext>
					);
				}}
			/>
			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	</RootStoreContext>
);
