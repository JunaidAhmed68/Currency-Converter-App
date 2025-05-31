import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2025 MyCurrencyApp</p>
      <div className="mt-2 space-x-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "underline text-blue-300" : "text-blue-300 hover:underline"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            isActive ? "underline text-blue-300" : "text-blue-300 hover:underline"
          }
        >
          Feedback
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "underline text-blue-300" : "text-blue-300 hover:underline"
          }
        >
          About Us
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;