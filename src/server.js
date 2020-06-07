const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta public (onde esta style + icones + JS)
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true }))

// utilizando template engine (deixa o html + dinamico)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, // liguei o nunjucks ao express
    noCache: true
})

// configurar caminhos da minha aplicacao
// pagina inicial

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"}) // res entende que vai ter que renderizar( vai ter que passar pelo motor do nunjucks) o index.html
})

server.get("/create-point", (req, res) => {

    // req.query: query strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res)  => {

    // req.body: O corpo do nosso formulario
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items 
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) // referenciando a resposta do run

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 }) // objeto com propriedade places

    }

    //pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { // selecionar todos os campos
            if(err) {
                return console.log(err)
            }

            // console.log(rows)

            const total = rows.length

        // mostrar a pagina do html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total }) // objeto com propriedade places    
        })

})

// ligar o servidor
server.listen(3000)