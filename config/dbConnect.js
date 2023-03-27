import mongoose from "mongoose";
import { MongoClient } from 'mongodb'



const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => console.log(`Database Connected`))
}

export default dbConnect


// const uri = process.env.DB_URL
// const options = {}
// let client
// let clientPromise

// if (process.env.NODE_ENV === "development") {
//     // In development mode, use a global variable so that the value
//     // is preserved across module reloads caused by HMR (Hot Module Replacement).
//     if (!global._mongoClientPromise) {
//       client = new MongoClient(uri, options)
//       global._mongoClientPromise = client.connect()
//     }
//     clientPromise = global._mongoClientPromise
//   } else {
//     // In production mode, it's best to not use a global variable.
//     client = new MongoClient(uri, options)
//     clientPromise = client.connect()
//   }

//   export { clientPromise}