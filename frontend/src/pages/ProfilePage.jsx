// src/pages/Profile.jsx
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import UserInfo from '../components/profile/UserInfo';
// import CollectionList from '../components/profile/CollectionList';

const user = {
  username: 'dariaprovotorova',
  email: 'daria@example.com',
};

// const collections = [
//   {
//     id: 1,
//     title: 'Tech News',
//     linkCount: 12,
//     isPublic: true,
//   },
//   {
//     id: 2,
//     title: 'Design Resources',
//     linkCount: 8,
//     isPublic: false,
//   },
//   {
//     id: 3,
//     title: 'React Tutorials',
//     linkCount: 5,
//     isPublic: true,
//   },
// ];

const ProfilePage = () => {
  const handleLogout = () => {
    // Placeholder logout logic
    console.log('Logged out');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* User Info Section */}
        <section className="mb-8">
          <UserInfo
            username={user.username}
            email={user.email}
            onLogout={handleLogout}
          />
        </section>

        {/* My Collections Section
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Collections</h2>
          <CollectionList collections={collections} />
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
