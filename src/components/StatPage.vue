<template>
    <PageHead></PageHead>
    <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80">
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                    <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                    <hr>
                    <router-link to="/cannedreply" class="py-4 my-2 text-center font-semibold">预设反馈信息</router-link>
                    <hr>
                    <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold">用户账号管理</router-link>
                    <hr v-if="role === 'SUPER_ADMIN'">
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/statpage" v-if="role === 'SUPER_ADMIN'">大屏统计显示</RouterLink>
                    <hr v-if="role === 'SUPER_ADMIN'"><!--超级管理员才显示-->
                    <router-link to="/handlesapmpage" class="py-4 my-2 text-center font-semibold" v-if="role === 'SUPER_ADMIN'">处理垃圾信息信息</router-link>
                    <hr v-if="role === 'SUPER_ADMIN'">
                    <div class="w-auto rounded-md p-4"><!--信息显示-->
                    <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    {{ username }}
                </div>
            </div> 
        </div>
        <div class="flex-1 p-10">
            <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                <div class="mb-6 bg-white rounded-xl shadow-sm p-4"><!-- 时间筛选 -->
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold text-gray-800">数据统计大屏</h1>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">开始日期:</label>
                                <input type="date" v-model="filters.from" class="px-3 py-2 border border-gray-300 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">结束日期:</label>
                                <input type="date" v-model="filters.to" class="px-3 py-2 border border-gray-300 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <button @click="fetchStatistics" class="px-4 py-2 bg-blue-500 text-white rounded-lg 
                            hover:bg-blue-600 transition duration-200">查询</button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"><!-- 统计卡片 -->
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 
                                        2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600">总工单数</p>
                                <p class="text-2xl font-bold text-gray-800">{{ statistics.totals?.tickets || 0 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 
                                    11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600">已解决</p>
                                <p class="text-2xl font-bold text-gray-800">{{ statistics.totals?.resolved || 0 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-lg bg-gray-100 text-gray-600 mr-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600">已关闭</p>
                                <p class="text-2xl font-bold text-gray-800">{{ statistics.totals?.closed || 0 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-lg bg-red-100 text-red-600 mr-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 
                                    4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 
                                    1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600">垃圾邮件</p>
                                <p class="text-2xl font-bold text-gray-800">{{ statistics.totals?.spam_confirmed || 0 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><!-- 图表区域 -->
                    <div class="bg-white rounded-xl shadow-sm p-6"><!-- 分类分布 -->
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">问题分类分布</h3>
                        <div v-if="statistics.by_category && statistics.by_category.length > 0" class="space-y-3">
                            <div v-for="category in statistics.by_category" :key="category.category"
                                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="font-medium text-gray-700">{{ category.category }}</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {{ category.count }}</span>
                            </div>
                        </div>
                        <div v-else class="text-center text-gray-500 py-8">
                            暂无分类数据
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">每日工单趋势</h3><!-- 每日趋势 -->
                        <div v-if="statistics.daily_trend && statistics.daily_trend.length > 0" class="space-y-3">
                            <div v-for="trend in statistics.daily_trend.slice(-7)" :key="trend.date"class="flex items-center 
                            justify-between">
                                <span class="text-sm text-gray-600">{{ formatDate(trend.date) }}</span>
                                <div class="flex items-center space-x-2">
                                    <div class="w-32 bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" :style="{ width: calculatePercentage(trend.count) + '%' }"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-700 w-8 text-right">{{ trend.count }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-gray-500 py-8">
                            暂无趋势数据
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-sm p-6"><!-- 管理员工作量 -->
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">管理员工作量统计</h3>
                    <div v-if="statistics.admin_workload && statistics.admin_workload.length > 0" class="overflow-x-auto">
                        <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">管理员</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">处理工单数</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">占比</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">进度条</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="admin in statistics.admin_workload" :key="admin.admin_id"
                                class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3 px-4 text-sm text-gray-700">{{ admin.name }}</td>
                                <td class="py-3 px-4 text-sm text-gray-700">{{ admin.tickets_handled }}</td>
                                <td class="py-3 px-4 text-sm text-gray-700">
                                    {{ calculateAdminPercentage(admin.tickets_handled) }}%
                                </td>
                                <td class="py-3 px-4">
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" :style="{ width: calculateAdminPercentage(admin.tickets_handled) + '%' }"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div v-else class="text-center text-gray-500 py-8">
                        暂无管理员工作量数据
                    </div>
                </div>

                <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><!-- 加载状态 -->
                    <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
                        <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                        <span class="text-gray-700">加载数据中...</span>
                    </div>
                </div>
            </div>
        </div> 
    


    </div>
    <PageFoot></PageFoot>
</template>
<script>
    import PageHead from './PageHead.vue'
    import PageFoot from './PageFoot.vue'
    import axios from 'axios'
    export default {
        name: 'StatPage',
        components: {
            PageHead,
            PageFoot
        },
        data(){
            return {
                username:localStorage.getItem('username'),
                role: localStorage.getItem('role'),
                loading: false,
                filters: {
                    from: this.getDefaultFromDate(),
                    to: new Date().toISOString().split('T')[0]
                },
                statistics: {
                    totals: {},
                    by_category: [],
                    daily_trend: [],
                    admin_workload: []
                }
            }
        },
        methods: {
            
            getDefaultFromDate() {
                const date = new Date();
                date.setDate(date.getDate() - 30); // 默认查询最近30天
                return date.toISOString().split('T')[0];
            },
            async fetchStatistics() {
                this.loading = true;
                try {
                    const token = localStorage.getItem('access_token');
                    const params = {};
        
                    if (this.filters.from) params.from = this.filters.from;
                    if (this.filters.to) params.to = this.filters.to;

                    const response = await axios.get('http://46.203.124.16:8080/api/v1/admin/stats', {
                        params,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('统计数据:', response.data);
                    this.statistics = response.data;
                } catch (error) {
                    console.error('获取统计数据失败:', error);
                    if (error.response?.status === 403) {
                        alert('权限不足，无法访问统计数据');
                    } else {
                        alert('获取数据失败，请检查网络连接');
                    }
                } finally {
                    this.loading = false;
                }
            },

            formatDate(dateString) {
                return new Date(dateString).toLocaleDateString('zh-CN');
            },

            calculatePercentage(count) {
                if (!this.statistics.daily_trend || this.statistics.daily_trend.length === 0) return 0;
      
                const maxCount = Math.max(...this.statistics.daily_trend.map(t => t.count));
                return maxCount > 0 ? (count / maxCount) * 100 : 0;
            },

            calculateAdminPercentage(ticketsHandled) {
                if (!this.statistics.admin_workload || this.statistics.admin_workload.length === 0) return 0;
      
                const totalTickets = this.statistics.admin_workload.reduce((sum, admin) => sum + admin.tickets_handled, 0);
                return totalTickets > 0 ? Math.round((ticketsHandled / totalTickets) * 100) : 0;
            }
        }
    }
</script>