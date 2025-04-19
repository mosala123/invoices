import React from 'react'
import './Contact.css'

function Contact() {
  return (
      <div className="contact ">
            <div className="container">
            <div className="contact-form my-5 shadoww">
                <span className="heading">Contact Us</span>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text"/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"/>
                    <label htmlFor="text">Phone:</label>
                    <input type="text"/>
                    <label  htmlFor='message'>Message:</label>
                    <textarea id="message" name="message"></textarea>
                    <button  className="fs-5" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact
