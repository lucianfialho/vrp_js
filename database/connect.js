const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/fivem',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});