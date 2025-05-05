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

// Get one collection by ID
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(
      req.params.collectionId
    ).populate('linkIds');
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const 
getUserCollections = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware
    const collections = await Collection.find({ userId }).populate('linkIds');
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error fetching user collections:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
};
const createCollection = async (req, res) => {
  try {
    const { title, coverImage } = req.body;

    if (!title || title.length < 5 || title.length > 30) {
      return res.status(400).json({ error: 'Title must be 5–30 characters long.' });
    }

    const newCollection = new Collection({
      title,
      userId: req.userId, // comes from isLoggedIn middleware
      linkIds: [],
      coverImage,
    });

    await newCollection.save();

    res.status(201).json({
      message: 'Collection created successfully',
      collection: newCollection,
    });
  } catch (error) {
    console.error('Create collection error:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
};


module.exports = {
  seedCollections,
  getAllCollections,
  getCollectionById,
  getUserCollections,
  createCollection
};
