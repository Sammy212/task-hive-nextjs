import React from "react";
import css from "@/styles/homeView.module.css";
import PostGenerator from "@/components/PostGenerator";
import Posts from "@/components/Posts";

const HomeView = () => {
  return (
    <div className={css.wrapper}>
        <div className={css.postArea}>
            <PostGenerator/>
            
            {/* Users Post's Feeds */}
            <Posts/>
        </div>

        <div className={css.right}>
            <span>Trending Section</span>
            <span>Follower Section</span>
        </div>
    </div>
  )
}

export default HomeView