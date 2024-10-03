"use client";
import React, { useCallback } from 'react';
import Link from 'next/link';
import css from "@/styles/sidebar.module.css";
import { sidebarRoutes } from '@/lib/sidebarRoutes';
import { Typography } from 'antd';
import { Icon } from '@iconify/react';
import Box from './Box/Box';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import cx from "classnames";
import { useSettingsContext } from '@/context/settings/settings-context';
import SidebarContainer from './SidebarContainer';

const Sidebar = () => {
    const router = useRouter();
    const {signOut} = useClerk();

    const {
        settings: { isSidebarOpen },
        setSettings,
    } = useSettingsContext();

    const handleDrawerClose = useCallback(() => {
        setSettings((prev) => (
            {
                ...prev,
                isSidebarOpen: false
            }
        ))
    }, [setSettings]);

    // isActive function on sidebar menu
    const pathname = usePathname();
    const isActive = (route) => {
        if( route.route === pathname )
            return css.active;
    }

    const activeColor = (route) => {
        return isActive(route) && "var(--primary)";
    };

  return (
    <SidebarContainer
        isDrawerOpen = {isSidebarOpen}
        setIsDrawerOpen = {handleDrawerClose}
    >
        <div className={css.wrapper}>
            <Box className={css.container}>
                {
                    sidebarRoutes().map((route, index) => (
                        <Link 
                            key={index} 
                            href={route.route} 
                            className={cx(css.item, isActive(route))}
                        >
                            {/* Route Icon */}
                            <Typography
                                style={{ color: activeColor(route), }}
                            >
                                <Icon icon={route.icon} width={"20px"} />
                            </Typography>

                            {/* Route Name */}
                            <Typography className="typoSubtitle2"
                                style={{ color: activeColor(route), }}
                            >
                                {route.name}
                            </Typography>
                        </Link>
                    ))
                }

                {/* Signout */}
                <Link
                    href={""} onClick={() => {
                        signOut(() => router.push("/sign-in"))
                    }}
                    className={css.item}
                >
                    {/* Route Icon */}
                    <Typography>
                        <Icon icon={"solar:logout-2-bold"} width={"20px"} />
                    </Typography>

                    {/* Route Name */}
                    <Typography className="typoSubtitle2">
                        Signout
                    </Typography>                        
                </Link>
            </Box>
        </div>
    </SidebarContainer>
  )
}

export default Sidebar