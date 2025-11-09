import React from 'react'
import Page404 from './components/views/pages/page404/Page404'



const Dashboard = React.lazy(() => import('./components/views/dashboard/Dashboard'))

const ProjectsPage = React.lazy(() => import('./pages/Project/ProjectsPage'))
const Project = React.lazy(() => import("./pages/Project/Project"))
const StaredProject = React.lazy(() => import("./pages/Project/StaredProjects"))

const Badges = React.lazy(() => import('./components/views/notifications/badges/Badges'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: 'projects', name: 'Projects', element: ProjectsPage },
  { path: 'sprojects/', name: 'Projects', element: StaredProject },
  { path: '/projects/project', name: 'Project', element: Project },
  { path: '/sprojects/project', name: 'Project', element: Project },

  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '*', element: Page404 },

]

export default routes
