export const sidebarRoutes = () => [
    {
        name: "home",
        icon: "eva:home-fill",
        route: "/"
    },
    {
        name: "my profile",
        icon: "iconamoon:profile-circle-fill",
        // route: `/profile/${user?.id}`
        route: "/profile"
    },
    {
        name: "messages",
        icon: "mingcute:message-3-fill",
        route: "/messages"
    }
]