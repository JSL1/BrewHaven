import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(
                "https://brewhaven-backend-qf3e.onrender.com/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstname,
                        lastname,
                        email,
                        password
                    })
                }
            );

            const result = await response.json();

            if (result.success) {
                localStorage.setItem("token", result.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                navigate("/profile");
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.log(error);
            setMessage("Unable to create your account.");
        }
    };

    return (
        <div className="login-page">
            <h1>Create Account</h1>

            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="First name"
                    value={firstname}
                    onChange={(event) =>
                        setFirstname(event.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Last name"
                    value={lastname}
                    onChange={(event) =>
                        setLastname(event.target.value)
                    }
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    minLength="6"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(event) =>
                        setConfirmPassword(event.target.value)
                    }
                    minLength="6"
                    required
                />

                <button type="submit">
                    Create Account
                </button>
            </form>

            {message && <p>{message}</p>}

            <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;