import mongoose from 'mongoose'

async function connectDb(): Promise<void> {
  try {
    console.log('MongoDb connect')

    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb://127.0.0.1:27017/teste-sharenergy')
  } catch (error) {
    console.log('Error to connect with mongodb')
    process.exit(1)
  }
}

export default connectDb
