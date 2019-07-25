// this class is creating a connection 
// this class is inisiate into home.js
class ChatEngine{
    //constructor  it will take  id of chat box  and second is email id of users
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:1200');
        // user email are available then it call to the connection handler 
        if(this.userEmail){

            this.connectionHandler();
        }
    }
    // connection handler it handle two and four connection handler  observer and suscriber means user
    // and observer means server
    connectionHandler(){
         let self=this;
        // first connection it take a connection
        // even that event is occure then i say connection establish
        this.socket.on('connect',function(){
            console.log('connection establish using socket');


           // i want to send the req to join room  which  user want to chat  data send 
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'
            });


            self.socket.on('user_joined',function(data){
                console.log('a user joined', data);
            })




        });
    }
}