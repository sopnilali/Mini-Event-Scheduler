import { Server } from "http"

let server: Server

import app from "./app"

const PORT = process.env.PORT || 5000

const main = () => {
    try {
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to connect to the server", error)
    }

}
main()