import { db, initializeDatabase } from "@/db/db";
import migrations from "@/db/migrations.json";
import { runMigrations } from "@/db/run-migrations";
import {
	type ParentComponent,
	Show,
	createEffect,
	createSignal,
} from "solid-js";

export const AppInitializer: ParentComponent = (props) => {
	const [initialized, setInitialized] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);

	createEffect(() => {
		(async () => {
			try {
				await initializeDatabase();
				await runMigrations(db, migrations);
				setInitialized(true);
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Failed to initialize app";
				console.error("Failed to run migrations:", err);
				setError(message);
			}
		})();
	});

	return (
		<Show
			when={!error()}
			fallback={
				<div class="p-4 text-red-600">Failed to initialize app: {error()}</div>
			}
		>
			<Show when={initialized()} fallback={<div>Initializing...</div>}>
				{props.children}
			</Show>
		</Show>
	);
};
