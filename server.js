const express = require("express")
const { nextTick } = require("process")
const port = process.env.PORT || 3000
const app = express()

let dbUsers = require("./db.json")


app.use(express.json())
app.use(express.urlencoded({ extended : true}))

/*
Users
    localhost:3000/api/users/       --> get all users
    localhost:3000/api/users/:id     --> get one user
    localhost:3000/api/users/       --> post one user
    localhost:3000/api/users/:id     --> put / patch one user
    localhost:3000/api/users/:id     --> delete one user

    localhost:3000/api/users/option?name=loic   --> get one user by name
    localhost:3000/api/users/option?login=evengyl   --> get one user by login

    localhost:3000/api/users/name/:name         --> get one user by name
    localhost:3000/api/users/login/:login     --> get one user by login
*/

/*
Liste des statuts http important

    200 : succès de la requête ;
    301 et 302 : redirection, respectivement permanente et temporaire ;
    401 : utilisateur non authentifié ;
    403 : accès refusé ;
    404 : page non trouvée ;
    500 et 503 : erreur serveur ;
    504 : le serveur n'a pas répondu.
*/


//localhost:3000/                  --> page d'accueil
app.get("/", (req, res) => {
    res.send(`
        <a href="/api/users">Get all de tous les users : localhost:3000/api/users</a>
        <a href="/api/users/1">Get one user by id (1) : localhost:3000/api/users/1</a>
    `)
})


//localhost:3000/api/users/       --> get all users
app.get("/api/users/", (req, res) => {

    //res.download("./db.json")
    //res.download("./db.json", "ListUser.json")

    //res.end()

    res.json(dbUsers)

    //res.redirect("/")

    //res.render("<h1>rendu de template html</h1>") --> attention, il faut avoir configurer un moteur de rendu

    //res.send("<h1>Accueil</h1>")

})



//localhost:3000/api/users/:id     --> get one user
app.get("/api/users/:id", (req, res, next) => {

    
    if(parseInt(req.params.id, 10))
    {
        let id = parseInt(req.params.id, 10)

        let user = dbUsers.filter(user => user.id == id)

        console.log(user)
        if(user.length == 0)
            next()
        else
            res.json(user[0])
    }
    else{
        next()
    }
})



//localhost:3000/api/users/option?name=loic   --> get one user by name
//localhost:3000/api/users/option?login=evengyl   --> get one user by login
app.get("/api/users/option", (req, res, next) => {

    console.log(req.query)
    if(req.query.name && !req.query.login)
    {
        let user = dbUsers.filter(user => user.name == req.query.name)

        if(user.length == 0)
            next()
        else
            res.json(user[0])
    }
    else if(req.query.login && !req.query.name)
    {
        let user = dbUsers.filter(user => user.login == req.query.login)

        if(user.length == 0)
            next()
        else
            res.json(user[0])
    }
    else
    {
        next()
    }
    res.end()
   
})


//localhost:3000/api/users/name/:name         --> get one user by name
//localhost:3000/api/users/login/:login     --> get one user by login
app.get(["/api/users/name/:name", "/api/users/login/:login"], (req, res, next) => {
    console.log(req.params)

    if(req.params.name != undefined)
    {
        let user = dbUsers.filter(user => user.name == req.params.name)

        if(user.length == 0)
            next()
        else
            res.json(user[0])
    }
    else if(req.params.login != undefined)
    {
        let user = dbUsers.filter(user => user.login == req.params.login)

        if(user.length == 0)
            next()
        else
            res.json(user[0])
    }
    else {
        next()
    }

})


//localhost:3000/api/users/       --> post one user
app.post("/api/users", (req, res, next) => {
   
    if(req.body.name && req.body.lastName && req.body.age && req.body.techFav)
    {
        console.log("mon objet est ok")
        let newId = dbUsers.length + 1
        let newUser = req.body
        newUser.id = newId

        dbUsers.push(newUser)
        res.end()
    }
    else{
        res.status("500").send("Objet User non conforme")
    }
})



//localhost:3000/api/users/:id     --> put / patch one user
app.put("/api/users/:id", (req, res, next) => {
    


    if(parseInt(req.params.id), 10)
    {
        let id = parseInt(req.params.id, 10)

        if(req.body.name && req.body.lastName && req.body.age && req.body.techFav)
        {
            dbUsers = dbUsers.map((item) => {

                if(item.id == id)
                {
                    item.name = req.body.name
                    item.lastName = req.body.lastName
                    item.age = req.body.age
                    item.techFav = req.body.techFav
                }
                
                return item
            })

            res.end()

        }
        else{
            res.status("500").send("Objet User non conforme")
        }
    }
    else{
        res.status("500").send("ID User non conforme")
    }
})



//localhost:3000/api/users/:id     --> delete one user
app.delete("/api/users/:id", (req, res, next) => {
    if(parseInt(req.params.id), 10)
    {
        let id = parseInt(req.params.id, 10)
        dbUsers = dbUsers.filter((user) => {
            if(user.id != id)
                return user
        })

        res.end()
    }
    else{
        res.status("500").send("ID User non conforme")
    }
})




app.all("*", (req, res) => {
    res.status("404").send("<h1>Erreur 404 : Page non trouvée</h1>")
})


/*
Products
    localhost:3000/api/products/        --> get all
    localhost:3000/api/products/:id     --> get one by id
    localhost:3000/api/products/        --> post product
    localhost:3000/api/products/:id     --> put / patch product
    localhost:3000/api/products/:id     --> delete one product

    localhost:3000/api/prices/              --> get all
    localhost:3000/api/prices/:idProd       --> get one by id
    localhost:3000/api/prices/              --> post price
    localhost:3000/api/prices/:idProd       --> put / patch price on product
    localhost:3000/api/prices/:idProd       --> delete one price on product

    localhost:3000/api/categories/          --> get all
    localhost:3000/api/categories/:idProd   --> get one by id
    localhost:3000/api/categories/          --> post categories
    localhost:3000/api/categories/:idProd   --> put / patch categories on product
    localhost:3000/api/categories/:idProd   --> delete one categories on product


*/



app.listen(port, console.log(`Le serveur express écoute sur le port ${port}`))