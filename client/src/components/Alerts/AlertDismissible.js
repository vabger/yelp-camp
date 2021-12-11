import { useState, useEffect } from "react";

import { BiError } from 'react-icons/bi'


import './AlertDismissible.css'

import '../../animations/slide.css'
import '../../animations/progress.css'

function AlertDismissible({ duration, variant, heading, message }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, duration * 1000)
  }, [duration])

  return (
    <div
      className={`alert alert-${variant} alert-dismissible ${show ? "animate-slideDown" : "animate-slideUp"}`}
      role="alert"
    >
      <h2><BiError />{heading}</h2>
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setShow(false)}
      ></button>
      <div className="progress">
        <div className={`progress-bar progress-bar-striped bg-${variant} animate-progressBar`} role="progressbar" style={{ animationDuration: `${duration}s` }}></div>
      </div>
    </div >
  );
}

export default AlertDismissible;
