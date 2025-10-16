import Post, { IPost } from '../models/post.model';

export class PostService {
  async createPost(userId: string, content: string): Promise<IPost> {
    const post = new Post({ userId, content });
    return await post.save();
  }

  async getAllPosts(): Promise<IPost[]> {
    return await Post.find().sort({ createdAt: -1 });
  }

  async getPostsByUser(userId: string): Promise<IPost[]> {
    return await Post.find({ userId }).sort({ createdAt: -1 });
  }

  async deletePost(postId: string, userId: string): Promise<boolean> {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Postagem não encontrada.');
    if (post.userId !== userId) throw new Error('Acesso negado.');
    await post.deleteOne();
    return true;
  }

  async toggleLike(postId: string, userId: string): Promise<IPost> {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post não encontrado.');

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    return post;
  }

  async addComment(postId: string, userId: string, text: string): Promise<IPost> {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post não encontrado.');

    post.comments.push({ userId, text, createdAt: new Date() });
    await post.save();
    return post;
  }
}
