import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CampusEats Dashboard</h1>
        <nav>
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/order">Place Order</NavLink>
        </nav>
      </header>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
