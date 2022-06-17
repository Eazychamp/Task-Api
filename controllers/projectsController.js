const Project = require('../models/projectsModel')

const createProjects = async (req, res) => {
    const {name, projects} = req.body

    let newRecord = new Project({name, projects}) 
    let project = await newRecord.save()

    res.status(200).json({
        project
    })
}

const getProjects = async (req, res) => {
    let projects = await Project.aggregate([
        {
            $project : {
                name : 1, projects : 1
            }
        }
    ])
    res.status(200).json({
        projects
    })
}

module.exports = {createProjects, getProjects}