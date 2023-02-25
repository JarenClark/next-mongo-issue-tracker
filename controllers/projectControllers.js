import Project from '../models/project'
import ErrorHandler from '../utils/errorHandler'
import APIfeatures from '../utils/apiFeatures'
import catchAsyncErrors from '../middleware/catchAsyncErrors'


// get all projects

const getAllProjects = catchAsyncErrors(async (req, res) => {

    const apiFeatures = new APIfeatures(Project.find(), req.query)
        .search()

    const projects = await apiFeatures.query
    return res.status(200).json({
        success: true,
        projects
    })
})

// create project
const createNewProject = async (req, res) => {

    try {
        const project = await Project.create(req.body)
        res.status(200).json({
            data: project
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

// get singleProject
const getProject = catchAsyncErrors(async (req, res, next) => {

    const project = await Project.findById(req.query.id)

    if (!project) {
        return next(new ErrorHandler('Project not found with this ID', 404))
    } else {
        res.status(200).json({
            success: true,
            project
        })
    }
})


// update projects
const updateProject = catchAsyncErrors(async (req, res) => {

    let project = await Project.findById(req.query.id)

    if (!project) {
        return res.status(404).json({
            success: false,
            error: `Project not found with this ID`
        })
    }

    project = await Project.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    res.status(200).json({
        success: true,
        project
    })

})

const deleteProject = catchAsyncErrors(async (req, res) => {


    let project = await Project.findById(req.query.id)

    if (!project) {
        return res.status(404).json({
            success: false,
            error: `Project not found with this ID`
        })
    }

    await project.remove()

    res.status(200).json({
        success: true,
        message: 'Project Deleted'
    })

})

export {
    getAllProjects,
    getProject,
    createNewProject,
    updateProject,
    deleteProject
}



// const getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find()
//         res.status(200).json({
//             success: true,
//             projects
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }

// }