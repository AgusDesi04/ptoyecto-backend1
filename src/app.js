import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { connDB } from "./config/db.connections.js"
import { engine } from "express-handlebars"
// import { config as configWebSocket } from "./config/socket.config.js"
import viewsRouter from "./routes/views.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/views", viewsRouter)


const httpServer = app.listen(8080, () => console.log('server ok en el puerto 8080'))

// configWebSocket(httpServer)

connDB()