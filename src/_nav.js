import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
  cibEsea,
  cilFolderOpen,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavItem,
    name: 'Stared Projects',
    // to: '/theme/sprojects',
    to: '/sprojects',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Projects ',
    to: '/projects',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Extras',
  },

  {
    component: CNavItem,
    name: 'MarineWaves',
    href: 'https://marinewaves.netlify.app/',
    icon: <CIcon icon={cibEsea} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Portfolio',
    href: 'https://manishportfolio-delta.vercel.app/',
    icon: <CIcon icon={cibEsea} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
