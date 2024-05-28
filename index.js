const express = require("express")
const uuid = require("uuid")


const port = 3000
const app = express()
app.use(express.json())

const users = []

const myFirstMiddleware = (request, response, next) => {
    console.log("fui chamado")

    next()
}


app.use(myFirstMiddleware)

app.get('/users/', (request, response) => {
    return response.json(users)

})

app.post('/users/', (request, response) => {
    const { name, Age } = request.body

    const user = { id: uuid.v4(), name, Age }
    users.push(user)

    //const user = { id:uuid.v4(), name, age }

    return response.status(201).json(user)

})

app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { name, Age } = request.body

    const updaTedUser = { id, name, Age }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User Not Found" })
    }

    users[index] = updaTedUser



    return response.json(updaTedUser)

})









app.listen(3000, () => {
    console.log(' 🚀 Server starded on port 3000')
})
