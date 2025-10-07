<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead><!--页面头-->
        <div class="flex-1 flex overflow-hidden"><!--下方侧栏和主题内容是水平排列的，因此-->
            <div class=" p-10 w-80"><!--侧边栏-->
                <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/user">个人信息</RouterLink>
                    <hr>
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/feedbackpage">处理问题反馈</RouterLink>
                    <hr>
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/cannedreply">预设反馈信息</RouterLink>
                    <hr>
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/controlluser">用户账号管理</RouterLink>
                    <hr>
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/statpage">大屏统计显示</RouterLink>
                    <hr>
                    <div class="w-auto rounded-md p-4"><!--信息显示-->
                    <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex"><!--用户头像-->
                    </div>
                    <div class="py-4 my-2 text-center font-semibold"><!--用户名称-->
                        {{username}}
                    </div>
                </div>
            </div>
            <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg items-center"><!--主体内容显示示例-->
                    <div class="flex-row col-span-1 md:col-span-2 lg:col-span-1 items-end">
                        <!-- 表格头部 -->
                        <div class="px-6 py-4 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h2 class="text-lg font-semibold">垃圾信息审核</h2>
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
                                    <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50 cursor-pointer">
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
                                                <span v-else class="inline-flex items-center px-2 py-1 
                                                    rounded-sm text-xs font-medium bg-gray-100 text-gray-800">用户:{{ ticket.id }}</span>
                                                <span v-if="ticket.image_ids" class="inline-flex items-center px-2 py-1 
                                                    rounded-sm text-xs font-medium bg-gray-100 text-gray-800">包含图片</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="getStatusClasses(ticket.status)" class="inline-flex items-center px-2.5 py-0.5 
                                        rounded-sm text-xs font-medium">{{ getStatusText(ticket.status) }}</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ ticket.category }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDate(ticket.created_at) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-green-600 hover:text-green-900" @click="ticket_detail(ticket.id)">
                                            查看
                                        </button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="details"><!--详细信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div v-if="loading" class="text-xl text-gray-500 text-center">加载中<hr></div>
                <div class=" font-semibold text-center text-lg py-2">反馈详情</div>
                <hr>
                <div class="mt-4" v-if="complete">
                    <h3 class="text-lg mb-2 text-center">{{ ticket_details.title.substring(0, 10) }}</h3>
                    <p class="text-gray-600 mb-3"><strong>问题描述:</strong>{{ ticket_details.content.substring(0, 10) }}</p>
                    <div class="flex flex-wrap gap-2 mb-2">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {{ ticket_details.category }}
                            </span>
                            <span :class="getStatusClasses(ticket_details.status)" class="px-2 py-1 text-xs rounded">
                                {{ getStatusText(ticket_details.status) }}
                            </span>
                            <span v-if="ticket_details.is_urgent" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                紧急
                            </span>
                            <span v-if="ticket_details.is_anonymous" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                匿名
                            </span>
                            <span v-else class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                用户:{{ ticket_details.id }}
                            </span>
                            <span v-if="!ticket_details.assigned_admin_id" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                未认领
                            </span>
                    </div>

                    <div v-if="ticket_details.image_ids && ticket_details.image_ids.length > 0" class="mb-6"><!--附件图片-->
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">附件图片</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="imageId in ticket_details.image_ids" :key="imageId"class="relative group">
                                <!-- 使用图片显示组件 -->
                                <ImageDisplay :image-id="imageId" />
                            </div>
                        </div>
                    </div>

                    <div class="text-gray-500 text-sm">创建时间: {{ formatDate(ticket_details.created_at) }}</div>
                    <div class="text-gray-500 text-sm">最后更新时间: {{ formatDate(ticket_details.updated_at) }}</div>

                    <div v-if="ticket_details.assigned_admin_id" class="mb-6"><!--处理信息-->
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">处理信息</h2>
                        <div class="flex items-center space-x-4">
                            <div class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                负责人: 管理员 {{ ticket_details.assigned_admin_id }}
                            </div>
                            <div class="text-gray-500 text-sm">
                                认领时间: {{ formatDate(ticket_details.claimed_at) }}
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 mb-6" v-if="ticket_details.messages && ticket_details.messages.length > 0"><!--沟通信息-->
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">沟通记录</h2>
                        <div class="space-y-4">
                            <div v-for="message in ticket_details.messages" :key="message.id"
                                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                                <div class="flex justify-between items-center mb-2" v-if="!message.is_internal_note">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium text-gray-700">
                                            {{ message.is_internal_note ? '管理员' : '用户' }} {{ message.sender_user_id }}
                                        </span>
                                        <span  class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs" 
                                            v-if="message.is_internal_note">内部备注</span>
                                    </div>
                                    <span class="text-gray-500 text-sm">{{ formatDate(message.created_at) }}</span>
                                </div>
                                <p class="text-gray-600">{{ message.body }}</p>
                            </div>
                        </div>
                    </div>
                    <p v-else>暂无回复</p>
                </div>

                <div class="flex justify-between mt-4" v-if="ticket_details.status==='SPAM_PENDING'">

                    <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 
                    rounded-lg transition-colors duration-300" @click="approvespam(ticket_details.id)">
                        标记为垃圾信息
                    </button>
                    <div class="px-2">
                        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 
                            rounded-lg transition-colors duration-300" @click="rejectspam(ticket_details.id)">
                            拒绝标记为垃圾信息
                        </button>
                    </div>

                </div>

                <div class="flex items-center justify-center py-2">
                    <button type="button" @click="details=false;fetchTickets" class="bg-gray-300 text-gray-700 py-2 px-4 rounded  
                    hover:bg-gray-400 transition">返回</button>
                </div>
            </div>
        </div>
    
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror"><!--错误信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center py-2">操作失败！<hr></div>
                <div class="text-gray-500 text-center">{{ errormessages }}</div>
                <div class="flex items-center justify-center py-2">
                    <button 
                    type="button" @click="iserror=false;fetchTickets"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回
                    </button>
                </div>
            </div>
        </div>

    <PageFoot></PageFoot>
