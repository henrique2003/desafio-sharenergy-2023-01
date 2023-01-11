import mongoose from 'mongoose'

async function connectDb(): Promise<void> {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL)

    console.log('MongoDb connect')
  } catch (error) {
    console.log('Error to connect with mongodb')
    process.exit(1)
  }
}

export default connectDb
