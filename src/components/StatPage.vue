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