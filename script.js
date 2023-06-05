// Função para ler os dados do arquivo JSON
async function readData() {
    try {
      const response = await fetch('/data');
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Exemplo: exibe os dados no console
      } else {
        console.error('Erro ao ler os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  }
  
  // Função para escrever dados no arquivo JSON
  async function writeData() {
    const newData = {
      name: 'John Doe',
      age: 30,
      city: 'Example City'
    };
  
    try {
      const response = await fetch('/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      if (response.ok) {
        const createdData = await response.json();
        console.log('Dados gravados:', createdData); // Exemplo: exibe os dados criados no console
      } else {
        console.error('Erro ao gravar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  }
  
  // Chamar a função para ler os dados
  readData();
  
  // Chamar a função para escrever os dados
  writeData();

  app.get('/cozinha.html', (req, res) => {
    res.send('Cozinha');
  });




  