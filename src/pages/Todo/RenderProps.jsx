import React, { Component } from "react";
import _debounce from "lodash/debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Follower1({ x, y, icon }) {
  return (
    <div
      className="mouse-follower 1"
      style={{ position: "absolute", top: y + 5, left: x + 5 }}
    >
      <FontAwesomeIcon icon={{ prefix: "fa", iconName: icon }} />
    </div>
  );
}

function Follower2({ x, y, icon }) {
  return (
    <div
      className="mouse-follower 2"
      style={{ position: "absolute", top: y + 5, left: x + 5 }}
    >
      <FontAwesomeIcon icon={{ prefix: "fa", iconName: icon }} />
    </div>
  );
}

class MouseTracker extends Component {
  state = { x: 0, y: 0 };

  onMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };

  render() {
    const { x, y } = this.state;

    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        onMouseMove={this.onMouseMove}
      >
        {/* {this.props.children(x, y)} */}
        {this.props.render(x, y)}
      </div>
    );
  }
}

function withMouseTracker(Comp) {
  return (props) => (
    <MouseTracker>{(x, y) => <Comp {...props} x={x} y={y} />}</MouseTracker>
  );
}

const Follower11 = withMouseTracker(Follower1);
const Follower21 = withMouseTracker(Follower2);

// export default function Todo() {
//   return (
//     <div>
//       <Follower21 icon="user-circle" />
//       <Follower11 icon="shopping-cart" />
//     </div>
//   );
// }

// export default function Todo() {
//   return (
//     <MouseTracker>
//       {(x, y) => (
//         <div>
//           <Follower1 x={x} y={y} />
//           <Follower2 x={y} y={x} />
//         </div>
//       )}
//     </MouseTracker>
//   );
// }

// render props
export default function Todo() {
  return (
    <MouseTracker
      render={(x, y) => (
        <div>
          <Follower1 x={x} y={y} icon="user-circle" />
          <Follower2 x={y} y={x} icon="shopping-cart" />
        </div>
      )}
    />
  );
}
