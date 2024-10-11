"use client"
import { getMyFeedPosts } from '@/actions/post';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Post from './Post';

const Posts = ({id = "all"}) => {

    const {ref, inView} = useInView();

    const checkLastViewRef = (index, page) => {
        if (index === page?.data?.length -1) {
            return true;
        } else return false;
    }

    const {
        data, 
        isLoading, 
        isError, 
        isSuccess, 
        hasNextPage, 
        fetchNextPage, 
        isFetching, 
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["posts", id],
        queryFn: ({ pageParam = "" }) => getMyFeedPosts(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData?.lastCursor
        },
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
                <Typography>Loading Your Feed...</Typography>
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
                            <div key={post?.id} ref={ref}>
                                <Post data={post} queryId={id}/>
                            </div>
                            ) : (
                            <div key={post?.id}>
                                <Post data={post} queryId={id}/>
                            </div>
                        ))
                    )
                }
                {
                    (isLoading || isFetchingNextPage || isFetching) && (
                        <Flex vertical align="center" gap="large">
                            <Spin />
                            <Typography>Loading...</Typography>
                        </Flex>
                    )
                }
            </Flex>
        );
    }
}

export default Posts