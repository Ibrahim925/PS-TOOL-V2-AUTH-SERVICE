import * as express from "express";
import * as cors from "cors";
import connection from "./db/connection";
import { User } from "./db/entity/User";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000;
app.get("/", async (req: express.Request, res: express.Response) => {
	const user = new User();
	user.userEmail = "BOB IS COOL";
	user.userPassword = "FJLSFLKSD";
	user.userProject = "FLKDJSFLDS";
	user.userType = "ADMIN";
	await connection.manager.save(user);
	res.send("User added!");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
