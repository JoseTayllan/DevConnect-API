import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

const postService = new PostService();

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = (req as any).user.id;
    const post = await postService.createPost(userId, content);
    res.status(201).json(post);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getPostsByUser((req as any).user.id);
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const success = await postService.deletePost(req.params.id as string, (req as any).user.id);
    res.json({ message: success ? 'Post deletado com sucesso!' : 'Erro ao deletar.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const post = await postService.toggleLike(req.params.id as string, (req as any).user.id);
    res.json(post);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const post = await postService.addComment(
      req.params.id as string,
      (req as any).user.id,
      req.body.text
    );
    res.json(post);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
