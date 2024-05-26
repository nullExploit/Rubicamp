import express from "express";
import { readFileSync, writeFileSync } from "fs";
import bodyParser from "body-parser";

const file = "data.json",
  raw = readFileSync(`./${file}`),
  datas = JSON.parse(raw);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("view", { datas });
});

app.get("/add", (req, res) => {
  res.render("form", { data: {} });
});

app.get("/delete/:id", (req, res) => {
  const index = req.params.id;
  datas.splice(index, 1);
  writeFileSync(file, JSON.stringify(datas));
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const index = req.params.id;
  res.render("form", { data: datas[index] });
});

app.post("/add", (req, res) => {
  const name = req.body.name,
    height = Number(req.body.height),
    weight = Number(req.body.weight),
    birthday = req.body.birthday,
    isMarried = JSON.parse(req.body.isMarried);

  datas.push({ name, height, weight, birthday, isMarried });
  writeFileSync(file, JSON.stringify(datas));
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const index = req.params.id,
    name = req.body.name,
    height = Number(req.body.height),
    weight = Number(req.body.weight),
    birthday = req.body.birthday,
    isMarried = JSON.parse(req.body.isMarried);

  datas[index] = { name, height, weight, birthday, isMarried };
  writeFileSync(file, JSON.stringify(datas));
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listeninig Port 3000...");
});
