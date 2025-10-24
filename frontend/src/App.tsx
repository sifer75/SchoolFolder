import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout id="App__layout">
      <Outlet />
    </Layout>
  );
}

export default App;
