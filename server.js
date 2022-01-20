const express = require("express")
const port = process.env.PORT || 3000
const app = express()

const dbUsers = require("./db.json")

/*
Users
    localhost:3000/api/users/       --> get all users
    localhost:3000/api/users/:id     --> get one user
    localhost:3000/api/users/       --> post one user
    localhost:3000/api/users/:id     --> put / patch one user
    localhost:3000/api/users/:id     --> delete one user

    localhost:3000/api/users/option?name=loic   --> get one user by name
    localhost:3000/api/users/option?login=evengyl   --> get one user by login

    localhost:3000/api/users/name/:loic         --> get one user by name
    localhost:3000/api/users/login/:evengyl     --> get one user by login
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

app.get("/", (req, res) => {
    res.end("<h1>Accueil</h1>")
})


app.get("/api/users/", (req, res) => {

    //res.download("./db.json")
    //res.download("./db.json", "ListUser.json")

    //res.end()

    //res.json(dbUsers)

    //res.redirect("/")

    //res.render("<h1>rendu de template html</h1>") --> attention, il faut avoir configurer un moteur de rendu

    res.send("<h1>Accueil</h1>")

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