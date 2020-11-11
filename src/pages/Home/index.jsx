import React from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

// Opt 1: Use Native JS  location.href = location.origin + "/cat"; //  this will reload

// Opt 2: Use `Link` comp from `react-router-dom`

// Opt 3: ReactRouter#history#push

import { inc, dec, asyncInc } from "./actions";

function HomePage(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="row text-center h1">{props.counter}</div>
        <div className="row">
          <div className="col-4 btn btn-primary" onClick={props.inc}>
            Inc
          </div>
          <div className="col-4 btn btn-primary" onClick={props.dec}>
            Dec
          </div>
          <div className="col-4 btn btn-primary" onClick={props.asyncInc}>
            asyncInc
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>This is a Home page.</h1>
  //     <button
  //       onClick={(e) => {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         console.log(" clicked! =----> ", Date.now());

  //         props.history.push(`/cat/${Date.now()}`);

  //         // location.href = location.origin + "/cat";
  //       }}
  //     >
  //       Go To Category Page
  //     </button>
  //   </div>
  // );
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

const mapDispatchToProps = { inc, dec, asyncInc };

// export default HomePage;
// export default withRouter(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
