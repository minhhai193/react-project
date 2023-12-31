import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { useSelector, useDispatch } from "react-redux";
import { handleReFresh } from './redux/actions/userActions';
import { useEffect } from "react";

function App() {
  const dataUserRedux = useSelector(state => state.user.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("email") && localStorage.getItem("token")) {
      dispatch(handleReFresh());
    }
  },[])

	return (
		<>
			<div className="app-container">
				<Header />
				<Container>
					<AppRoutes />
				</Container>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme="light"
			/>
		</>
	);
}

export default App;
