const { readFile, writeFile } = require('../util/handler');

class TaskController {
    static listarTasks(req, res, next) {
        try {
            const tasks = readFile();
            res.status(200).json(tasks);
        } catch (erro) {
            console.log('Erro ao listar tasks:', erro);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static listarTaskPorId(req, res, next) {
        try {
            const { id } = req.params;
            const tasks = readFile();
            const task = tasks.find(a => a.id === id);

            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: 'ID da task não foi localizado' });
            }
        } catch (error) {
            next(error);
        }
    }

    static cadastrarTask(req, res, next) {
        try {
            const tasks = readFile();
            const novaTask = { id: (tasks.length + 1).toString(), ...req.body };

            tasks.push(novaTask);
            writeFile(tasks);

            res.status(201).json(novaTask);
        } catch (erro) {
            next(erro);
        }
    }

    static atualizarTask(req, res, next) {
        try {
            const { id } = req.params;
            let tasks = readFile();
            const taskIndex = tasks.findIndex(a => a.id === id);

            if (taskIndex !== -1) {
                const updatedTask = { id, ...req.body };
                tasks[taskIndex] = updatedTask;
                writeFile(tasks);
                res.status(200).json({ message: "Atualizado com sucesso", updatedTask });
            } else {
                res.status(404).json({ message: "ID não localizado" });
            }
        } catch (erro) {
            console.log("Erro ao atualizar", erro);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static excluirTask(req, res, next) {
        try {
            const { id } = req.params;
            let tasks = readFile();

            const taskExists = tasks.some(a => a.id === id);
            if (taskExists) {
                tasks = tasks.filter(a => a.id !== id);
                writeFile(tasks);
                res.status(200).json({ message: "Task removida com sucesso" });
            } else {
                res.status(404).json({ message: "ID não foi localizado" });
            }
        } catch (erro) {
            next(erro);
        }
    }
}

module.exports = TaskController;