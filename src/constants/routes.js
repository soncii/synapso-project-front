const ROUTES = {
    main: [
        // {
        //     name: 'Dashboard',
        //     icon: 'objects-column',
        //     notifications: 2,
        //     links: [
        //         {
        //             path: '/',
        //             name: 'TBD'
        //         },
        //         {
        //             path: '/dashboard-b',
        //             name: 'TBD'
        //         },
        //         {
        //             path: '/dashboard-c',
        //             name: 'TBD'
        //         },
        //         {
        //             path: '/dashboard-d',
        //             name: 'Dashboard D'
        //         }
        //     ]
        // },
        {
            path: '/404',
            name: 'Dashboard',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Experiments',
            icon: 'bag-shopping',
            links: [
                {
                    path: '/create-recall',
                    name: 'Create Recall'
                },
                {
                    path: '/create-recognition',
                    name: 'Create Recognition'
                },
                {
                    path: '/experiments',
                    name: 'Experiments list'
                }
            ]
        },
        {
            name: 'Analytics',
            icon: 'square-list',
            links: [
                {
                    path: '/orders',
                    name: 'TBD'
                }
            ]
        },
        {
            path: '/sales',
            name: 'Guideline',
            icon: 'badge-percent'
        },
        // {
        //     path: '/reviews',
        //     name: 'Reviews',
        //     icon: 'message-quote'
        // },
        {
            name: 'Pages',
            icon: 'layer-group',
            links: [
                {
                    path: '/sign-in',
                    name: 'Sign In'
                },
                // {
                //     path: '/sign-up',
                //     name: 'Sign Up'
                // },
                {
                    path: '/404',
                    name: 'Page 404'
                }
            ]
        }
    ],
    secondary: [
        {
            path: '/settings',
            name: 'Settings',
            icon: 'gear'
        },
        {
            path: '/sign-in',
            name: 'Logout',
            icon: 'arrow-right-from-bracket'
        }
    ]
}

export default ROUTES