import { Router, Route, useParams } from "@solidjs/router";
import { AppInitializer } from "@/components/app-initializer";
import { HomePage } from "@/routes/home";
import { JournalPage } from "./journal";
import { HomePageLayout } from "./home-layout";
import { NewJournalPage } from "./new-journal";

export const App = () => (
	<AppInitializer>
		<Router>
			<Route
				path="/journal/:journalId"
				component={() => {
					const params = useParams<{ journalId: string }>();
					return <JournalPage journalId={params.journalId} />;
				}}
			/>
			<Route path="/" component={HomePageLayout}>
				<Route path="/new" component={NewJournalPage} />
				<Route path="/" component={HomePage} />
			</Route>
		</Router>
	</AppInitializer>
);
