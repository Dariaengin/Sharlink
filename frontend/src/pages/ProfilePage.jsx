import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from '../components/profile/UserInfo';
import CollectionList from '../components/profile/CollectionList';

const ProfilePage = () => {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({ username: '', email: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/user', { withCredentials: true });
        setUser({
          username: res.data.user.nickname,
          email: res.data.user.email,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error('User fetch failed', err);
        setIsAuthenticated(false);
      }
    };

    const fetchCollections = async () => {
      try {
        const res = await axios.get('/api/my-collections', { withCredentials: true });
        if (Array.isArray(res.data)) {
          setCollections(res.data);
        } else {
          console.warn('Unexpected response format:', res.data);
          setCollections([]);
        }
      } catch (err) {
        console.error('Collections fetch failed', err);
        setCollections([]);
      }
    };

    // Call both inside useEffect
    fetchUserData();
    fetchCollections();
  }, []); // ← this was not closed

  const handleLogout = () => {
    axios.post('/api/users/logout', {}, { withCredentials: true }).then(() => {
      window.location.href = '/login';
    });
  };

  if (isAuthenticated === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center mt-10">Please log in to view your profile.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <UserInfo username={user.username} email={user.email} onLogout={handleLogout} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">My Collections</h2>
          <CollectionList collections={collections} />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
