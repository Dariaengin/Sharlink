import React, { useEffect, useState } from 'react';
import CollectionList from '../components/profile/CollectionList';

const CollectionsListPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('collections');
    if (stored) {
      setCollections(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6">My Collections</h2>
        <CollectionList collections={collections} />
      </main>
    </div>
  );
};

export default CollectionsListPage;

// const CollectionsListPage = () => {
//   const [collections, setCollections] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Example check: assuming user info or token is in localStorage
//     const user = localStorage.getItem('user'); // or localStorage.getItem('token')
//     if (!user) {
//       navigate('/login'); // Redirect to login if not authenticated
//     } else {
//       setIsAuthenticated(true);
//       const stored = localStorage.getItem('collections');
//       if (stored) {
//         setCollections(JSON.parse(stored));
//       }
//     }
//   }, [navigate]);

//   if (!isAuthenticated) return null;

//   return (
//     <div className="flex flex-col min-h-screen">


