import { createBrowserRouter } from 'react-router-dom'

import { Login, Sample } from 'src/app/pages'

import {
  ProtectedAuth,
  PublicAuth,
  // PublicAccessibleAuth,
} from './ProtectedRoutes.app'

import type { RouteObject } from 'react-router-dom'

export const Router: RouteObject[] = [
  {
    element: <PublicAuth />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  // {
  //   element: <PublicAccessibleAuth />,
  //   children: [
  //     {
  //       path: '/privacy-policy',
  //       element: <PrivacyPolicyPage />
  //     },
  //   ]
  // },

  {
    path: '/sample',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <Sample />,
      },
    ],
  },

  {
    path: '*',
    element: <div>Not found</div>,
  },
  {
    path: '/denied',
    element: <div>denied</div>,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Sample />,
  },
  {
    path: '/sample',
    element: <Sample />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
])
