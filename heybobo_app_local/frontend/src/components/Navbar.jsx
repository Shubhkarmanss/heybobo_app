import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../api";

export default function Navbar() {
  const nav = useNavigate();
  var name = localStorage.getItem("name");

  function logout() {
    setAuth(null); // remove token + header
    nav("/login");
    name=null;
  }

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">HeyBobo</Link>

      <div className="flex items-center space-x-4">
        {name ? (
          <>
            <span className="text-gray-600">Hello</span>
            <button onClick={logout} className="btn bg-red-200 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn bg-blue-200 px-3 py-1 rounded">Login</Link>
            <Link to="/signup" className="btn bg-green-200 px-3 py-1 rounded">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
