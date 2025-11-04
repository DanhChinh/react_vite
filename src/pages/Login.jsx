import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setIsAuthenticated, setUserLogined }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://cyan.io.vn/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      console.log(data)
        if (setIsAuthenticated) setIsAuthenticated(true);        // cập nhật trạng thái login
        if(setUserLogined) setUserLogined(data.user.username);
        navigate("/");
    } else {
      alert("Sai thông tin đăng nhập");
    }
  } catch (err) {
    console.error(err);
    alert("Lỗi server");
  }
};


  return (
    <div className="vh-100 vw-100" style={{ backgroundColor: "#f0f2f5" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 ">
        <div className="card shadow-lg border-0" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            
            {/* Login Form */}
            <div className="col-12 col-md-6">
              <div className="card-body p-4 text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  alt="logo"
                  className="mb-3"
                  style={{ width: "150px" }}
                />
                <h4 className="mb-4">We are The Lotus Team</h4>

                <form onSubmit={handleLogin}>
                  <div className="mb-3 text-start">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Phone number or email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Log in
                  </button>
                  <div className="mb-3">
                    <a href="#!" className="text-decoration-none small">Forgot password?</a>
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-danger btn-sm">
                      Create new
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info / Banner */}
            <div className="col-12 col-md-6 d-none d-md-block" style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
              color: "white",
              padding: "2rem"
            }}>
              <h5 className="mb-3">We are more than just a company</h5>
              <p className="small">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    
  );
}
