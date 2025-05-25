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
			<Route
				path="/new"
				component={() => (
					<HomePageLayout>
						<NewJournalPage />
					</HomePageLayout>
				)}
			/>
			<Route
				path="/"
				component={() => (
					<HomePageLayout>
						<HomePage />
					</HomePageLayout>
				)}
			/>
			<Route>
				<div className="text-white">404: No such page!</div>
			</Route>
		</Switch>
	</JournalStoreContext>
);
