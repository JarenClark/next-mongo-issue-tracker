import mongoose from "mongoose";

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