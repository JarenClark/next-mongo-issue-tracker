const getAllTasks = (req,res) => {
    res.status(200).json({
        success: true,
        error: false, 
        message: 'All Tasks Fetched'
    })
}


export {
    getAllTasks
}