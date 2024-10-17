const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

//const twilio //= require('twilio');
const Razorpay = require('razorpay')

const nodemailer = require("nodemailer")

const sqlite3 = require('sqlite3').verbose();
//const client = twilio(accountSid, authToken);

const sendMessage = async(req,res)=>{
    

    try {

       console.log( req.body.message);
       console.log( req.body.to);
        client.messages.create({            
            from: 'whatsapp:+14155238886',
            contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
            contentVariables:JSON.stringify({
                1: req.body.message
              }),
            to: 'whatsapp:'+req.body.to       
        })
        .then(message => console.log("Message sent successfully"));

        return res.status(200).json({ success: true,msg:'Message sent successfully' });
    } catch (error) {
        return res.status(400).json({ success: false,msg:error.message });
    }

}

const login = (req, res) => {
    try{
        // console.log('body: ' + req.body);
        // console.log('username: ' + req.body.username);
        // console.log('password:'+ req.body.password);
    
        const { username, password } = req.body;
        if (username === '7396609490' && password === '1234') {
            const token = generateToken(username);
           // console.log('Tokeen token generated : ' + token);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch(error){
        return res.status(400).json({ success: false, msg: error.message });
    }
}

const createPayment = async(req,res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: 'INR',
            receipt: 'order_rcptid_11',
            payment_capture: 1, // Auto capture payment
        };

        const response = await instance.orders.create(options);
        console.log('Payment order created successfully', response);

        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error('Error in payment processing', error);
        return res.status(400).json({ success: false, msg: error.message });
    }
}
function generateToken(username) {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
    return token;
}

const snedEmail = async(req, res, next) => {

    try{
        console.log(`The mail send function`);
         console.log("email id is " + req.body.email);
         console.log("subject is " + req.body.subject)
         console.log("body is " + req.body.body);
         console.log("name is " + req.body.name);

            let transporter = nodemailer.createTransport({   
            service:"gmail", 
            port: 465,
            secure: true, // true for 465, false for other ports
            logger:true,
            debug:true,
            secureConnection: false,
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.TEXT
            },
            tls:{
              rejectUnauthorized :true
            }
          });
        
          let mailOptions = {
            from: 'This is from Akshaj Cold Press Oil', // sender address
            to: req.body.email, // list of receivers
            subject: "subject : " + req.body.subject,// Subject line
            html: `<h4>Hi ${req.body.name}</h4><br>
            <h4>Email :  ${req.body.email}</h4><br>
        
            <h4>${req.body.body}</h4>
            <h4>Thanks for joining us</h4>`
          };
        
          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions);
          console.log('Email sent: %s', info.messageId);
          console.log('Email status sent: %s', info.status);
          return res.status(200).json({ success: true,msg:'Email  sent successfully' });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ success: false, msg: 'Error sending email' });
    }
}

module.exports = {
    sendMessage,
    login,
    createPayment,
    snedEmail
}

