const nodeMailer=require('../config/nodemailer');
// this is a another way to exporting  method
exports.newComment=(comment)=>{
    console.log("==============")
    console.log('inside newComment mailer',comment);
    console.log("==============")

    // Le bhai wo bhi chal gya jis user ka bhi hoga ab uspe mail jaega
    nodeMailer.transpoter.sendMail({
        from:'ajitprasad01011994@gmail.com',
        to:comment.user.email,
        subject:"new comment  published ",
        html:'<h1> yup,your comment is now published </h1>'
    },(err,info)=>{
        if(err)
        {
            console.log('err in sending  mail',err);
            return ;
        }
        console.log('message is delever',info);
        return ;

    });
}