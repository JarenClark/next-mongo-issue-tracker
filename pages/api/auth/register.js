import { registerUser } from "../../../controllers/authController";
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middleware/errors'
const handler = nc({onError});

dbConnect()

handler.post(registerUser)

export default handler