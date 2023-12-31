import Alert from 'react-bootstrap/Alert';
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const user = useSelector(state => state.user.account);

  if (user && !user.auth) {
    return (
      <Alert variant="danger mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You don't have permission to access this page! Please login ...
        </p>
      </Alert>
    )
  }

  return (
    <>
        {props.children}
    </>
  )
}

export default PrivateRoute;