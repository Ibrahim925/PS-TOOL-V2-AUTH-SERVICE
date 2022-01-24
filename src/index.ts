import * as express from "express";
import * as cors from "cors";
import userRouter from "./router/user.route";
import tokenRouter from "./router/token.route";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/token", tokenRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
