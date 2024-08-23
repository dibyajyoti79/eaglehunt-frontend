import { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen p-2">
      <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mb-4 text-white">Admin Login</h2>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Admin Email"
          className="w-full p-2 mb-4 border rounded"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Admin Password"
          className="w-full p-2 mb-4 border rounded"
        />
        
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
