import React from "react";
import css from "@/styles/homeView.module.css";
import PostGenerator from "@/components/PostGenerator";

const HomeView = () => {
  return (
    <div className={css.wrapper}>
        <div className={css.postArea}>
            <PostGenerator/>
            <span>Post</span>
        </div>

        <div className={css.right}>
            <span>Trending Section</span>
            <span>Follower Section</span>
        </div>
    </div>
  )
}

export default HomeView