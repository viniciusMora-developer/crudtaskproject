const express = require('express');
const tasksRoutes = require ('./src/rotas/taskRoutes');

const app = express()
const PORT = 3000;

app.use(express.json());
app.use('/api' , tasksRoutes);

app.use((req, res ) => {
    res.status(404).json({ message: 'Rota não encontrada' });
})

app.listen(PORT, () => {
    console.log('Servidor rodando')
})