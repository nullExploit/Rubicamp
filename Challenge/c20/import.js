import express from "express";
import bodyParser from "body-parser";
import path from "path";
import sqlite3 from "sqlite3";

const app = express(),
  dbpath = path.join(path.resolve(), "db", "datas.db"),
  db = new sqlite3.Database(dbpath);

export { app, bodyParser, path, db, express };
