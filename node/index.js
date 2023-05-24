const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Kelton')`
connection.query(sql)
connection.end()


app.get('/', (req, res) => {

    const connection = mysql.createConnection(config)
    const selectQuery = `SELECT * FROM people`;
    let htmlReturn = '<h1>Header Text</h1>\n<ul>';

    connection.query(selectQuery, (error, results, fields) => {
        results.forEach(person => {
            htmlReturn += `<li>${person.name}\n</li>`;
        });
        htmlReturn += '</ul>'
        res.send(htmlReturn);
        connection.end();
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})