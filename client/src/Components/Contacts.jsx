import React, { Component } from "react";
import emailjs from "emailjs-com";
import Fade from "react-reveal/Fade";

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm("service_7cl731r", "template_ancv9n9", e.target,'user_e6RCmYTX7nJ9KccLNiTI9' )
      .then(
        (result) => {
          console.log(result.text);
          alert('Message has been succesfully sent') 
        },
        (error) => {
          console.log(error.text);
          alert(error.text)
        }
      );
  }

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form1">
          <form className="contact-form" onSubmit={sendEmail}>
            <input type="hidden" name="contact_number" />
            <label>
              <h2>Name</h2>
            </label>
            <input type="text" name="user_name" />
            <label>
              <h2>Email</h2>
            </label>
            <input type="email" name="user_email" />
            <label>
              <h2>Message</h2>
            </label>
            <textarea name="message" />
            <div>
              <input type="submit" value="Send" id='btn' />
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
