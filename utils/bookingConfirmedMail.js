require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const bookingEmail = async(sendEmail,Date,Slot)=>{
    console.log(sendEmail,Payload,Name);
    var isEmail = false;
    sgMail.setApiKey("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");
    const msg = {
        to: sendEmail,
        from: "thiteshivaji07@gmail.com",
        subject: `Important: Your Appointment Confirmed for ${sendEmail}`,
        text: `Appointment Of Doctor Has been Book Successfull`,
        html: `<div style="text-align: center; margin: auto;">
        <img src="https://shubham-0178.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2023-06-13+at+19.55.20.jpeg"  alt="LOGO" style="height: 200px; width: 200px;">
        <h2>Your Appointment is Booked on ${Date} At ${Slot}.</h2>
    </div>`,
    };
    await sgMail.send(msg).then(() => {
            isEmail =  true;
        }).catch((err)=>{
            isEmail = false;
    }) 
    return isEmail
}

module.exports={bookingEmail}