import NextAuth from "next-auth/next";
// import { BuiltInProviders, AppProviders } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import dbConnect from '../../../config/dbConnect'
import User from "../../../models/user";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',

            async authorize(credentials) {

                dbConnect();

                const { email, password } = credentials;

                // Check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password');
                }

                // Find user in the database
                const user = await User.findOne({ email }).select('+password')

                if (!user) {
                    throw new Error('Invalid Email or Password')
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }

                return Promise.resolve(user)

            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            console.log('inside jwt')
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async (session, user) => {
            console.log('inside session')
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})


// session: {
//     strategy: "jwt"
// }
// import {getSession} from 'next-auth/react
