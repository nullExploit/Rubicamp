import { db } from "./connect.js";

class User {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role || "user";
  }

  sign(cb = function () {}) {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [this.username],
      (err, row) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        else if (row) return console.log("Username sudah terpakai!");
        db.run(
          "INSERT INTO users VALUES (?, ?, ?)",
          [this.username, this.password, this.role],
          (err) => {
            if (err) return console.log("Tolong hubungi administrator!", err);
            cb();
          }
        );
      }
    );
  }

  static login(username, callback) {
    db.get("SELECT * FROM users WHERE username=?", [username], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      callback(row);
    });
  }
}

export default User;
