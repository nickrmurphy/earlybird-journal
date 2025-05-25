import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext } from "@/contexts";
import { HomePage } from "@/routes/home";

export const App = () => (
	<JournalStoreContext>
		<Switch>
			<Route path="/" component={HomePage} />
			<Route
				path="/journal/:journalId"
				component={() => {
					const { journalId } = useParams<{ journalId: string }>();
					return <div>Journal Page for {journalId}</div>;
				}}
			/>
			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	</JournalStoreContext>
);
