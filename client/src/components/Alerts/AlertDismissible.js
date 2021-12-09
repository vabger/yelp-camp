import { useState, useEffect } from "react";

function AlertDismissible({ duration, variant, heading, message }) {
  const [show, setShow] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cb = () => {
      setProgress((progress) => progress + 1);
    };
    const progressInterval = setInterval(cb, duration / 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [duration]);

  if (show) {
    return (
      <div
        class={`alert alert-${variant} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{heading}</strong>
        {message}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={`${progress}`}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  }
}

export default AlertDismissible;
