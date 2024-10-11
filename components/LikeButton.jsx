import { HappyProvider } from '@ant-design/happy-work-theme';
import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react';
import { Button, Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react'

const LikeButton = ({postId, likes, queryId}) => {

    const {user} = useUser();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
      setIsLiked(likes?.some((like) => like?.authorId == user?.id));
    },[user, likes]);

  return (
    <HappyProvider>
      <Button
        size='small'
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
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