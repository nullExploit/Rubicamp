const { writeFileSync, readFileSync, existsSync } = require("fs"),
  file = "todo.json";
existsSync(`./${file}`) ? toDo() : writeFileSync(file, "[]");
function toDo() {
  const argv = process.argv,
    raw = readFileSync(`./${file}`),
    datas = JSON.parse(raw),
    ind = datas.length,
    infoApp = () => {
      const info = `
>>> JS TODO <<<
$ node todo.js <command>
$ node todo.js list
$ node todo.js task <task_id>
$ node todo.js add <task_content>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id>
$ node todo.js list:outstanding asc|desc
$ node todo.js list:completed asc|desc
$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todo.js filter:<tag_name>
    `;
      console.log(info);
    },
    add = () => {
      if (argv[3]) {
        const arg = [...argv],
          input = arg.slice(3).join(" ");
        console.log(`"${input}" telah ditambahkan.`);
        datas[ind] = { task: input, isComplete: false, tags: [] };
        writeFileSync(file, JSON.stringify(datas));
      }
    },
    list = () => {
      if (datas.length) {
        console.log("Daftar Pekerjaan");
        for (let i = 0; i < ind; i++) {
          if (datas[i].isComplete) {
            console.log(`${i + 1}. [x] ${datas[i].task}.`);
          } else {
            console.log(`${i + 1}. [ ] ${datas[i].task}.`);
          }
        }
      }
    },
    listout = () => {
      if (argv[3] && argv[3] == "asc" && datas.length) {
        console.log("Daftar Pekerjaan");
        for (let i = 0; i < ind; i++)
          if (!datas[i].isComplete)
            console.log(`${i + 1}. [ ] ${datas[i].task}.`);
      } else if (argv[3] && argv[3] == "desc" && datas.length) {
        console.log("Daftar Pekerjaan");
        for (let i = ind - 1; i >= 0; i--)
          if (!datas[i].isComplete)
            console.log(`${i + 1}. [ ] ${datas[i].task}.`);
      }
    },
    listcomp = () => {
      if (argv[3] && argv[3] == "asc" && datas.length) {
        console.log("Daftar Pekerjaan");
        for (let i = 0; i < ind; i++)
          if (datas[i].isComplete)
            console.log(`${i + 1}. [x] ${datas[i].task}.`);
      } else if (argv[3] && argv[3] == "desc" && datas.length) {
        console.log("Daftar Pekerjaan");
        for (let i = ind - 1; i >= 0; i--)
          if (datas[i].isComplete)
            console.log(`${i + 1}. [x] ${datas[i].task}.`);
      }
    },
    tag = () => {
      if (argv[3]) {
        const arg = [...argv],
          input = arg.slice(4);
        datas[Number(argv[3]) - 1].tags = input;
        writeFileSync(file, JSON.stringify(datas));
      }
    },
    filter = () => {
      const filtered = argv[2].split(":");
      if (filtered[1]) {
        console.log("Daftar Pekerjaan");
        for (let i = 0; i < ind; i++)
          if (datas[i].tags.includes(filtered[1])) {
            if (datas[i].isComplete) {
              console.log(`${i + 1}. [x] ${datas[i].task}.`);
            } else {
              console.log(`${i + 1}. [ ] ${datas[i].task}.`);
            }
          }
      }
    },
    del = () => {
      if (argv[3]) {
        let log = `'${
          datas[Number(argv[3]) - 1].task
        }' telah dihapus dari daftar`;
        if (argv[3] == 1) {
          console.log(log);
          datas.shift();
        } else if (argv[3] == ind) {
          console.log(log);
          datas.pop();
        } else {
          console.log(log);
          datas.splice(Number(argv[3]) - 1, 1);
        }
        writeFileSync(file, JSON.stringify(datas));
      }
    },
    complete = () => {
      if (argv[3] && !datas[Number(argv[3] - 1)].isComplete) {
        console.log(`"${datas[Number(argv[3]) - 1].task}" telah selesai.`);
        datas[Number(argv[3]) - 1].isComplete = true;
        writeFileSync(file, JSON.stringify(datas));
      }
    },
    uncomplete = () => {
      if (argv[3] && datas[Number(argv[3] - 1)].isComplete) {
        console.log(
          `"${datas[Number(argv[3]) - 1].task}" status selesai dibatalkan.`
        );
        datas[Number(argv[3]) - 1].isComplete = false;
        writeFileSync(file, JSON.stringify(datas));
      }
    },
    menu = () => {
      if (argv[2]) {
        switch (argv[2]) {
          case "add":
            add();
            break;
          case "list":
            list();
            break;
          case "list:outstanding":
            listout();
            break;
          case "list:completed":
            listcomp();
            break;
          case "delete":
            del();
            break;
          case "complete":
            complete();
            break;
          case "uncomplete":
            uncomplete();
            break;
          case "tag":
            tag();
            break;
          case "help":
            infoApp();
            break;
        }
        if (argv[2].startsWith("filter")) filter();
      }
    };

  menu();
  if (!argv[2]) infoApp();
}