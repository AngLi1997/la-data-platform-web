import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/system/MenuView.vue'
import PermissionView from '@/views/system/PermissionView.vue'
import RoleView from '@/views/system/RoleView.vue'
import DatasourceView from '@/views/om/DatasourceView.vue'
import ApiView from '@/views/om/ApiView.vue'
import ServiceView from '@/views/om/ServiceView.vue'
import DocView from '@/views/om/DocView.vue'
import FormConfigView from '@/views/process/FormConfigView.vue'
import UserView from '@/views/system/UserView.vue'
import HomeView from '@/views/home/HomeView.vue'
import ProcessConfigView from '@/views/process/ProcessConfigView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },{
      path: '/system',
      name: '系统设置',
      children: [
        {
          path: '/system/user',
          name: '用户管理',
          component: UserView
        },{
          path: '/system/role',
          name: '角色管理',
          component: RoleView
        },{
          path: '/system/permission',
          name: '权限管理',
          component: PermissionView
        },{
          path: '/system/menu',
          name: '菜单管理',
          component: MenuView
        }
      ]
    },{
      path: '/om',
      name: '运维管理',
      children:[
        {
          path: '/om/datasource',
          name: '数据源管理',
          component: DatasourceView
        },{
          path: '/om/api',
          name: '接口管理',
          component: ApiView
        },{
          path: '/om/service',
          name: '服务管理',
          component: ServiceView
        },{
          path: '/om/doc',
          name: '文档管理',
          component: DocView
        }
      ]
    },{
      path: '/process',
      name: '运维设置',
      children: [
        {
          path: '/process/processConfig',
          name: '流程管理',
          component: ProcessConfigView
        },{
          path: '/process/formConfig',
          name: '表单管理',
          component: FormConfigView
        }
      ]
    }
  ]
})

export default router
