import React from "react";
// import { withRouter } from "react-router-dom";

// Opt 1: Use Native JS  location.href = location.origin + "/cat"; //  this will reload

// Opt 2: Use `Link` comp from `react-router-dom`

// Opt 3: ReactRouter#history#push

export default function HomePage(props) {
  console.log("HomePage#props =----> ", props);
  return (
    <div>
      <h1>This is a Home page.</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(" clicked! =----> ", Date.now());

          props.history.push(`/cat/${Date.now()}`);

          // location.href = location.origin + "/cat";
        }}
      >
        Go To Category Page
      </button>
    </div>
  );
}

// export default withRouter(HomePage);
