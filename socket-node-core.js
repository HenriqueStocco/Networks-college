const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
 // Obter o endereço IP do cliente
 const clientAddress = ${socket.remoteAddress}:${socket.remotePort};    
   // console.log(socket)
    clients.push(socket);
    console.log('Novo cliente conectado.');
    socket.on('data', (data) => {
        console.log(Mensagem recebida de ${clientAddress}:  ${data.toString().trim()});
        broadcast((data," ",clientAddress), socket);
    });
    socket.on('end', () => {
        clients.splice(clients.indexOf(socket), 1);
        console.log('Cliente desconectado.');
    });
    socket.on('error', (err) => {
        console.error(Erro no cliente: ${err.message});
    });
});
function broadcast(message, senderSocket) {
    clients.forEach((client) => {
        if (client !== senderSocket) {
            client.write(message);
        }
    });
}
server.listen(3000, () => {
    console.log('Servidor de chat rodando na porta 3000...');
});
