import { Navigate } from 'react-router-dom';

function Guard(props) {
  let token = localStorage.getItem('token');
  if (token) {
    return props.children;
  } else {
    return <Navigate to='/home' replace={true} />;
  }
}

export default Guard;
