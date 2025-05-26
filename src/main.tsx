import { App } from "@/routes/_app";
import { render } from "solid-js/web";
import "./main.css";

render(() => <App />, document.getElementById("root") as HTMLElement);
