const Link = require('../models/linkModel');
// const Comment = require('../models/comment');

// Create new link
const createLink = async (req, res) => {
  try {
    const { url, title, description, collectionId, userId } = req.body;

    if (!url || !title || !collectionId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLink = new Link({
      url,
      title,
      description,
      collectionId,
      userId,
    });

    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    console.error('Create Link Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all links
const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().populate('collectionId').populate('userId');
    res.status(200).json(links);
  } catch (error) {
    console.error('Get Links Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get one link by ID
const getLinkById = async (req, res) => {
  const linkId = req.params.linkId;

  if (!linkId) {
    return res.status(400).json({ message: 'Missing link ID in request' });
  }

  try {
    const link = await Link.findById(linkId).lean();

    if (!link) {
      return res
        .status(404)
        .json({ message: `Link with ID ${linkId} not found` });
    }

    res.status(200).json(link);
  } catch (err) {
    console.error('Get Link By ID Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update link
const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { url, title, description } = req.body;

    const updatedLink = await Link.findByIdAndUpdate(
      linkId,
      { url, title, description },
      { new: true, runValidators: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.status(200).json(updatedLink);
  } catch (error) {
    console.error('Update Link Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete link
const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;

    const deleted = await Link.findByIdAndDelete(linkId);

    if (!deleted) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Delete Link Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkById,
  updateLink,
  deleteLink,
};
