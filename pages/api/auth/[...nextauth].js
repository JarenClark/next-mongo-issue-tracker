import NextAuth from "next-auth/next";
// import { BuiltInProviders, AppProviders } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from '../../../config/dbConnect'
import User from "../../../models/user";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',

            async authorize(credentials, req) {

                dbConnect()

                const { email, password } = credentials

                // check if email/password exists
                if (!email || !password) {
                    throw new Error('Please enter email and password')
                }
                // find user in database
                const user = await User.findOne({ email }).select('*password')
                if (!user) {
                    throw new Error('Invalid Email')
                }
                // check if password is correct
                const isPasswordMatched = await user.comparePassword(password)
                if (!isPasswordMatched) {
                    throw new Error('Incorrect Password')
                }

                return Promise.resolve(user)

            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            
            user && (token.user = user)
            return Promise.resolve(token)

        },
        session: async (session, token) => {
            session.user = token.user
            return Promise.resolve(session)
        }
    }
})


// session: {
//     strategy: "jwt"
// }
// import {getSession} from 'next-auth/react
