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
            icon: 'objects-column'
        },
        {
            name: 'Experiments',
            icon: 'square-list',
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
                    path: '/404',
                    name: 'TBD'
                }
            ]
        },
        {
            path: '/404',
            name: 'Guideline',
            icon: 'square-list'
        },
        // {
        //     path: '/reviews',
        //     name: 'Reviews',
        //     icon: 'message-quote'
        // },
        // {
        //     name: 'Pages',
        //     icon: 'layer-group',
        //     links: [
        //         {
        //             path: '/sign-in',
        //             name: 'Sign In'
        //         },
        //         // {
        //         //     path: '/sign-up',
        //         //     name: 'Sign Up'
        //         // },
        //         {
        //             path: '/404',
        //             name: 'Page 404'
        //         }
        //     ]
        // }
    ],
    secondary: [
        {
            path: '/404',
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