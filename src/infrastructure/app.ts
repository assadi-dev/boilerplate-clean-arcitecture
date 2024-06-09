import express from "express"
import { serve, setup } from "swagger-ui-express"
import {RegisterRoutes} from "../../build/routes"
import SwaggerDocument from "../../build/swagger.json"
import config from "./api/app.config"
import { ZodError } from "zod"



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = config.port



app.use('/api-docs',serve,setup(SwaggerDocument))

RegisterRoutes(app)

app.use( async(
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<express.Response | void> => {

    
    if (err instanceof ZodError) { 
       console.warn(`Caught Validation Error for ${req.path}`);
      return res.status(400).json({
        message: "Validation Failed",
        details: JSON.parse(err?.message),
      }); 
    }
    else {
      console.log(err);
      
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  
 
});
  


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

server.on("error", () => {
    console.log("Error occurred while starting the server")
})