import { runMigrations } from "@/db/run-migrations";
import { client, db } from "@/db/db";
import migrations from "@/db/migrations.json";
import {
	createContext,
	useContext,
	createSignal,
	createEffect,
	Show,
	type ParentComponent,
} from "solid-js";
import type { PGlite } from "@electric-sql/pglite";

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

	createEffect(() => {
		let mounted = true;
		(async () => {
			try {
				await runMigrations(db, migrations);
				if (mounted) {
					setInitialized(true);
				}
			} catch (error) {
				console.error("Failed to run migrations:", error);
			}
		})();

		return () => {
			mounted = false;
		};
	});

	return (
		<Show when={initialized()} fallback={<div>Initializing...</div>}>
			<PGliteProvider db={client}>{props.children}</PGliteProvider>
		</Show>
	);
};
