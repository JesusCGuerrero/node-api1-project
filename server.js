const express = require("express");

const server = express();

server.use(express.json())

let users = [
    {id: 1, name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane"},
    {id: 2, name: "John Doe", bio: "Not Tarzan's Husband, another Jane"},
    {id: 3, name: "June Doe", bio: "Not Tarzan's Mom, another Jane"},
]

server.get("/", (req, res) => {
    res.json({api: "It's working"})
})

server.get("/api/users", (req, res) => {
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({errormessage: "Could not retrieve users"})
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    users.forEach((user) => {
        if (user.id == id) {
            res.status(200).json(user)
        } else if (user.id != id) {
            res.status(404).json({errormessage: "GET The user with the specified ID does not exist." })
        } else {
            res.status(500).json({errormessage: "GET The user information could not be retrieved."})
        }
    })
})

server.post("/api/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser)
    if (users.includes(newUser)) {
        res.status(200).json(newUser)
    } else {
        res.status(500).json({errormessage: "The user information could not be modified." })
    }
})

server.put('/api/users/:id', function (req, res) {
    const id = req.params.id

    users.forEach((user) => {
        if(user.id == id){
            user.name = req.body.name || user.name,
            user.bio = req.body.bio || user.bio,
            res.status(200).json(users)
        } else if (user.id != id) {
            res.status(404).json({errorMessage: "PUT User with the specified ID does not exist."})
        } else {
            res.status(500).json({errorMessage: "PUT User cannot not be removed"})
        }
    })

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    users.forEach((user) => {
        if (user.id == id) {
            users = users.filter(user => user.id != id)
            return res.status(200).json(users)
        } else if (user.id != id) {
            res.status(404).json({errormessage: "DEL The user with the specified ID does not exist." })
        } else {
            res.status(500).json({errormessage: "DEL The user could not be removed"})
        }
    })
})

server.listen(5000, () => {
    console.log("API is up")
})