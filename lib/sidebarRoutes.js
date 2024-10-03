export const sidebarRoutes = () => [
    {
        name: "home",
        icon: "eva:home-fill",
        route: "/"
    },
    {
        name: "my profile",
        icon: "solar:logout-2-bold",
        // route: `/profile/${user?.id}`
        route: "/profile"
    },
    {
        name: "messages",
        icon: "mingcute:message-3-fill",
        route: "/messages"
    }
]