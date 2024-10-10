"use client"
import { getMyFeedPosts } from '@/actions/post';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Posts = () => {

    const {ref, inView} = useInView();

    const checkLastViewRef = (index, page) => {
        if (index === page?.data?.length -1) {
            return true;
        } else return false;
    }

    const {data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey: "posts",
        queryFn: ({ pageParam = "" }) => getMyFeedPosts(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData?.lastCursor
        }
    });
    
    useEffect(() => {
        if (inView && hasNextPage){
            fetchNextPage();
        }
    }, [hasNextPage, inView, fetchNextPage]);

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
    
    if(isSuccess) {
        return (
            <Flex vertical gap={"1rem"}>
                {
                    data?.pages?.map((page) => 
                        page?.data?.map((post, index) =>
                            checkLastViewRef(index, page) ? (
                            <div key={post?.id} style={{width: "100%", background: "blue", height: "30rem"}} ref={ref}>
                                <span>Post</span>
                            </div>
                            ) : (
                            <div key={post?.id} style={{width: "100%", background: "blue", height: "30rem"}}>
                                <span>Post</span>
                            </div>
                        ))
                    )
                }
            </Flex>
        )
    }
}

export default Posts