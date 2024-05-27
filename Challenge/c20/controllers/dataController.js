import Data from "../models/Data.js";

export function getData(req, res) {
  const name = req.query.name,
    height = req.query.height || "",
    weight = req.query.weight || "",
    birthdateFrom = req.query.birthdateFrom,
    birthdateTo = req.query.birthdateTo,
    married = req.query.married,
    operation = req.query.operation || "AND",
    url = req.url === "/" ? "/?page=1" : req.url,
    page = req.query.page || 1;

  Data.all(
    name,
    height,
    weight,
    birthdateFrom,
    birthdateTo,
    married,
    operation,
    page,
    ({ datas, pages, offset }) => {
      res.render("data", {
        datas,
        pages,
        page,
        url,
        offset,
        name,
        height,
        weight,
        birthdateFrom,
        birthdateTo,
        married,
        operation,
      });
    }
  );
}

export function getAdd(req, res) {
  res.render("form", { data: {} });
}

export function getEdit(req, res) {
  const index = req.params.id;

  Data.get(index, (data) => {
    res.render("form", { data });
  });
}

export function postAdd(req, res) {
  const name = req.body.name,
    height = Number(req.body.height),
    weight = Number(req.body.weight),
    birthdate = req.body.birthdate,
    married = JSON.parse(req.body.married);

  Data.create(name, height, weight, birthdate, married, () => {
    res.redirect("/");
  });
}

export function postEdit(req, res) {
  const name = req.body.name,
    height = Number(req.body.height),
    weight = Number(req.body.weight),
    birthdate = req.body.birthdate,
    married = JSON.parse(req.body.married),
    index = req.params.id;

  Data.update(name, height, weight, birthdate, married, index, () => {
    res.redirect("/");
  });
}

export function getDelete(req, res) {
  const index = req.params.id;

  Data.delete(index, () => {
    res.redirect("/");
  });
}
