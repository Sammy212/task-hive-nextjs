import React from "react";
import HomeView from "@/sections/HomeView";

export const metadata = () => {
  return {
    title: "TaskHive",
    description: "Building Bridges Between Work and Life",
  }
}

const MainPage = () => {
  return <HomeView/>
}

export default MainPage