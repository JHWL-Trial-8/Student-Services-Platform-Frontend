<template><!--与上一个相似，只是边栏可以页面跳转-->
    <div class="h-full w-full bg-gray-50 flex flex-col">
        <PageHead></PageHead>
        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80">
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg"><!--侧边栏-->
                <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                <!--跳转到“/user”个人信息界面-->
                <hr>
                <router-link to="/up" class="py-4 my-2 text-center font-semibold">提交问题反馈</router-link>
                <!--跳转到“/up”上传问题反馈界面-->
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex"><!--用户头像-->
                </div>
                <div class="py-4 my-2 text-center font-semibold"><!--用户名称-->
                    {{username}}
                </div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--主体内容，反馈的历史记录及通知-->
                    <div class=" font-semibold text-black text-center p-2">我的反馈记录 (共{{ pagination.total }}条)<hr></div>
                        <div v-for="ticket in items" :key="ticket.id" class="rounded p-4 mb-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold mb-2">{{ ticket.title }}</h3>
                                    <p class="text-gray-600 mb-3">{{ ticket.content }}</p>
                                    <div class="flex flex-wrap gap-2 mb-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {{ ticket.category }}
                                        </span>
                                        <span :class="getStatusClass(ticket.status)" class="px-2 py-1 text-xs rounded">
                                            {{ getStatusText(ticket.status) }}
                                        </span>
                                        <span v-if="ticket.is_urgent" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                            紧急
                                        </span>
                                        <span v-if="ticket.is_anonymous" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            匿名
                                        </span>
                                    </div>
                                </div>
          
                                <div class="text-right text-sm text-gray-500 ml-4">
                                    <div>{{ formatDate(ticket.created_at) }}</div>
                                    <div>工单ID: {{ ticket.id }}</div>
                                    <button @click="ticket_detail(ticket.id)">>详细信息</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                    <div v-if="items.length === 0" class="text-center py-4 text-lg">暂无反馈记录</div>
                </div><!--主体内容，反馈的历史记录及通知-->
                <div v-if="!loading && items.length > 0" class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
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

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="details"><!--详细信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div v-if="loading" class="text-xl text-gray-500 text-center">加载中<hr></div>
                <div class=" font-semibold text-center text-lg py-2">反馈详情</div>
                <hr>
                <div class="mt-4" v-if="complete">
                    <h3 class="text-lg mb-2 text-center">{{ ticket_details.title }}</h3>
                    <p class="text-gray-600 mb-3"><strong>问题描述:</strong>{{ ticket_details.content }}</p>
                    <div class="flex flex-wrap gap-2 mb-2">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {{ ticket_details.category }}
                            </span>
                            <span :class="getStatusClass(ticket_details.status)" class="px-2 py-1 text-xs rounded">
                                {{ getStatusText(ticket_details.status) }}
                            </span>
                            <span v-if="ticket_details.is_urgent" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                紧急
                            </span>
                            <span v-if="ticket_details.is_anonymous" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                匿名
                            </span>
                            <span v-if="!ticket_details.assigned_admin_id" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                未处理
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

                <div class="bg-white rounded-lg shadow-md p-6 mb-6" v-if="ticket_details.rating.id"><!--评分信息-->
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">评分</h2>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <div class="flex mr-4">
                                <span v-for="n in 5" :key="n" class="text-2xl":class="n <= ticket_details.rating.stars ? 
                                'text-yellow-500' : 'text-gray-300'">★</span>
                            </div>
                            <span class="text-lg font-medium text-gray-700">{{ ticket_details.rating.stars }} 星</span>
                        </div>
                        <p class="text-gray-600 mb-2">{{ ticket_details.rating.comment }}</p>
                        <p class="text-gray-500 text-sm">评分时间: {{ formatDate(ticket_details.rating.created_at) }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6"><!--操作区域-->
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">操作</h2>
                    <div class="flex space-x-4">
                        <button v-if="ticket_details.status === 'RESOLVED' && !ticket_details.rating.id" @click="giverate"
                            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                            评价服务
                        </button>
                        <button @click="addMessage = true"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                            添加回复
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-center py-2">
                    <button 
                    type="button" @click="details=false"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回
                    </button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="showRatingDialog"><!--评分弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">服务评价</h3>
    
                <!-- 星级评分部分 -->
                <div class="flex items-center justify-between mb-6">
                    <label class="text-gray-700 font-medium flex-shrink-0 mr-4">总体满意度：</label>
                    <div class="flex items-center space-x-1">
                        <button v-for="star in 5":key="star" type="button" class="text-2xl focus:outline-none":class="[star <= currentRating ? 
                        'text-yellow-400 transform scale-110' : 'text-gray-300 hover:text-yellow-300']" 
                        @click="setRating(star)">★</button>
                    </div>
                    <span class="text-gray-600 font-semibold ml-4 min-w-12">{{ currentRating }}/5</span>
                </div>

                <!-- 详细评价部分 -->
                <div v-if="currentRating > 0" class="mb-6">
                    <label class="block text-gray-700 font-medium mb-2">详细评价（可选）：</label>
                    <textarea v-model="feedbackText" placeholder="请分享您的具体感受和建议..." rows="4"
                        class="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent "></textarea>
                </div>

                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="showRatingDialog=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                    <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                        hover:bg-blue-600 transition" @click="uploadrating">{{ isSubmitting ? '提交中...' : '提交评价' }}
                    </button>
                </div>

                <div v-if="showsuccessMessage" class="mt-4 text-green-500">评价提交成功!感谢您的反馈!</div>

            </div>

        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="addMessage"><!--添加回复弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" font-semibold text-center text-lg py-2">添加回复</div>
                <hr>
                <div class="mt-4">
                    <textarea v-model="newMessageBody" rows="6" class="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="请输入您的回复内容..."></textarea>
                </div>
                <span v-if="addingmessage" class="text-blue-500">正在上传回复...</span>
                <span v-if="completetime" class="text-green-500">回复成功，时间: {{ formatDate(completetime) }}</span>
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="addMessage=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                    <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                        hover:bg-blue-600 transition" @click="addfeedbackmessage">
                    提交</button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror"><!--错误信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center py-2">操作失败！<hr></div>
                <div class="text-gray-500 text-center">{{ errormessages }}</div>
                <div class="flex items-center justify-center py-2">
                    <button type="button" @click="iserror=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回</button>
                </div>
            </div>
        </div>

        <PageFoot></PageFoot>
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';
    import PageHead from './PageHead.vue';
    import ImageDisplay from './ImageDisplay.vue'
    import axios from 'axios';
    export default{
        data(){
            return{
                username:localStorage.getItem('username'),//读取用户信息及身份
                role:localStorage.getItem('role'),
                iserror:false,
                errormessages:'',
                items: [], // 工单列表数据
                details:false,
                loading:false,
                ticket_details:{},
                complete:false,
                showRatingDialog: false,
                newMessageBody: '',
                addMessage:false,
                addingmessage:false,
                completetime:'',
                pagination: {//分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                currentRating: 0,
                feedbackText: '',
                isSubmitting: false,
                showsuccessMessage: false,
            };
        },
        computed: {
            queryParams() {// 查询参数
                const params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size
                }
                return params
            }
        },
        components:{
            PageFoot,//脚标导入，虽然只有一行但还是想这么写
            PageHead,
            ImageDisplay//加载图片的组件，但是是抄AI的
        },
        methods:{
            async uploadrating(){//上传评分
                try{
                    this.isSubmitting = true
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/rate`, {
                        stars: this.currentRating,
                        comment: this.feedbackText
                    })
                    this.showsuccessMessage = true
                    this.isSubmitting = false
                } catch(error){
                    this.iserror = true
                    this.errormessages = error.response?.data?.error || '请检查网络连接'
                }
            },
            giverate(){//给工单评分
                this.isSubmitting = false
                this.showsuccessMessage = false
                this.feedbackText = ''
                this.currentRating = 0
                this.showRatingDialog = true
            },
            setRating(rating) {//设置评分
                this.currentRating = rating;
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
            async addfeedbackmessage(){
                this.addingmessage = true
                this.completetime = ''
                try{
                    const response = await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/messages`, {
                        body: this.newMessageBody,
                    })
                    this.completetime = response.data.created_at
                    this.newMessageBody = ''
                    this.addingmessage = false
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                    this.addingmessage = false
                }
            },
            details_show(){
                this.details=true
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

            getStatusClass(status) {
                const classMap = {
                    'NEW': 'bg-blue-100 text-blue-800',
                    'CLAIMED': 'bg-yellow-100 text-yellow-800',
                    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
                    'RESOLVED': 'bg-green-100 text-green-800',
                    'CLOSED': 'bg-gray-100 text-gray-800'
                }
                return classMap[status] || 'bg-gray-100 text-gray-800'
            },

            formatDate(dateString) {
                return new Date(dateString).toLocaleString('zh-CN')
            },

            async fetchTickets() {
                try {
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/tickets',{
                        params: this.queryParams
                    })
                    // response.data 包含 items, page, page_size, total
                    this.items = response.data.items
                    this.pagination.page = response.data.page
                    this.pagination.page_size = response.data.page_size
                    this.pagination.total = response.data.total
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            async ticket_detail(id){//获取详细信息
                this.details_show()
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
        },
        mounted() {//页面加载时获取历史记录
            this.fetchTickets()
        }
    }
</script>