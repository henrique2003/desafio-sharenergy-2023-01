import mongoose from 'mongoose'

async function connectDb(): Promise<void> {
  try {
    console.log('MongoDb connect')

    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL)
  } catch (error) {
    console.log('Error to connect with mongodb')
    process.exit(1)
  }
}

export default connectDb
