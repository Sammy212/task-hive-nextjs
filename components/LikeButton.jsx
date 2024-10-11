import { updatePostLike } from '@/actions/post';
import { updateQueryCacheLikes } from '@/utils';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react'

const LikeButton = ({postId, likes, queryId}) => {

    const {user} = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
      setIsLiked(likes?.some((like) => like?.authorId == user?.id));
    },[user, likes]);

    const actionType = isLiked ? "unlike" : "like"

    const {mutate} = useMutation({
      mutationFn: (params) => updatePostLike(params),
      onMutate: async() => {

        // cancel any outgoing refetches (so they don't overwite our optimistic update)
        await queryClient.cancelQueries(['post', queryId])

        // Snapshot of previous values
        const previousPosts = queryClient.getQueriesData(['posts', queryId])

        // Optimisticlly update new values
        queryClient.setQueriesData(['posts', queryId], (old) => {
          return {
            ...old,
            pages: old.pages.map((page) => {
              return {
                ...page,
                data: page.data.map((post) => {
                  if(post.id === postId) {
                    return {
                      ...post,
                      likes: updateQueryCacheLikes(
                        post.likes, postId, user.id, actionType
                      ),
                    };
                  } else { return post; };
                }),
              };
            }),
          };
        });

        // Return a context object with the snapshotted value
        return { previousPosts };
      },

      onError: (err, variables, context) => {
        console.log("there's an error", err);
        queryClient.setQueriesData(["posts", queryId], context.previousPosts);
      },

      // Refetch data from db on success or error
      onSettled: () => {
        queryClient.invalidateQueries(["posts"]);
      }
    })

  return (
    <HappyProvider>
      <Button
        size='small'
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={() => mutate({postId, actionType})}
      >
        <Flex gap={".5rem"} align="center" >
          <Icon icon="ph:heart-fill"
            width={"22px"}
            style={{ color: isLiked ? "var(--primary" : "grey" }}
          />

          <Typography.Text>
            {likes?.length === 0 ? "Like" : `${likes?.length} Likes`}
          </Typography.Text>
        </Flex>
      </Button>
    </HappyProvider>
  )
};

export default LikeButton;