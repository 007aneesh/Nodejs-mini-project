// const yargs = require("yargs");
// const notes = require("./notes.js");

// yargs.command({
//   command: "add",
//   describe: "Adding a Note",
//   builder: {
//     title: {
//       describe: "Note Title",
//       demandOption: true,
//       type: "string",
//     },
//     body: {
//       describe: "Note Body",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler: function (argv) {
//     notes.addNote(argv.title, argv.body);
//   },
// });

// yargs.command({
//   command: "remove",
//   describe: "Removing a Note",
//   builder: {
//     title: {
//       describe: "Note Title",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler: function (argv) {
//     notes.removeNote(argv.title);
//   },
// });

// yargs.parse();
var fs = require("fs");

var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const args = process.argv.slice(2);

var notes = {};
fs.readFile("notes.json", "utf-8", function (err, data) {
  var notes = JSON.parse(data);
  var c = args[0];
  if (c === "add") {
    var l = notes.filter(function (v) {
      if (v.title === argv.title) {
        return true;
      }
      return false;
    }).length;
    if (l === 0) {
      notes.push({
        title: argv.title,
        body: argv.body,
      });
      fs.writeFile("notes.json", JSON.stringify(notes), function (err) {});
    } else {
      console.log("Warning: Already exists!");
    }
  } else if (c === "remove") {
    var l = notes.filter(function (v) {
      if (v.title === argv.title) {
        return true;
      }
      return false;
    }).length;
    if (l > 0) {
      fs.writeFile(
        "notes.json",
        JSON.stringify(
          notes.filter(function (v) {
            if (v.title === argv.title) {
              return false;
            }
            return true;
          })
        ),
        function () {}
      );
    } else {
      console.log("Warning: Don't exist!");
    }
  } else if (c === "list") {
    notes.forEach((e) => {
      console.log(e.title + "\n");
    });
  } else if (c === "read") {
    notes.forEach((e) => {
      if (e.title === argv.title) {
        console.log(e.body);
      }
    });
  }
});
