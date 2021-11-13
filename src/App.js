import "./App.css";
import AppRouter from "./routers/AppRouters";
import { Provider as AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
