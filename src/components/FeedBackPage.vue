<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了-->
        <div class="flex-1 flex overflow-hidden">
            <div class=" p-10 w-80"><!--侧边栏-->
                <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                    <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                    <hr>
                    <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold" v-if="role === 'SUPER_ADMIN'">用户账号管理</router-link>
                    <hr v-if="role === 'SUPER_ADMIN'">
                    <div class="w-auto rounded-md p-4"><!--信息显示-->
                    <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    {{ Username }}
                </div>
            </div>
            </div>
            <div class="flex-1 p-10">
                <div class="h-auto w-auto  rounded-lg shadow-lg"><!--主体内容，反馈的历史记录及通知-->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900 text-center">工单管理</h1>
                        <p class="text-gray-600 text-center">管理所有用户提交的反馈工单</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold mb-4">筛选条件</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <!-- 状态筛选 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                                <select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">全部状态</option>
                                    <option value="NEW">新建</option>
                                    <option value="CLAIMED">已认领</option>
                                    <option value="IN_PROGRESS">处理中</option>
                                    <option value="RESOLVED">已解决</option>
                                    <option value="CLOSED">已关闭</option>
                                </select>
                            </div>

                            <!-- 分类筛选 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
                                <select v-model="filters.category" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">全部分类</option>
                                    <option value="寝室用具">寝室用具</option>
                                    <option value="教室用具">教室用具</option>
                                    <option value="公共设施">公共设施</option>
                                    <option value="服务工作">服务工作</option>
                                    <option value="其他问题">其他问题</option>
                                </select>
                            </div>

                            <!-- 紧急程度 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">紧急程度</label>
                                <select v-model="filters.is_urgent" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option :value="null">全部</option>
                                    <option :value="true">仅紧急</option>
                                    <option :value="false">非紧急</option>
                                </select>
                            </div>

                            <!-- 对应管理员负责的工单 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">负责情况</label>
                                <select v-model="filters.assigned_to_me" class="w-full border border-gray-300 rounded-md 
                                    px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option :value="false">全部工单</option>
                                    <option :value="true">我负责的</option>
                                </select>
                            </div>
                            <!-- 操作按钮 -->
                            <div class="flex justify-between mt-4">
                                <button @click="resetFilters" class="px-4 py-2 border border-gray-300
                                    rounded-md text-gray-700 hover:bg-gray-50">
                                    重置筛选
                                </button>
                                <button @click="fetchTickets" class="px-4 py-2 bg-blue-600 text-white 
                                    rounded-md hover:bg-blue-700">
                                    应用筛选
                                </button>
                            </div>
                        </div>
                            <div class="flex-row col-span-1 md:col-span-2 lg:col-span-1 items-end">
                                <!-- 表格头部 -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex justify-between items-center">
                                        <h2 class="text-lg font-semibold">工单列表</h2>
                                        <div class="text-sm text-gray-600">
                                            显示 {{ tickets.length }} 条，共 {{ pagination.total }} 条
                                        </div>
                                    </div>
                                </div>

                                <!-- 加载状态 -->
                                <div v-if="loading" class="p-8 text-center">
                                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p class="mt-2 text-gray-600">加载中...</p>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50 w-full">
                                                <tr>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工单信息</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                                </tr>
                                            </thead>
                                                <tbody class="bg-white divide-y divide-gray-200 min-w-full">
                                                    <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50 cursor-pointer"
                                                        @click="viewTicket(ticket.id)">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div>
                                                                    <div class="text-sm font-medium text-gray-900">{{ ticket.title }}</div>
                                                                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ ticket.content }}</div>
                                                                    <div class="flex items-center mt-1 space-x-2">
                                                                        <span v-if="ticket.is_urgent" class="inline-flex items-center px-2 py-1 rounded-sm 
                                                                            text-xs font-medium bg-red-100 text-red-800">紧急</span>
                                                                        <span v-if="ticket.is_anonymous" class="inline-flex items-center px-2 py-1 
                                                                            rounded-sm text-xs font-medium bg-gray-100 text-gray-800">匿名</span>
                                                                        <span v-if="ticket.image_ids" class="inline-flex items-center px-2 py-1 
                                                                            rounded-sm text-xs font-medium bg-gray-100 text-gray-800">包含图片</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <span :class="getStatusClasses(ticket.status)" class="inline-flex items-center px-2.5 py-0.5 
                                                                rounded-sm text-xs font-medium">
                                                                {{ getStatusText(ticket.status) }}
                                                            </span>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {{ ticket.category }}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {{ formatDate(ticket.created_at) }}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button v-if="!ticket.assigned_admin_id && ticket.status === 'NEW'"
                                                                class="text-blue-600 hover:text-blue-900 mr-3">
                                                                认领
                                                            </button>
                                                            <button class="text-green-600 hover:text-green-900">
                                                                查看
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <!-- 分页 -->
                    <div v-if="!loading && tickets.length > 0" class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
                        <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-700">
                                第 {{ pagination.page }} 页，共 {{ Math.ceil(pagination.total / pagination.page_size) }} 页
                            </div>
                            <div class="flex space-x-2">
                                <button @click="prevPage" :disabled="pagination.page === 1" class="px-3 py-1 border border-gray-300 rounded-md
                                    text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    上一页
                                </button>
                                <button @click="nextPage" :disabled="pagination.page >= Math.ceil(pagination.total / pagination.page_size)"
                                    class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white 
                                    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    下一页
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="!loading && tickets.length === 0" class="p-8 text-center"><!--查找工单失败-->
                        <div class="text-5xl mb-4">📭</div>
                        <h3 class="text-lg font-medium text-gray-900 mb-1">暂无工单</h3>
                        <p class="text-gray-500">当前筛选条件下没有找到工单</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center py-2">获取历史记录失败！<hr></div>
                <div class="text-gray-500 text-center">{{ errormessages }}</div>
                <div class="flex items-center justify-center py-2">
                    <button 
                    type="button" @click="iserror=false"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回
                    </button>
                </div>
            </div>
        </div>
        <PageFoot/>
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    import axios from 'axios';
    import PageFoot from './PageFoot.vue';
    export default{
        components:{
            PageHead,
            PageFoot
        },
        data(){
            return{
                Username:localStorage.getItem('username'),
                role:localStorage.getItem('role'),
                tickets: [],//反馈记录
                loading: false,
                filters: {//筛选条件
                    status: '',
                    category: '',
                    is_urgent: null,
                    assigned_to_me: false,
                    search: ''
                },
                pagination: {//分页信息
                    page: 1,
                    page_size: 20,
                    total: 0
                },
                stats: {//统计信息
                    total: 0,
                    new: 0,
                    urgent: 0,
                    assigned_to_me: 0
                },
                iserror: false,
                errormessages: ''
            }
        },
        computed: {
            queryParams() {
                const params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size
                }

                // 添加筛选条件
                if (this.filters.status) params.status = this.filters.status
                if (this.filters.category) params.category = this.filters.category
                if (this.filters.is_urgent !== null) params.is_urgent = this.filters.is_urgent
                if (this.filters.assigned_to_me) params.assigned_to_me = true

                return params
            }
        },
        methods:{
            prevPage() {
                if (this.pagination.page > 1) {
                    this.pagination.page--
                    this.fetchTickets()
                }
            },

            nextPage() {
                if (this.pagination.page < Math.ceil(this.pagination.total / this.pagination.page_size)) {
                    this.pagination.page++
                    this.fetchTickets()
                }
            },
            async viewTicket(ticketId){
                // 这里可以添加查看工单的逻辑
            },
            async fetchTickets() {//获取反馈记录
                this.loading = true
                try {
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/tickets', {
                    params: this.queryParams,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                this.tickets = response.data.items || []
                this.pagination.total = response.data.total || 0

                // 更新统计信息（这里需要根据实际情况调整）
                //this.updateStats()

                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                } finally {
                    this.loading = false
                }
            },
            getStatusText(status) {//获取状态文本
                const statusMap = {
                    'NEW': '新建',
                    'CLAIMED': '已认领',
                    'IN_PROGRESS': '处理中',
                    'RESOLVED': '已解决',
                    'CLOSED': '已关闭'
                }
                return statusMap[status] || status
            },

            getStatusClasses(status) {//获取状态类
                const classMap = {
                    'NEW': 'bg-blue-100 text-blue-800',
                    'CLAIMED': 'bg-yellow-100 text-yellow-800',
                    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
                    'RESOLVED': 'bg-green-100 text-green-800',
                    'CLOSED': 'bg-gray-100 text-gray-800'
                }
                return classMap[status] || 'bg-gray-100 text-gray-800'
            }, 

            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleDateString('zh-CN')
            },

            resetFilters() {//重置筛选条件
                this.filters = {
                    status: '',
                    category: '',
                    is_urgent: null,
                    assigned_to_me: false,
                    search: ''
                }
                this.pagination.page = 1
                this.fetchTickets()
            },
        },
        mounted(){
            this.fetchTickets()
        },
        watch: {
            // 当分页参数变化时自动获取数据
            'pagination.page'() {
                this.fetchTickets()
            },
            'pagination.page_size'() {
                this.pagination.page = 1
                this.fetchTickets()
            }
        }
    }
</script>