</template>
<script>
    import PageHead from './PageHead.vue';
    import PageFoot from './PageFoot.vue';
    import ImageDisplay from './ImageDisplay.vue';
    import axios from 'axios'
    export default{
        name:'HandleSpamPage',
        components:{
            PageFoot,
            PageHead,
            ImageDisplay
        },
        data(){
            return{
                username:localStorage.getItem('username'),
                tickets:[],
                pagination: {//分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                loading:false,
                details:false,
                completetime:'',
                ticket_details:{},
                complete:false,
                iserror:false,
                errormessages:''
            }
        },
        computed:{
            queryParams() {// 查询参数
                const params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size
                }
                params.status="SPAM_PENDING"
                return params
            },
        },
        methods:{
            async approvespam(id){
                this.completetime = ''
                this.iserror=false
                this.errormessages=''
                try{
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${id}/spam-review`,{
                        action:'approve'
                    })
                    this.iserror=false
                    this.errormessages=''
                    this.ticket_detail(id)
                }catch(error){
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            async rejectspam(id){
                this.completetime = ''
                this.iserror=false
                this.errormessages=''
                try{
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${id}/spam-review`,{
                        action:'reject'
                    })
                    this.iserror=false
                    this.errormessages=''
                    this.ticket_detail(id)
                }catch(error){
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            details_show(){//显示详细信息
                this.details=true
            },
            async ticket_detail(id){//获取详细信息
                this.details_show()
                this.completetime = ''
                this.ticket_details = {}
                this.complete = false
                try{
                    this.loading = true
                    const response = await axios.get(`http://46.203.124.16:8080/api/v1/tickets/${id}`)
                    this.ticket_details = response.data
                    this.loading = false
                    this.complete = true
                }
                catch(error){
                    this.details = false
                    this.loading = false
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            prevPage() {//上一页
                if (this.pagination.page > 1) {
                    this.pagination.page--
                    this.fetchTickets()
                }
            },
            nextPage() {//下一页
                if (this.pagination.page < Math.ceil(this.pagination.total / this.pagination.page_size)) {
                    this.pagination.page++
                    this.fetchTickets()
                }
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
                    'CLOSED': '已关闭',
                    'SPAM_PENDING': '超管审核中',
                    'SPAM_CONFIRMED': '垃圾信息',
                    'SPAM_REJECTED': '非垃圾信息'
                }
                return statusMap[status] || status
            },
            getStatusClasses(status) {//获取状态类
                const classMap = {
                    'NEW': 'bg-blue-100 text-blue-800',
                    'CLAIMED': 'bg-yellow-100 text-yellow-800',
                    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
                    'RESOLVED': 'bg-green-100 text-green-800',
                    'CLOSED': 'bg-gray-100 text-gray-800',
                    'SPAM_CONFIRMED':'bg-yellow-100 text-gray-800'
                }
                return classMap[status] || 'bg-gray-100 text-gray-800'
            }, 
            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleDateString('zh-CN')
            },
        },
        mounted(){//每次进入获取一次工单列表
            this.fetchTickets()
        },
    }
</script>