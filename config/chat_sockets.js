 // this class is receiving  a connection
module.exports.chatSockets=function(socketServer)
{
    let io = require('socket.io')(socketServer);
    // socketserver it pass it 
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);
        socket.on('disconnect',function(){
            console.log('socket disconnected !')
        });
        socket.on('join_room',function(data){
            console.log('joining request req',data);
            socket.join(data.chatroom);
            // if codeial is alredy exist then user will be connected 
            // incase does not exist then it create a chat room  and enter to the user or connect to the
            // the user 
            io.in(data.chatroom).emit('user_joined',data);
        })

    });
    // connection it's over


}