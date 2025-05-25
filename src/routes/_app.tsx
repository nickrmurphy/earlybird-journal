import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext } from "@/contexts";
import { HomePage } from "@/routes/home";
import { JournalPage } from "./journal";
import { HomePageLayout } from "./home-layout";
import { NewJournalPage } from "./new-journal";

export const App = () => (
	<JournalStoreContext>
		<Switch>
			<Route path="/" nest>
				<HomePageLayout>
					<Route path="/" component={HomePage} />
					<Route path="/new" component={NewJournalPage} />
				</HomePageLayout>
			</Route>
			<Route
				path="/journal/:journalId"
				component={() => {
					const { journalId } = useParams<{ journalId: string }>();
					return <JournalPage journalId={journalId} />;
				}}
			/>
			{/* Default route in a switch */}
			<Route>
				<div className="text-white">404: No such page!</div>
			</Route>
		</Switch>
	</JournalStoreContext>
);
