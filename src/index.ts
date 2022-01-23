import * as express from "express";
import * as cors from "cors";
import userRouter from "./router/user.route";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

const PORT = 8000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
