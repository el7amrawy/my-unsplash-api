import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { data, Img } from "../data";

const routes = Router();

dotenv.config();

const password = process.env.PASS as unknown as string;
const pepper = process.env.PEPPER as unknown as string;
// const rounds = parseInt(process.env.SALT_ROUNDS as unknown as string);

// const hash = bcrypt.hashSync(password + pepper, rounds);

// console.log(hash);

routes.get("/", (_req: Request, res: Response) => {
  res.json(data);
});

routes.post("/", (req: Request, res: Response) => {
  try {
    const img: Img = {
      id: req.body.id,
      imgURL: req.body.imgURL,
      label: req.body.label,
    };
    data.unshift(img);
    console.log(data);
    res.json(data[0]);
  } catch (err) {
    res.json("error: " + err);
  }
});

routes.delete("/", (req: Request, res: Response) => {
  try {
    console.log(req.body);

    if (bcrypt.compareSync(req.body.password + pepper, password)) {
      res.json(1);
    } else {
      res.json("wrong password");
    }
  } catch (err) {
    res.json("error: " + err);
  }
});

export default routes;
