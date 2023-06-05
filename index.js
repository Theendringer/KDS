const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Função para ler o arquivo JSON
function readData() {
  const data = fs.readFileSync('database.json');
  return JSON.parse(data);
}

// Função para escrever no arquivo JSON
function writeData(data) {
  fs.writeFileSync('database.json', JSON.stringify(data));
}

// Rota para criar um novo objeto
app.post('/data', (req, res) => {
  const newData = req.body;

  const database = readData();
  database.push(newData);
  writeData(database);

  res.json(newData);
});

// Rota para ler todos os objetos
app.get('/data', (req, res) => {
  const database = readData();
  res.json(database);
});

// Rota para atualizar um objeto
app.put('/data/:id', (req, res) => {
  const objectId = req.params.id;
  const updatedData = req.body;

  const database = readData();
  const objectIndex = database.findIndex(obj => obj.id === objectId);

  if (objectIndex !== -1) {
    database[objectIndex] = updatedData;
    writeData(database);
    res.json(updatedData);
  } else {
    res.status(404).json({ error: 'Object not found' });
  }
});

// Rota para excluir um objeto
app.delete('/data/:id', (req, res) => {
  const objectId = req.params.id;

  const database = readData();
  const objectIndex = database.findIndex(obj => obj.id === objectId);

  if (objectIndex !== -1) {
    const deletedObject = database.splice(objectIndex, 1);
    writeData(database);
    res.json(deletedObject[0]);
  } else {
    res.status(404).json({ error: 'Object not found' });
  }
});


// Inicie o servidor
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
