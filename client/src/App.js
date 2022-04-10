import React from "react";
import SideBar from "./routes/NavBar";
import {AuthContext} from "./contextAPI/Auth";
import { Alert } from "./components/Alert";


function App() {

  const {alert, setAlert}  = React.useContext(AuthContext)

  return (
    <>
      <SideBar />
      {
        alert.status == true && <Alert />
      }
    </>
  );
}

export default App;
