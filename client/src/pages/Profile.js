import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

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

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <div className="profile-card">
        <h2>{user.firstname} {user.lastname}</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <button onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile;