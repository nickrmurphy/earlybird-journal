import { useEffect, useState } from "react";
import { runMigrations } from "@/db/run-migrations";
import { db } from "@/db/db";
import migrations from "@/db/migrations.json";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		(async () => {
			await runMigrations(db, migrations);
			setInit(true);
		})();
	}, []);

	if (!init) return null;
	return <>{children}</>;
};
