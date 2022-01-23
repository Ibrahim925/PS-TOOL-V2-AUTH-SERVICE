import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import "dotenv/config";

let connection: Connection;
const connect = async () => {
	createConnection({
		type: "mysql",
		host: process.env.dbHost,
		port: 3306,
		username: process.env.dbUserName,
		password: process.env.dbPassword,
		database: process.env.dbName,
		synchronize: true,
		entities: ["src/db/entity/**/*.ts"],
		cli: {
			entitiesDir: "src/db/entity",
			migrationsDir: "src/db/migration",
			subscribersDir: "src/db/subscriber",
		},
	}).then((returnedConnection: Connection) => {
		connection = returnedConnection;
	});
};

connect();
export default connection;
