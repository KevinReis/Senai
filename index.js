//se copiar o projeto, rodar:
// npm init
//npm install express --save
//npm install ejs --save
//npm install body-parser --save
//npm install sequilize mysql2
//npm install nodemon
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
//SET GLOBAL time_zone = '-03:00'; ajustar o relogio do mysql
//Nessa versão para tratamento de usuário, vamos adicionar o campo email nas pergunta e respostas para salvar o autor da pergunta e respostas, vamos adicionar também o arquivo database, module Usuario com atributos email e senha, criar novo arquivo de login e alterar as rotas. separando a tela de login quando for novo cadastro ou login


const express = require("express");  // carregar o express
const app = express();// criando o app com funções express
const bodyParser = require("body-parser"); // carregando o body-parser para tradução sequelize
const connection = require("./database/database"); // carregando a conexao com banco na pasta database
const Clientes = require("./database/Clientes");// carregando o módule Pergunta da pasta database



//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })



// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//rota index
app.get("/", (req, res) => { //quando o servidor for requisitado arquivo login é chamado

    res.render("cliente")
})



//rota para liberar a tela de cadastro
app.post("/atualizarcliente", async (req, res) => {
    let nome = req.body.name;
    let cpf = req.body.cpf;
    let endereco = req.body.endereco;
    if ((nome)&&(cpf)&&(endereco)) {

        const user = await Clientes.findOne ({
            where: {cpf:cpf}
        })

        if (user) {
           
            await Clientes.update ({
                nome: nome,
                endereco:endereco },
                {where:{cpf: cpf}}).then(() => {
                    res.render("cliente")
                }).catch(() => {
                    res.render("cliente")
            })
    
        } else {
            console.log('Estou aqui')
             Clientes.create({
                nome:nome,
                cpf:cpf,
                endereco:endereco
            }).then(() => {
                res.render("cliente")
            }).catch(() => {
                res.render("cliente")


            })
        
        
        }

    } else {

        res.render("cliente")
    }

});



//servidor
app.listen(8181, () => { console.log("App rodando!"); })