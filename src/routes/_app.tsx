import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext } from "../contexts";

export const App = () => (
	<Switch>
		<Route path="/" component={() => <div>Home Page</div>} />
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
);
