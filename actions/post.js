"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";

export const createPost = async (post) => {
    try {
        const {postText, media} = post;

        const user = await currentUser()

        let cld_id;
        let assetUrl
        if(media) {
            const res = await uploadFile(media, `/posts/${user?.id}`);
            const {public_id, secure_url} = res;
            cld_id = public_id
            assetUrl = secure_url
        }

        const newPost = await db.post.create({
            data : {
                postText,
                media: assetUrl,
                cld_id,
                author: {
                    connect :{
                        id: user?.id
                    }
                }
            }
        })

        console.log(newPost);

        return {
            data: newPost
        }
        
    } catch (e) {
        console.log(e?.message);
        throw new Error("failed to create post")
        
    }
}


export const getMyFeedPosts = async (lastCursor) => {
    try {
        const take = 5; // number of post loaded at a time from db
        const posts = await db.post.findMany({
            include: {
                author:  true,
                likes: true,
                comments: {
                    include: { author: true },
                },
            },
            take, 
            ...(lastCursor && {
                skip: 1,
                cursor: {
                    id: lastCursor
                }
            }),
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (posts.length === 0) {
            return {
                data: [],
                metaData: {
                    lastCursor: null,
                    hasMore: false,
                },
            };
        }
        const lastPostInResults = posts[posts.length - 1];
        const cursor = lastPostInResults.id;
        const morePosts = await db.post.findMany({
            take,
            skip: 1,
            cursor: {
                id: cursor
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return {
            data: posts,
            metaData: {
                lastCursor: cursor,
                hasMore: morePosts.length > 0
            }
        }
    } catch(e) {
        console.log(e);
        throw new Error("Failed to fetch posts");
    }
}


export const updatePostLike = async (params) => {
    const { postId, actionType } = params; // Destructuring params
    try {
      const { id: userId } = await currentUser();
  
      // Find the post with likes included
      const post = await db.post.findUnique({
        where: { id: postId },
        include: { likes: true },
      });
  
      // Return an error if the post is not found
      if (!post) {
        return { error: "Post not found" };
      }
  
      // Check if the user has already liked the post
      const existingLike = post.likes.find(like => like.authorId === userId);
  
      // If user already liked the post
      if (existingLike) {
        if (actionType === "like") {
          // If the user is trying to like it again, return the unchanged post
          return { data: post };
        }
        // Otherwise, delete the existing like (user is unliking)
        await db.like.delete({
          where: { id: existingLike.id },
        });
        console.log("Like deleted");
      } else {
        // If the user has not liked the post yet
        if (actionType === "unlike") {
          // If trying to unlike without liking, return the unchanged post
          return { data: post };
        }
        // Otherwise, create a new like (user is liking)
        await db.like.create({
          data: {
            post: { connect: { id: postId } },
            author: { connect: { id: userId } },
          },
        });
        console.log("Like created");
      }
  
      // Fetch the updated post with likes included
      const updatedPost = await db.post.findUnique({
        where: { id: postId },
        include: { likes: true },
      });
  
      return { data: updatedPost };
  
    } catch (e) {
      console.error(e);
      throw new Error(`Failed to update post like: ${e.message}`);
    }
};


export const addComment = async (postId, comment)   => {
    try {
        const {id: userId} = await currentUser();
        const newComment = await db.comment.create({
            data: {
                comment,
                post: {
                    connect: {
                        id: postId
                    }
                },
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        console.log("comment created", newComment);
        return {
            data: newComment,
        };
    } catch (e) {
        console.log(e);
        throw new Error("Failed to add comment");
        
        
    }
}