import { Icon } from '@iconify/react';
import { Button, Flex } from 'antd';
import React from 'react';
import css from "@/styles/commentSection.module.css";
import CommentInput from './CommentInput';

const CommentSection = ({comments, postId, queryId}) => {

    const [expanded, setExpanded] = React.useState(false);
  return (
    <Flex vertical gap={'1rem'}>
        <>
            {/* Show more button */}
            {
                comments?.length > 1 && (
                    <Button type='text' onClick={() => setExpanded((prev) => !prev)}>
                        <Flex>
                            <Icon icon = "ic:outline-expand-more"/>
                            Show more comments
                        </Flex>
                    </Button>
                )
            }

            {/* Comments */}
            {
                comments?.length > 0 && (
                    <Flex
                        vertical gap={".5rem"} className={css.commentsContainer}
                    >
                        {
                            !expanded ? ( <span>Not Expanded</span> ) : (
                                comments.map((comment, index) => (
                                    <span key={index}>Expanded Comments</span>
                                ))
                            )
                        }
                    </Flex>
                )
            }
        </>

        {/* Comment input form */}
        <CommentInput 
            setExpanded={setExpanded}
            queryId={queryId} 
            postId={postId} 
        />
    </Flex>
  )
}

export default CommentSection