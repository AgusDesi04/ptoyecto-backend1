import mongoose from "mongoose"


export const connDB = async () => {
  try {

    await mongoose.connect(
     'mongodb+srv://agusdesi2004:db-agusdesi@cluster0.lsd1h.mongodb.net/base-backend1?retryWrites=true&w=majority&appName=Cluster0',
    )
    console.log('DB CONECTADA!!')
  } catch (error) {
    console.log(`error!! no se pudo conectar a la base de datos!! ${error}`)
  }
}
