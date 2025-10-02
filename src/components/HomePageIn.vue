<template><!--与上一个相似，只是边栏可以页面跳转-->
    <div class="h-full w-full bg-gray-50 flex flex-col">
        <PageHead></PageHead>
        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
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
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                    <div class=" font-semibold text-black text-center p-2">我的反馈记录 (共{{ total }}条)<hr></div>
                    <div class="ticket-list">
                        <div v-for="ticket in items" :key="ticket.id" class="ticket-item rounded p-4 mb-3">
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
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div v-if="items.length === 0" class="text-center py-4 text-lg">暂无反馈记录</div>
                </div><!--主体内容，反馈的历史记录及通知-->
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center">获取历史记录失败！</div>
                <hr>
                <div class="text-gray-500 text-center">{{ errormessages }}</div>
                <button 
                    type="button" @click="iserror=false"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回
                </button>
            </div>
        </div>
        <PageFoot></PageFoot>
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';
    import PageHead from './PageHead.vue';
    import axios from 'axios';
    export default{
        data(){
            return{
                username:localStorage.getItem('username'),//读取用户信息及身份
                role:localStorage.getItem('role'),
                iserror:false,
                errormessages:'',
                items: [], // 工单列表数据
                total: 0,  // 总条数
                page: 1,
                page_size: 20
            };
        },
        components:{
            PageFoot,//脚标导入，虽然只有一行但还是想这么写
            PageHead
        },
        methods:{
            getStatusText(status) {
                const statusMap = {
                    'NEW': '新建',
                    'CLAIMED': '已认领',
                    'IN_PROGRESS': '处理中',
                    'RESOLVED': '已解决',
                    'CLOSED': '已关闭'
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
                        params: {
                            page: this.page,
                            page_size: this.page_size
                        },
                    })
                    // response.data 包含 items, page, page_size, total
                    this.items = response.data.items
                    this.total = response.data.total
                    this.page = response.data.page
                    this.page_size = response.data.page_size
        
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response.data.message
                }
            }
        },
        mounted() {
            this.fetchTickets()
        }
    }
</script>