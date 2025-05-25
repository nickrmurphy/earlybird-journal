import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { JournalStoreContext } from "./contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<JournalStoreContext>
			<App />
		</JournalStoreContext>
	</React.StrictMode>,
);
