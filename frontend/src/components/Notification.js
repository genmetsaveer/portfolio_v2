import React from 'react'

const Notification = ({ notificationClassName, errorMessage }) => {
    return errorMessage === "" ? null : <span className="notification"><i className={notificationClassName}></i>{errorMessage}</span>;
}

export default Notification
