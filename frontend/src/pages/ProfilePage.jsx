import React, { useEffect, useState } from 'react';
import UserInfo from '../components/profile/UserInfo';
import CollectionList from '../components/profile/CollectionList';

const user = {
  username: 'dariaprovotorova',
  email: 'daria@example.com',
};

const ProfilePage = () => {
  const [collections, setCollections] = useState([]);

  // Seed localStorage if empty
  useEffect(() => {
    const stored = localStorage.getItem('collections');
    if (!stored) {
      const defaultCollections = [
        {
          id: 1,
          title: 'Tech News',
          numberOfLinks: 12,
          isPublic: true,
          description: 'Latest in tech',
          coverImage: 'https://picsum.photos/seed/tech/400/200',
          url: '/collection/1',
        },
        {
          id: 2,
          title: 'Design Resources',
          numberOfLinks: 8,
          isPublic: false,
          description: 'Fonts, colors, UI kits, etc.',
          coverImage: 'https://picsum.photos/seed/design/400/200',
          url: '/collection/2',
        },
        {
          id: 3,
          title: 'React Tutorials',
          numberOfLinks: 5,
          isPublic: true,
          description: 'Learn React fast!',
          coverImage: 'https://picsum.photos/seed/react/400/200',
          url: '/collection/3',
        },
      ];
      localStorage.setItem('collections', JSON.stringify(defaultCollections));
    }
  }, []);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('collections');
    if (stored) {
      setCollections(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <UserInfo
            username={user.username}
            email={user.email}
            onLogout={handleLogout}
          />
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
