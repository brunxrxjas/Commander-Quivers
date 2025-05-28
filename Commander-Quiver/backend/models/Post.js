let posts = [];

class Post {
  constructor(title, content, userId) {
    this.id = posts.length + 1;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  static getAll() {
    return posts;
  }

  static create(title, content, userId) {
    const post = new Post(title, content, userId);
    posts.push(post);
    return post;
  }

  static findById(id) {
    return posts.find((p) => p.id === id);
  }

  static update(id, title, content) {
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
    }
    return post;
  }

  static delete(id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Post;