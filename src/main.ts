import express from "express";
import { db, firestore } from "../banco_de_dados/firebase";

const app = express();

app.use(express.json())

app.get('/',(req, res) => {
    res.send ('Bem vindo a API')
})

app.post('/usuarios', async(req, res) =>{
    const nome = req.body.nome; 
    const email = req.body.email
    const telefone = req.body.telefone
    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuarios'),{
            nome: nome, 
            email: email,
            telefone: telefone 
        })

        res.send("Usuario adicionado com sucesso" + docRef.id)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
});

app.get('/listarUsuarios', async (req, res) =>{
    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

        const usuariosLista = usuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    
        res.send(usuariosLista)
    } catch (e) {
        console.log('Erro ao listar o usuario: ' + e)

        res.status(500).send("Erro ao listar usuario: " + e)
    }
})

app.listen(3000,function (){
    console.log('Serviço Rodando em http://localhost:3000/usuarios')
})
