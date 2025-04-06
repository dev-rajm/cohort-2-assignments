import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

enum StatusCode {
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  Ok = 200,
  INTERNALSERVERERROR = 500,
}

// Get all posts
export const getPosts = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.posts.findMany({
      include: {
        tags: true,
        user: true,
      },
    });

    if (posts.length == 0) {
      return c.body('No post found. Please create one', StatusCode.Ok);
    }

    return c.json({
      posts: posts.map(post => ({
        id: post.id,
        username: post.user.username,
        userId: post.user.id,
        title: post.title,
        description: post.description,
        tags: post.tags,
        createdAt: post.createdAt,
      })),
    });
  } catch (error) {
    return c.body('Interval server error', StatusCode.INTERNALSERVERERROR);
  }
};

// Get user specific posts
export const getUserPosts = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.posts.findMany({
      where: {
        userId: c.get('userId')['userId'],
      },
    });

    return c.json({
      posts: posts,
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Create post
export const createPost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: { title: string; description: string; tags: string } =
      await c.req.json();

    const tagNames = body.tags.split(',').map(tag => tag.trim());

    if (!body.title && !body.description) {
      return c.body('Invalid user input', StatusCode.BADREQUEST);
    }

    const post = await prisma.posts.create({
      data: {
        title: body.title,
        description: body.description,
        userId: c.get('userId')['userId'],
        tags: {
          connectOrCreate: tagNames.map(tag => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      message: 'Post published.',
      post: {
        id: post.id,
        title: post.title,
        description: post.description,
        tags: post.tags.map(tag => tag.tag),
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Get a specific post
export const getPost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: Number(c.req.param('id')),
        userId: c.get('userId').userId,
      },
      include: {
        tags: true,
      },
    });

    if (!post) {
      return c.body("Post doesn't exist", StatusCode.NOTFOUND);
    }

    return c.json({
      data: {
        id: post.id,
        title: post.title,
        description: post.description,
        tags: post.tags,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Edit an existing post
export const updatePost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: { title: string; description: string; tags: string } =
      await c.req.json();
    const tagNames = body.tags.split(',').map(tag => tag.trim());

    const post = await prisma.posts.findFirst({
      where: {
        id: Number(c.req.param('id')),
        userId: c.get('userId'),
      },
    });

    if (!post) {
      return c.body('Post not found', StatusCode.NOTFOUND);
    }

    const updatedPost = await prisma.posts.update({
      where: { id: Number(c.req.param('id')), userId: c.get('userId') },
      data: {
        title: body.title,
        description: body.description,
        tags: {
          connectOrCreate: tagNames.map(tag => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      data: {
        id: updatedPost.id,
        title: updatedPost.title,
        description: updatedPost.description,
        tags: updatedPost.tags,
        createdAt: updatedPost.createdAt,
      },
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Delete an existing post
export const deletePost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: Number(c.req.param('id')),
        userId: c.get('userId'),
      },
    });

    if (!post) {
      return c.body('Post not found', StatusCode.NOTFOUND);
    }

    await prisma.posts.delete({
      where: {
        id: Number(c.req.param('id')),
        userId: c.get('userId'),
      },
    });

    return c.json({
      message: 'Post deleted.',
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};
