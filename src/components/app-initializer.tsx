import { useEffect, useState, useRef } from "react";
import { runMigrations } from "@/db/run-migrations";
import { client, db } from "@/db/db";
import migrations from "@/db/migrations.json";
import { PGliteProvider } from "@electric-sql/pglite-react";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [init, setInit] = useState(false);
	const didRunMigrations = useRef(false);

	useEffect(() => {
		if (didRunMigrations.current) return;
		didRunMigrations.current = true;
		(async () => {
			await runMigrations(db, migrations);
			setInit(true);
		})();
	}, []);

	if (!init) return null;

	return <PGliteProvider db={client}>{children}</PGliteProvider>;
};
