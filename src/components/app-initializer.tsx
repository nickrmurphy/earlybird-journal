import { runMigrations } from "@/db/run-migrations";
import { client, db } from "@/db/db";
import migrations from "@/db/migrations.json";
import { createContext, useContext, type ParentComponent } from "solid-js";
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
	let init = false;
	let didRunMigrations = false;

	if (!didRunMigrations) {
		didRunMigrations = true;
		(async () => {
			await runMigrations(db, migrations);
			init = true;
		})();
	}

	if (!init) return null;

	return <PGliteProvider db={client}>{props.children}</PGliteProvider>;
};
