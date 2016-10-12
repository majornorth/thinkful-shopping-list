var fs = require("fs");
var fsPromise = require("fs-promise");

// try {
//   var content = fs.readFileSync("./foo.js");
// } catch(err){
//     console.log("Not found");
// }

// fs.readFile("./foo.js", {encoding: "utf8"}, function(err, contents){
//     if(err){
//         return console.log("Not found");
//     } 
//     console.log("Found");
// });

fsPromise.readFile("./cli.js", "utf8")
.then(function(contents){
  console.log("Found", contents);
})
.catch(function(){
  console.log("not found");
});