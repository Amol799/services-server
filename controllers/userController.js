const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio');
const Razorpay = require('razorpay')

const client = twilio(accountSid, authToken);

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
        console.log('body: ' + req.body);
        console.log('username: ' + req.body.username);
        console.log('password:'+ req.body.password);
    
        const { username, password } = req.body;
        if (username === '7396609490' && password === '1234') {
            const token = generateToken(username);
            console.log('Tokeen token generated : ' + token);
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
module.exports = {
    sendMessage,
    login,
    createPayment
}