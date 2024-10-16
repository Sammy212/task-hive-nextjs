import React from 'react';
import { Avatar, Button, Flex, Input } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '@/actions/post';
import toast from 'react-hot-toast';

const CommentInput = ({postId, setExpanded, queryId}) => {

    const {user} = useUser();
    const [value, setValue] = React.useState("");
    const queryClient = useQueryClient();

    const {isPending, mutate} = useMutation({
        mutationFn: (postId) => addComment(postId, value),

        onMutate: async() => {
            setExpanded(true);

            // cancel any outgoing refetches (so dey don't overwrite optimistic updates)
            await queryClient.cancelQueries(["posts", queryId]);

            // Snapshot the previous value
            const previousPosts = queryClient.getQueriesData(["posts", queryId]);

            // optimistically update with new data
            queryClient.setQueriesData(["post", queryId], (old) => {
                return {
                    ...old,
                    pages: old.pages.map((page) => {
                        return {
                            ...page,
                            data: page.data.map((post) => {
                                if(post.id === postId) {
                                    return {
                                        ...post,
                                        comments: [
                                            ...post.comments,
                                            {
                                                comment: value,
                                                authorId: user?.id,
                                                author: {
                                                    first_name: user?.firstName,
                                                    last_name: user?.lastName,
                                                    image_url: user?.imageUrl,
                                                },
                                            },
                                        ],
                                    };
                                } else { return post; }
                            }),
                        };
                    }),
                };
            });
            return { previousPosts };
        },
        
        onError: (err, variables, context) => {
            toast.error("Failed to add comment");
            queryClient.setQueriesData(["posts"], context.previousPosts);
        },

        onSettled: () => {
            queryClient.invalidateQueries(["posts"])
            setValue("")
        }
    })
  return (
    <Flex gap={"1rem"} align='center'>
        {/* User avatar */}
        <Avatar 
            src={user?.imageUrl} 
            size={40} style={{ minWidth: "40px"}} 
        />

        {/* input form */}
        <Input.TextArea
            placeholder='Write what you think...'
            style={{resize: "none"}}
            autoSize={{ minRows: 1, maxRows: 5 }}
            value={value}
            onChange={
                (e) => setValue(e.target.value)
            }
            // disabled
        />

        <Button
            type='primary'
            onClick={() => mutate(postId)}
            disabled={isPending || !value || value === ""}
        >
            <Icon icon={"iconamoon:send-fill"} width={"1.2rem"} />
        </Button>
    </Flex>
  )
}

export default CommentInput;