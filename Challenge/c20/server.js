import { app, bodyParser, path, express } from "./import.js";
import {
  getData,
  getAdd,
  postAdd,
  getEdit,
  postEdit,
  getDelete,
} from "./controllers/dataController.js";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/", express.static(path.join(path.resolve(), "public")));

app.get("/", getData);
app.get("/add", getAdd);
app.get("/edit/:id", getEdit);
app.get("/delete/:id", getDelete);

app.post("/add", postAdd);
app.post("/edit/:id", postEdit);

app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
