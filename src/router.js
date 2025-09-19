import { createRouter ,createWebHistory} from "vue-router"
import HomePage from "./components/HomePage.vue"
import UpBlogPage from "./components/UpBlogPage.vue"
import UserPage from "./components/UserPage.vue"
import LogPage from "./components/LogPage.vue"
const routes = [
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
    component: LogPage
  }
]

// 3. 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 使用HTML5 history模式
  routes                        // 传入路由配置
})

// 4. 导出路由
export default router