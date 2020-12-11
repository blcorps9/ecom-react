import React from "react";

export default function Button({ onClick, label, classes }) {
  console.log(" Button =----> ");

  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
}

// export default const Button = React.memo(({ onClick, label, classes }) => {
//   return (
//     <button onClick={onClick} className={classes}>
//       {label}
//     </button>
//   );
// });
