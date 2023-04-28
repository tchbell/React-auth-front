import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function isAuthenticated() {
  const token = cookies.get('TOKEN');
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function ProtectedRoutes({ path, children }) {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

// receives component and any other props represented by ...rest
// export default function ProtectedRoutes({ component: Component, ...rest }) {
//   return (
//     // this route takes other routes assigned to it from the App.js and return the same route if condition is met
//     <Routes>
//       <Route
//         {...rest}
//         render={(props) => {
//           console.log(props);
//           // get cookie from browser if logged in
//           const token = cookies.get('TOKEN');

//           // returns route if there is a valid token set in the cookie
//           if (token) {
//             console.log('is token');
//             return <Component {...props} />;
//           } else {
//             console.log('no token');
//             // returns the user to the landing page if there is no valid token set
//             return <Navigate to="/" state={{ from: props.location }} />;
//           }
//         }}
//       />
//     </Routes>
//   );
// }
