export const updatePostLike = async (params) => {
    const {postId, actionType : type} = params;
    // type is either "like" or "unlike"
    try {
      const { id: userId } = await currentUser();
  
      // find the post in db
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          likes: true,
        },
      });
      if (!post) {
        return {
          error: "Post not found",
        };
      }
  
      // check if user has already liked the post
      const like = post.likes.find((like) => like.authorId === userId);
  
      // if user has already liked the post,
      if (like) {
        // if user is trying to like the post again, return the post
        if (type === "like") {
          return {
            data: post,
          };
        }
        // otherwise, delete the like
        else {
          await db.like.delete({
            where: {
              id: like.id,
            },
          });
          console.log("like deleted");
        }
      }
      // if user has not already liked the post
      else {
        // if user is trying to unlike the post, return the post
        if (type === "unlike") {
          return {
            data: post,
          };
        }
        // if user is trying to like the post, create a new like
        else {
          await db.like.create({
            data: {
              post: {
                connect: {
                  id: postId,
                },
              },
              author: {
                connect: {
                  id: userId,
                },
              },
            },
          });
          console.log("like created");
        }
      }
      const updatedPost = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          likes: true,
        },
      });
  
      console.log("updated post", updatedPost);
      return {
        data: updatedPost,
      };
    } catch (e) {
      console.log(e);
      throw Error("Failed to update post like");
    }
};