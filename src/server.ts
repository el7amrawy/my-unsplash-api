import express, { Application } from "express";
import routes from "./api";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
