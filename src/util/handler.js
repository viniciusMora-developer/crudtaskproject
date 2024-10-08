const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../dados/tasks.json');

function readFile() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data); 
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        return [];
    }
}
function writeFile(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro ao escrever no arquivo:', error);
    }
}

module.exports = { readFile, writeFile };