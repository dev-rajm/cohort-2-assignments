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

// Get all tags
export const getTags = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const tags = await prisma.tags.findMany();

    if (tags.length == 0) {
      return c.body('No tags available. Please create one.', StatusCode.Ok);
    }

    return c.json({
      tags: tags,
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Get posts by tag name
export const getPostByTag = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.tags.findFirst({
      where: {
        tag: String(c.req.param('tag')),
      },
    });

    if (!res) {
      return c.body('No tag found with this name', StatusCode.NOTFOUND);
    }

    const posts = await prisma.tags.findMany({
      where: { tag: String(c.req.param('tag')) },
      select: {
        post: {
          select: {
            user: { select: { username: true } },
            id: true,
            userId: true,
            title: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });

    if (posts.length == 0) {
      return c.body('No post found with this tag', StatusCode.NOTFOUND);
    }

    return c.json({
      posts: posts[0].post.map(p => ({
        username: p.user.username,
        id: p.id,
        title: p.title,
        description: p.description,
        userId: p.userId,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};
