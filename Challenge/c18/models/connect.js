import readline from "readline";
import path from "path";
import sqlite3 from "sqlite3";
import Table from "cli-table";
export const line = "=".repeat(process.stdout.columns),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  dbpath = path.join(path.resolve(), "..",  "db", "university.db"),
  db = new sqlite3.Database(dbpath);
export default Table;
