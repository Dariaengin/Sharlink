const Collection = require('../models/collectionModel');

// Seed hardcoded collections
const seedCollections = async (req, res) => {
  try {
    const collectionsData = [
      {
        title: 'Favorite Coffee Spots',
        linkIds: [],
      },
      {
        title: 'Must-See Movies',
        linkIds: [],
      },
      {
        title: 'Hidden Gem Restaurants',
        linkIds: [],
      },
      {
        title: 'Dream Travel Destinations',
        linkIds: [],
      },
      {
        title: 'Inspiring Musicians',
        linkIds: [],
      },
      {
        title: 'Cozy Bookstores',
        linkIds: [],
      },
      {
        title: 'Weekend Getaways',
        linkIds: [],
      },
      {
        title: 'Local Art & Museums',
        linkIds: [],
      },
      {
        title: 'Best Podcasts Right Now',
        linkIds: [],
      },
      {
        title: 'Home Decor Inspo',
        linkIds: [],
      },
    ];

    // Add new collections
    const inserted = await Collection.insertMany(collectionsData);

    res.status(201).json({
      message: 'Collections seeded successfully',
      data: inserted,
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed collections' });
  }
};

// Get all collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate('linkIds');
    res.status(200).json(collections);
  } catch (err) {
    console.error('Get collections error:', err);
    res.status(500).json({ error: 'Failed to retrieve collections.' });
  }
};

module.exports = {
  seedCollections,
  getAllCollections,
};
