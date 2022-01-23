import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

let connection: Connection;
const connect = async () => {
	createConnection({
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
	}).then((returnedConnection: Connection) => {
		connection = returnedConnection;
	});
};

connect();
export default connection;
