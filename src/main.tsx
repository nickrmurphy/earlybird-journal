import { render } from "solid-js/web";
import { App } from "@/routes/_app";
import "./main.css";

render(() => <App />, document.getElementById("root") as HTMLElement);
