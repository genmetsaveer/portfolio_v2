import React, { useState } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import message from './services/message';

const App = () => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [checkbox, setCheckbox] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState("");

  const nameChange = event => setSenderName(event.target.value);
  const emailChange = event => setSenderEmail(event.target.value);
  const messageChange = event => setSenderMessage(event.target.value);
  const checkboxChange = event => setCheckbox(event.target.value);


  const sendMessage = event => {
    let noError = true;

    if (senderName.length < 1) {
      setNotificationClass("gg-smile-sad");
      setNotificationMessage("Name is too short!");
      noError = false;
    }
    if (!emailRegex.test(senderEmail)) {
      setNotificationClass("gg-smile-sad");
      setNotificationMessage("E-mail is in wrong format!");
      noError = false;
    }
    if (senderMessage.length < 1) {
      setNotificationClass("gg-smile-sad");
      setNotificationMessage("Message is too short!");
      noError = false;
    }
    if (noError) {
      const newMessage = {
        name: senderName,
        sender: senderEmail,
        content: senderMessage,
        check: checkbox
      }
      message
        .create(newMessage)
        .then(res => {
          setNotificationClass("gg-smile");
          setNotificationMessage("Message sent!");
          setSenderName("");
          setSenderEmail("")
          setSenderMessage("");
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationClass("");
          }, 5000);
        })
        .catch(err => {
          setNotificationClass("gg-smile-sad");
          const mess = err.response.data.error;
          setNotificationMessage(mess);
        });
    }

  }


  return (
    <React.Fragment>
      <div className="diagonal-box bg-three">
        <div className="content">
          <Header text="Let's get in touch!" />
          <ContactForm
            handleNameChange={nameChange}
            handleEmailChange={emailChange}
            handleMessageChange={messageChange}
            handleCheckbox={checkboxChange}
            newName={senderName}
            newEmail={senderEmail}
            newMessage={senderMessage}
            newCheckbox={checkbox}
            sendMessage={sendMessage}
            notificationClassName={notificationClass}
            errorMessage={notificationMessage}
          />

        </div>
      </div>
      <div className="social-links-container">
        <a className="social-link" href="https://github.com/genmetsaveer/">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>GitHub icon</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/gen-metsaveer/">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>LinkedIn icon</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </React.Fragment>
  );
}
export default App;
