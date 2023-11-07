import { lazy } from 'react'

const TableRoutes = [
  {
    path: '/soulpage-table',
    component: lazy(() => import('../../../views/MyProject/index'))
  }
 
]

export default TableRoutes
