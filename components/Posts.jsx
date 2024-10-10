"use client"
import { getMyFeedPosts } from '@/actions/post';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd';
import React from 'react'

const Posts = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: "posts",
        queryFn: () => getMyFeedPosts()
    });

    if(isError) {
        return <Typography>Something Went Wrong</Typography>
    }

    if(isLoading) {
        return(
            <Flex vertical align="center" gap="large">
                <Spin />
                <Typography>Loading...</Typography>
            </Flex>
        )
    }
    
  return (
    <div>Posts</div>
  )
}

export default Posts