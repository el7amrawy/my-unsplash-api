import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { data, Img } from "../data";

const routes = Router();

dotenv.config();

const password = process.env.PASS as unknown as string;
const pepper = process.env.PEPPER as unknown as string;
console.log(password, pepper);

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
    res.json(data);
  } catch (err) {
    res.status(406).json("error: " + err);
  }
});

routes.delete("/", (req: Request, res: Response) => {
  try {
    if (
      req.body.password &&
      bcrypt.compareSync(req.body.password + pepper, password)
    ) {
      if (req.body.id) {
        let n: number;
        data.forEach((d, i) => {
          if (req.body.id && d.id == req.body.id) {
            data.splice(i, 1);
          }
        });
        res.json(data);
      } else {
        res.status(400).send("bad request");
      }
    } else {
      throw new Error("wrong password");
    }
  } catch (err) {
    res.status(401).json("error: " + err);
  }
});

export default routes;
