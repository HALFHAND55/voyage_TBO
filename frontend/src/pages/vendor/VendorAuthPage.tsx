import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

interface Props {
  initialMode?: "login" | "signup";
}

const VendorAuthPage: React.FC<Props> = ({ initialMode = "login" }) => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // We are disabling signup for now
  if (initialMode === "signup") {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Vendor Portal</h1>
        <h2>Signup Disabled</h2>
        <p>Vendor registration is currently managed internally.</p>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiRequest("/auth/vendor/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await refreshAuth();
      navigate("/vendor/overview");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Vendor Portal</h1>
      <h2>Vendor Login</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "300px",
          margin: "2rem auto",
        }}
      >
        <input
          type="email"
          placeholder="Vendor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default VendorAuthPage;