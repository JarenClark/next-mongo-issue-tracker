import nc from 'next-connect'
import { getAllProjects, createNewProject } from '../../../controllers/projectControllers'
import dbConnect from '../../../config/dbConnect'

import onError from '../../../middleware/errors'
const handler = nc({onError});

dbConnect()

handler.get(getAllProjects)
handler.post(createNewProject)

export default handler