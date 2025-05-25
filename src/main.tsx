import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { JournalStoreContext, RootStoreContext } from "./contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RootStoreContext>
			<JournalStoreContext>
				<App />
			</JournalStoreContext>
		</RootStoreContext>
	</React.StrictMode>,
);
