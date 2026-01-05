import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/app/routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
