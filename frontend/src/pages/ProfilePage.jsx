// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from '../components/profile/UserInfo';
import CollectionList from '../components/profile/CollectionList';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);

  // Fetch user info from backend (requires authToken cookie)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/profile', {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    const stored = localStorage.getItem('collections');
    if (stored) {
      setCollections(JSON.parse(stored));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:2100/api/logout', {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container py-4 flex-grow-1">
        {/* User Info Section */}
        <section className="mb-5">
          <UserInfo
            username={user.nickname}
            email={user.email}
            onLogout={handleLogout}
          />
        </section>

        {/* Collections Section (localStorage based for now) */}
        <section>
          <h2 className="h4 mb-3">My Collections</h2>
          <CollectionList collections={collections} />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
