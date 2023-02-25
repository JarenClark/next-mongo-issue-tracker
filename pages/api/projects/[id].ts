import nc from 'next-connect'
import { getProject, updateProject, deleteProject } from '../../../controllers/projectControllers'
import dbConnect from '../../../config/dbConnect'

import onError from '../../../middleware/errors'

const handler = nc({onError});

dbConnect()

handler.get(getProject)
handler.put(updateProject)
handler.delete(deleteProject)


export default handler