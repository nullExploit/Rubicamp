import { db } from "../import.js";

export default class Data {
  constructor(name, height, weight, birthDate, married) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.birthDate = birthDate;
    this.married = married;
  }

  static all(
    name,
    height,
    weight,
    birthdateFrom,
    birthdateTo,
    married,
    operation,
    page,
    callback
  ) {
    const limit = 5,
      offset = (page - 1) * limit,
      queryParams = [],
      params = [];

    let sql = "SELECT COUNT(*) AS total FROM data";

    if (name) {
      queryParams.push("name LIKE '%' || ? || '%'");
      params.push(name);
    }

    if (height) {
      queryParams.push("height = ?");
      params.push(Number(height));
    }

    if (weight) {
      queryParams.push("weight = ?");
      params.push(Number(weight));
    }

    if (birthdateFrom) {
      queryParams.push("birthdate >= ?");
      params.push(birthdateFrom);
    }

    if (birthdateTo) {
      queryParams.push("birthdate <= ?");
      params.push(birthdateTo);
    }

    if (married) {
      queryParams.push("married = ?");
      params.push(JSON.parse(married));
    }

    if (queryParams.length) {
      if (operation == "OR") {
        sql += ` WHERE ${queryParams.join(" OR ")} `;
      } else if (operation == "AND") {
        sql += ` WHERE ${queryParams.join(" AND ")} `;
      }
    }

    db.get(sql, params, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);

      const total = row.total,
        pages = Math.ceil(total / limit);

      sql = "SELECT * FROM data";

      if (queryParams.length) {
        if (operation == "OR") {
          sql += ` WHERE ${queryParams.join(" OR ")} `;
        } else if (operation == "AND") {
          sql += ` WHERE ${queryParams.join(" AND ")} `;
        }
      }

      sql += " limit ? offset ?";
      params.push(limit, offset);

      db.all(sql, params, (err, rows) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        callback({ datas: rows, pages, offset });
      });
    });
  }

  static get(id, callback) {
    db.get("SELECT * FROM data WHERE id = ?", [id], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      callback(row);
    });
  }

  static create(name, height, weight, birthdate, married, callback) {
    db.run(
      "INSERT INTO data (name, height, weight, birthdate, married) VALUES (?, ?, ?, ?, ?)",
      [name, height, weight, birthdate, married],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        callback();
      }
    );
  }

  static update(name, height, weight, birthdate, married, id, callback) {
    db.run(
      "UPDATE data SET name = ?, height = ?, weight = ?, birthdate = ?, married = ? WHERE id = ?",
      [name, height, weight, birthdate, married, id],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        callback();
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM data WHERE id = ?", [id], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      callback();
    });
  }
}
