import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../components/collection/CollectionCard";

const imageMap = {
  "Frontend Tools": "/images/Frontend-Tools-cover.jpg",
  "JavaScript Resources": "/images/JavaScript-Resources-cover.png",
  "Favorite Coffee Spots": "/images/Favorite-Coffee-Spots-cover.jpg",
  "Must-See Movies": "/images/Must-See-Movies-cover.jpg",
  "Hidden Gem Restaurants": "/images/Hidden-Gem-Restaurants-cover.jpg",
  "Dream Travel Destinations": "/images/Dream-Travel-Destinations-cover.jpg",
  "Inspiring Musicians": "/images/Inspiring-Musicians-cover.jpg",
  "Cozy Bookstores": "/images/Cozy-Bookstores-cover.jpg",
  "Weekend Getaways": "/images/Weekend-Getaways-cover.jpg",
  "Local Art & Museums": "/images/Local-Art-Museums-cover.jpg",
  "Best Podcasts Right Now": "/images/Best-Podcasts-Right-Now-cover.jpg",
  "Home Decor Inspo": "/images/Home-Decor-Inspo-cover.jpeg",
};

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    try {
      const res = await axios.get("http://localhost:2100/api/my-collections", {
        withCredentials: true,
      });
      setCollections(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading your collections...</p>;
  }

  if (!isLoggedIn) {
    return (
      <p className="text-center mt-8">
        Please log in to view your collections.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="text-2xl font-bold">My Collections</h2>
          <button
            className="btn btn-success"
            onClick={() => navigate("/collections/new")}
          >
            + Add new collection
          </button>
        </div>

        {collections.length > 0 ? (
          <div className="row justify-content-center">
            {collections.map((collection) => (
              <CollectionCard
                key={collection._id}
                title={collection.title}
                coverImage={
                  imageMap[collection.title] || "https://picsum.photos/300/180"
                }
                linkCount={collection.linkIds?.length || 0}
                onClick={() => navigate(`/collection/${collection._id}`)}
              />
            ))}
          </div>
        ) : (
          <p>You have no collections yet.</p>
        )}
      </main>
    </div>
  );
};

export default CollectionsPage;
