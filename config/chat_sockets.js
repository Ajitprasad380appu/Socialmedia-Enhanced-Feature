 // this class is receiving  a connection
module.exports.chatSockets=function(socketServer)
{
    let io=require('socket.io')(socketServer);
    // socketserver it pass it 
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.io);

    });
    // connection it's over


}