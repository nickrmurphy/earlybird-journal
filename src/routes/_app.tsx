import { Route, Switch, useParams } from "wouter";
import { JournalStoreContext } from "@/contexts";
import { HomePage } from "@/routes/home";
import { JournalPage } from "./journal";
import { HomePageLayout } from "./home-layout";
import { NewJournalPage } from "./new-journal";

export const App = () => (
	<JournalStoreContext>
		<Switch>
			<Route
				path="/journal/:journalId"
				component={() => {
					console.log("Journal page");
					const { journalId } = useParams<{ journalId: string }>();
					return <JournalPage journalId={journalId} />;
				}}
			/>
			<Route>
				<HomePageLayout>
					<Switch>
						<Route path="/new" component={NewJournalPage} />
						<Route path="/" component={HomePage} />
						<Route>
							<div className="text-white">404: No such page!</div>
						</Route>
					</Switch>
				</HomePageLayout>
			</Route>
		</Switch>
	</JournalStoreContext>
);
