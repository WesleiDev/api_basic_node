const http = require('http');
const express = require('express');
const status = require('http-status');
const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database'); 

const app = express();


app.use(express.json());

app.use('/api', spoilersRoute);

app.use((request, respose, next) =>{
    respose.status(status.NOT_FOUND).send("Página não encontrada")
})

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({error})
})

//o comando force faz o migration no banco de dados -- ele sempre faz o refresh no banco de dados
//{ force: true }
sequelize.sync().then(() => {
    const port = process.env.PORT || 3000
    
    app.set('port', port)
    
    const server = http.createServer(app)
 
    server.listen(port)
})

// server.listen(port, hostname, () => {
//     console.log(`Servidor em execução em http://${hostname}:${port}`)
// })