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


var storage = new Storage();

exports.storage = storage;