// Require the nedb module
var Datastore = require('nedb'),
    fs = require('fs');

// Initialize two bedb databases. 
var photos = new Datastore({ filename:__dirname + '/data/photos', autoload: true}),
    users = new Datastore({ filename:__dirname + '/data/users', autoload: true})

photos.ensureIndex({fieldName: 'name', unique: true});
users.ensureIndex({fieldName: 'ip', unique: true});
var photos_on_disk = fs.readdirSync(__dirname + '/public/photos');

photos_on_disk.forEach(function(photo){
    photos.insert({
        name: photo,
        bad: 0,
        good: 0,
        notSure: 0
    });
});

module.exports = {
    photos: photos,
    users: users
};
