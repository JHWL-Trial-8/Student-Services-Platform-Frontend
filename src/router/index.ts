import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from "../components/HomePage.vue"
import UpBlogPage from "../components/UpBlogPage.vue"
import UserPage from "../components/UeserPage.vue"
import LogPage from "../components/LogPage.vue"
import Notfound from "../components/NotFound.vue"
import ControllUserPage from '@/components/ControllUserPage.vue'
import FeedBackPage from '@/components/FeedBackPage.vue'
import YouCantIn from '@/components/YouCantIn.vue'
import RegesterPage from '@/components/RegesterPage.vue'
import HomePageIn from '@/components/HomePageIn.vue'
import NotLogin from '@/components/NotLogin.vue'
import CompileUser from '@/components/CompileUser.vue'
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    title: string
  }
}

const routes: RouteRecordRaw [] = [
  {
    path: '/',          // 访问路径
    component: HomePage     // 对应的组件
  },
  {
    path: '/up',
    component: UpBlogPage
  },
  {
    path:"/user",
    component: UserPage
  },
  {
    path:"/log",
    component: LogPage,
  },
  {
    path:'/controlluser',
    component:ControllUserPage
  },
  {
    path:'/feedbackpage',
    component:FeedBackPage
  },
  {
    path:'/youcantin',
    component:YouCantIn
  },
  {
    path:'/register',
    component:RegesterPage
  },
  {
    path:'/home',
    component:HomePageIn
  },
  {
    path:'/notlogin',
    component:NotLogin
  },
  {
    path:'/compileuser',
    component:CompileUser
  },
  {
    path: '/:pathMatch(.*)*',
    component:Notfound
  },
]

// 3. 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 使用HTML5 history模式
  routes                        // 传入路由配置
})

router.beforeEach((to, from, next) => {
  const adminPath = ['/feedbackpage', '/controlluser'];
  const publicPaths = ['/log', '/register','/','/notlogin']; // 不需要认证的路径
  // 如果是公开路径，直接放行
  if (publicPaths.includes(to.path)){
    next();
    return;
  }
  
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('access_token');
  
  // 检查用户是否已登录
  if (!token || token === '') {
    // 未登录，重定向到登录页
    next('/notlogin');
    return;
  }
  
    // 检查角色数据是否存在
  if (role === null) {
    // 角色数据丢失，清除 token 并重定向到登录页
    localStorage.removeItem('access_token');
    next('/log');
    return;
  }
  
  try {
    // 检查管理员权限
    if (adminPath.includes(to.path) && !(role === 'admin'|| role === 'superadmin')) {
      // 非管理员尝试访问管理员页面
      next('/youcantin'); // 或重定向到无权限页面
      return;
    }
    
    // 允许访问
    next();
  } catch (error) {
    console.error('路由守卫错误:', error);
    // 发生错误时，清除存储并重定向到登录页
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    next('/log');
  }
});

// 4. 导出路由
export default router