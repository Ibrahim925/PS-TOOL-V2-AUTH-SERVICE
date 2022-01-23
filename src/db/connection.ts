import "reflect-metadata";
import { createConnection } from "typeorm";
import "dotenv/config";

const connect = async () => {
	createConnection({
		name: "db connection",
		type: "mysql",
		host: "us-cdbr-east-05.cleardb.net",
		port: 3306,
		username: "bfc871697a0584",
		password: "89b32f18",
		database: "heroku_b510b87812e7040",
		synchronize: true,
		entities: ["src/db/entity/**/*.ts"],
		cli: {
			entitiesDir: "src/db/entity",
			migrationsDir: "src/db/migration",
			subscribersDir: "src/db/subscriber",
		},
	});
};

connect();
