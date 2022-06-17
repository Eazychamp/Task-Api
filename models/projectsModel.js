const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name : String,
    projects : [
        {title : String,
        description : String,
        duration : Number}
    ]
})

const Projects = mongoose.model('Projects', projectSchema)

module.exports = Projects