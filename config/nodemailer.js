const nodemailer=require("nodemailer");
const ejs=require('ejs');
const path=require('path');
let transpoter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'ajitprasad01011994@gmail.com',
        pass:'PAPPU#prasad@01'
    }
});

let renderTemlate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in the randring templete',err);return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}


module.exports={
    transpoter:transpoter,
    renderTemlate:renderTemlate
}