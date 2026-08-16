import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");

  if (!token) {
    navigate('/login');
    return;
  }

    fetch('https://brewhaven-backend-qf3e.onrender.com/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setUser(result.user);
        } else {
          setMessage(result.message);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage('Unable to load profile.');
      });
  }, [navigate]);

  const startEditing = () => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setPassword("");
    setConfirmPassword("");
    setMessage("");
    setIsEditing(true);
};

  const cancelEditing = () => {
    setPassword("");
    setConfirmPassword("");
    setMessage("");
    setIsEditing(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
    }

    const token = localStorage.getItem("token");
    const updatedProfile = {
        firstname,
        lastname,
        email
    };

    if (password) {
      updatedProfile.password = password;
    }

    try {
      const response = await fetch(
          "https://brewhaven-backend-qf3e.onrender.com/auth/profile",
          {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(updatedProfile)
          }
      );

      const result = await response.json();

      if (result.success) {
          setUser(result.user);
          localStorage.setItem(
              "user",
              JSON.stringify(result.user)
          );
          setPassword("");
          setConfirmPassword("");
          setIsEditing(false);
          setMessage("Profile updated successfully.");
      } else {
          setMessage(result.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Unable to update profile.");
    }
    };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <p>{message || 'Loading profile...'}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="profile-page">
        <h1>Edit Profile</h1>

        <div className="profile-card">
          <form
            className="profile-form"
            onSubmit={handleUpdate}
        >
          <label htmlFor="profile-firstname">
            First Name
          </label>

          <input
            id="profile-firstname"
            type="text"
            value={firstname}
            onChange={(event) =>
                setFirstname(event.target.value)
            }
            required
          />

          <label htmlFor="profile-lastname">
            Last Name
          </label>

          <input
            id="profile-lastname"
            type="text"
            value={lastname}
            onChange={(event) =>
                setLastname(event.target.value)
            }
            required
          />

          <label htmlFor="profile-email">
            Email
          </label>

          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(event) =>
                setEmail(event.target.value)
            }
            required
          />

          <label htmlFor="profile-password">
            New Password
          </label>

          <input
            id="profile-password"
            type="password"
            value={password}
            onChange={(event) =>
                setPassword(event.target.value)
            }
            minLength="6"
            placeholder="Leave blank to keep current password"
          />

          <label htmlFor="profile-confirm-password">
              Confirm New Password
          </label>

          <input
            id="profile-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
                setConfirmPassword(event.target.value)
            }
            minLength="6"
            placeholder="Confirm new password"
          />

            <div className="profile-actions">
              <button type="submit">
                Save Changes
              </button>

              <button
                type="button"
                onClick={cancelEditing}
                >
                Cancel
              </button>
            </div>
          </form>

            {message && <p>{message}</p>}
        </div>
    </div>
  );
}

return (
  <div className="profile-page">
    <h1>My Profile</h1>

    <div className="profile-card">
      <h2>
        {user.firstname} {user.lastname}
      </h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <div className="profile-actions">
        <button
          type="button"
          onClick={startEditing}
        >
          Edit Profile
        </button>

        <button
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  </div>
);
}

export default Profile;