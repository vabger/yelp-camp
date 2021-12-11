import { useState, useEffect, Fragment, useRef } from "react";

import { BiError } from 'react-icons/bi'


import './AlertDismissible.css'

import '../../animations/slide.css'
import '../../animations/progress.css'

function AlertDismissible({ duration, variant, heading, message }) {

  const [show, setShow] = useState(true);

  const [unMount, setUnMount] = useState(false);

  const alertBox = useRef(null);

  useEffect(() => {
    setUnMount(false)
    setShow(true)
  }, [message])

  const handleAlertBoxAnimation = (e) => {
    if (alertBox.current === e.target && !show) {
      setUnMount(true);
    }
  }

  const handleProgressAnimation = function (e) {
    if (show)
      setShow(false)
  }
  if (unMount) {
    return <Fragment />
  }
  else {
    return (

      <Fragment>
        <div
          ref={alertBox}
          className={`alert alert-${variant} alert-dismissible ${show ? "animate-slideDown" : "animate-slideUp"}`}
          role="alert"
          onAnimationEnd={handleAlertBoxAnimation}
        >
          <h2><BiError />{heading}</h2>
          {message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
          <div className="progress" onAnimationEnd={handleProgressAnimation}>
            <div className={`progress-bar progress-bar-striped bg-${variant} animate-progressBar`} role="progressbar" style={{ animationDuration: `${duration}s` }}></div>
          </div>
        </div >
      </Fragment >

    )
  }

}


export default AlertDismissible;
