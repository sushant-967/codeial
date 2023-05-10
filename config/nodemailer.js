const nodemailer=require("nodemailer");
const path=require('path');



let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'sushantagrawal967@gmail.com',
        pass: 'kdjsmytigddqhyet'
        
    }

});

let renderTemplate = (data,relativePath)=> {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template');return;}

            mainHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transporter: transporter,
    renderTemplate:renderTemplate
}
