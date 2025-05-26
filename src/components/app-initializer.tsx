import { client, db, initializeDatabase } from "@/db/db";
import migrations from "@/db/migrations.json";
import { runMigrations } from "@/db/run-migrations";
import type { PGlite } from "@electric-sql/pglite";
import {
	type ParentComponent,
	Show,
	createContext,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";

const PGliteContext = createContext<PGlite>();

export const usePGlite = () => {
	const pglite = useContext(PGliteContext);
	if (!pglite) {
		throw new Error("usePGlite must be used within a PGliteProvider");
	}
	return pglite;
};

const PGliteProvider: ParentComponent<{ db: PGlite }> = (props) => {
	return (
		<PGliteContext.Provider value={props.db}>
			{props.children}
		</PGliteContext.Provider>
	);
};

export const AppInitializer: ParentComponent = (props) => {
	const [initialized, setInitialized] = createSignal(false);
	const [error, setError] = createSignal<Error | null>(null);

	createEffect(() => {
		let mounted = true;
		(async () => {
			try {
				await initializeDatabase();
				await runMigrations(db, migrations);
				if (mounted) {
					setInitialized(true);
				}
			} catch (err) {
				const error =
					err instanceof Error ? err : new Error("Failed to initialize app");
				console.error("Failed to run migrations:", error);
				if (mounted) {
					setError(error);
				}
			}
		})();

		return () => {
			mounted = false;
		};
	});

	return (
		<Show
			when={!error()}
			fallback={
				<div class="p-4 text-red-600">
					Failed to initialize app: {error()?.message}
				</div>
			}
		>
			<Show when={initialized()} fallback={<div>Initializing...</div>}>
				<PGliteProvider db={client}>{props.children}</PGliteProvider>
			</Show>
		</Show>
	);
};
