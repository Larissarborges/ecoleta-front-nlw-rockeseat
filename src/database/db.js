// importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose() // retorna um obj. vai mostrar mensagens no terminal

// criar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // construtor ou classe. caminho que ele vai criar um arquivo com nome de database.db

module.exports = db
// utilizar o objeto de banco de dados para nossas operacoes
db.serialize(() => { // metodo que roda uma sequencia de codigo
//     // com comandos SQL eu vou: 
    
//     // 1 Criar uma tabela 
//     db.run(`
//             CREATE TABLE IF NOT EXISTS places ( 
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               image TEXT,
//               name TEXT,
//               address TEXT,
//               address2 TEXT,
//               state TEXT,
//               city TEXT,
//               items TEXT
//         );
//     `)
//     //places - nome da tabela . primary key - campo principal para identificar . autoincrement - qnd adicionar outra, o id aumenta. se deletar o numero 5, o proximo que for adicionado sera no numero 6

//     // 2 Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items 
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//       "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//       "Papersider",
//       "Guilherme Gemballa, Jardim America",
//       "Numero 260",
//       "Santa Catarina",
//       "Rio do Sul",
//       "Residuos Eletronicos, Lampadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this) // referenciando a resposta do run
//     }
    
//     db.run(query, values, afterInsertData)

//     // 3 Consultar os dados da tabela
     
//     // db.all(`SELECT * FROM places`, function(err, rows) { // selecionar todos os campos
//     //   if(err) {
//     //         return console.log(err)
//     //     }

//     //   console.log("Aqui estao seus registros:") 
//     //   console.log(rows) 
//     // })

    // 4 Deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
      if(err) {
            return console.log(err)
        }
      
      console.log("Registro deletado com sucesso")
    })

}) 

