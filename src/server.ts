import express, { Application } from "express";
import routes from "./api";

const app: Application = express();

app.use(routes);

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
