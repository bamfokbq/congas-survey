const { connectToDatabase } = require('../mongodb');
const ObjectId = require('mongodb').ObjectId;

// Add a new survey post
export async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection('vendors').insertOne(JSON.parse(req.body));
    return res.json({
      message: 'Post added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Getting all posts
export async function getPosts(req, res) {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection('vendors')
      .find({})
      .sort({ name: -1 })
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Delete Post survey
export async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection('vendors').deleteOne({
      _id: new ObjectId(req.body),
    });

    return res.json({
      message: 'Post deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
