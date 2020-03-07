import React from 'react';
import Notification from "./Notification";

const ContactForm = ({ handleNameChange, newName, handleEmailChange, newEmail, handleMessageChange, newMessage, sendMessage, handleCheckbox, newCheckbox, errorMessage, notificationClassName }) => {
    return (
        <form className="contact-form">
            <div>
                <input onChange={handleNameChange} value={newName} placeholder="Your Name" id="input-name" type="text" required />
            </div>
            <div>
                <input onChange={handleEmailChange} value={newEmail} placeholder="Your E-mail" id="input-email" type="email" required />
            </div>
            <div>
                <textarea onChange={handleMessageChange} value={newMessage} placeholder="Message" id="input-message" type="textarea" cols="30" rows="5" required></textarea>
            </div>
            <div>
                <div>
                    <input onChange={handleCheckbox} type="checkbox" value="I'm not a robot!" className="check" />
                </div>
                <input onClick={sendMessage} type="button" value="Send!" id="form-button" /> <Notification notificationClassName={notificationClassName} errorMessage={errorMessage} />
            </div>
        </form>
    )
}

export default ContactForm
