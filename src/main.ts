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

app.put('/atualizarUsuarios/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db,'usuarios',id), {
            nome: nome,
        })
        res.send('Usuario Atualizado com Sucesso!')
    } catch (e) {
        console.log('Erro ao Atualizar Usuario' + e)

        res.status(500).send('Erro ao Atualuzar Usuario' + e)
    }
app.delete('/deletarUsuario/:id', async (req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db, 'usuarios', id))
        res.send('Usuário deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar usuario: ' + e)

        res.status(500).send('Erro ao deletar usuarios: ' + e)
    }
})
  
    
app.listen(3000,function (){
    console.log('Serviço Rodando em http://localhost:3000/usuarios')
})
