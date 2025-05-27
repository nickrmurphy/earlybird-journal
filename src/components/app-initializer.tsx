import { db, initializeDatabase } from "@/db/db";
import migrations from "@/db/migrations.json";
import { runMigrations } from "@/db/run-migrations";
import {
	type ParentComponent,
	Switch,
	Match,
	createSignal,
	onMount,
} from "solid-js";

export const AppInitializer: ParentComponent = (props) => {
	const [initialized, setInitialized] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);

	onMount(async () => {
		try {
			await initializeDatabase();
			await runMigrations(db, migrations);
			setInitialized(true);
		} catch (err) {
			// Error is handled by the hook
			console.error("Failed to initialize app:", err);
			setError("Failed to initialize app");
		}
	});

	return (
		<Switch>
			<Match when={!!error()}>
				<div class="p-4 text-ink-red">Failed to initialize app</div>
			</Match>
			<Match when={!initialized()}>
				<div>Initializing...</div>
			</Match>
			<Match when={initialized()}>{props.children}</Match>
		</Switch>
	);
};
