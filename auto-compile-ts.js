var child_process = require('child_process');
var watch = require("node-watch");
var fs = require("fs");
var path = require("path");
var clc = require('cli-color');

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.xterm(113);

var baseDirectory = __dirname;
if(process.argv.length > 2){
    baseDirectory = path.resolve(baseDirectory, process.argv[2]);
}
console.log(notice("Listening: " + baseDirectory));

var watcher = watch(baseDirectory, handleFileChanged);

function handleFileChanged(fileName){
    var filePath = fileName;
    console.log(notice("Changed file:" + filePath));
    if(fs.existsSync(filePath) && path.extname(filePath) == ".ts"){
        complileScriptFile(filePath);
    }
}


function complileScriptFile(filePath){
    console.log(warn("Compiling: " + filePath));
    child_process.exec('tsc ' + filePath,
                function(err, stdout, stderr) {
                    if(stdout != null){
                       console.log(notice(stdout));
                    }
                    if(stderr != null){
                       console.log(error(stderr));
                    }
                    if (err !== null) {
                      console.log(error('exec error: ' + err));
                    }
                });
}

