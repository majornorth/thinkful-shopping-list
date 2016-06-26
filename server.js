var express = require('express');
// var storage = require('./storage.js');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id) {
    var items = this.items;
    
    function findItem(item) {
        if(item.id == id) {
            var index = items.indexOf(item);
            items.splice(index, 1);
            return this;
        };
    }
    
    var item = items.find(findItem);
    return item;
};

Storage.prototype.edit = function(editedItem) { 
    // console.log(editedItem);
    
    var items = this.items;
    
    function findItem(item) {
        if(item.id == editedItem.id) {
            var index = items.indexOf(item);
            items[index].name = editedItem.name;
            items[index].id = editedItem.id;
            return this;
        };
    }
    
    var item = items.find(findItem);
    return item;
};

// Consider making this a module
var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
    
    var id = req.params.id;
    if (!id) { // could also use typeof to verify id === number
        return res.sendStatus(400);
    }

    var item = storage.delete(id);

    // console.log(res.json(item));
    // debugger;
    
    res.status(200).json(item);

});

app.put('/items/:id', jsonParser, function(req, res) {
    var editedItem = req.body;
    
    if (!req.body.name) {
        return res.sendStatus('Cannot submit an empty name', 400);
    }

    var updatedItem = storage.edit(editedItem);

    res.status(200).json(updatedItem);

});

app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;