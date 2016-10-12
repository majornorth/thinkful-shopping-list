require('./db/connect');
var mongoose = require('mongoose');

var Service = require('./services/item');

var main = function() {
    if (process.argv[2] == 'save') {
        Service.save(process.argv[3], function(err, item) {
            if (err) {
                throw err;
            }
        console.log(item);
        mongoose.disconnect();
        });
    }
    else if (process.argv[2] == 'list') {
        Service.list(function(err, items) {
            if (err) {
                mongoose.disconnect();
                throw err;
            }
        console.log(items);
        mongoose.disconnect();
        });
    }
    else if (process.argv[2] == 'del') {
        console.log("Line 24 cli", process.argv[3]);
        Service.del(process.argv[3]);
        mongoose.disconnect();
    }
    else if (process.argv[2] == 'update') {
        console.log("Line 24 cli", process.argv[3]);
        Service.update(process.argv[3], process.argv[4]);
        mongoose.disconnect();
    }
};

main();