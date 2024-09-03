const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ host: '192.168.0.118', port: 3000 }, () => {  // Substitua '127.0.0.1' pelo IP do servidor
  console.log('Conectado ao servidor de chat.');
  rl.prompt();

  rl.on('line', (input) => {
    client.write(input);
    rl.prompt();
  });
});

client.on('data', (data) => {
  console.log(`Mensagem do chat: ${data.toString().trim()}`);
});

client.on('end', () => {
  console.log('Desconectado do servidor.');
});

client.on('error', (err) => {
  console.error(`Erro no cliente: ${err.message}`);
  client.end();
});
