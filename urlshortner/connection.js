const mongoose = require('mongoose');

async function connectToDB() {
   return mongoose.connect('mongodb://localhost:27017/urlshortner');
}

module.exports = {
    connectToDB
}