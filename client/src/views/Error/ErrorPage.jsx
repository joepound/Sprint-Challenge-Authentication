import React, { useState, useEffect } from "react";

function ErrorPage(props) {
  let [seconds, setSeconds] = useState(13);

  useEffect(() => {
    if (seconds <= 0) {
      props.history.push("/");
    } else {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);

  return (
    <main className="error">
      <div className="error__heading">
        Oops, this is not the page you are looking for....
      </div>
      <div className="error__redirect-msg">
        You will be redirected in 00:{`${seconds || 0}`.padStart(2, "0")}.
      </div>
    </main>
  );
}

export default ErrorPage;
