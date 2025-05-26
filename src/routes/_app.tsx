import { AppInitializer } from "@/components/app-initializer";
import { HomePage } from "@/routes/home";
import { Route, Router } from "@solidjs/router";
import { HomePageLayout } from "./home-layout";
import { JournalPage } from "./journal";
import { NewJournalPage } from "./new-journal";

export const App = () => (
	<AppInitializer>
		<Router>
			<Route path="/journal/:journalId" component={JournalPage} />
			<Route path="/" component={HomePageLayout}>
				<Route path="/new" component={NewJournalPage} />
				<Route path="/" component={HomePage} />
			</Route>
		</Router>
	</AppInitializer>
);
