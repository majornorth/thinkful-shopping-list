var Item = require('../models/item');

exports.save = function(name, callback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, item);
    });
};

exports.list = function(callback) { // Why do I need to use a callback here?
    Item.find(function(err, items) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, items);
    });
};

exports.update = function(name, newName) {
    console.log("Line 24 services item", newName);
    Item.findOneAndUpdate({name: name}, {name: newName}, function() {
        // if (err || !item) {
        //     console.error("Could not update item", name);
        //     return;
        // }
        console.log("Updated item");
    });
};

exports.del = function(item) {
    console.log("Line 34 services item", item);
    // http://mongoosejs.com/docs/api.html#model_Model.remove
    Item.remove({name: item}, function() {
        // if (err) {
        //     console.log(err);
        //     // console.error("Could not delete item");
        //     return;
        // }
        console.log("Deleted item", item);
    });
};