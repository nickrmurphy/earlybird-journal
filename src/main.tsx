import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./routes/_app";
import { RootStoreContext } from "./contexts";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RootStoreContext>
			<App />
		</RootStoreContext>
	</React.StrictMode>,
);
