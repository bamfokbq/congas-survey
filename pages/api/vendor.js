import { getPosts, addPost, deletePost } from '../../library/controllers/vendor';

// Create a handler function
export default async function handler(req, res) {
  // Switch the API methods
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    case 'POST': {
      return addPost(req, res);
    }

    case 'DELETE': {
      return deletePost(req, res);
    }
  }
}
