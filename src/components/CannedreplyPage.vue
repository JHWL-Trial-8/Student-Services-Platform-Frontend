<template>
    <PageHead></PageHead>
    <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80">
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg"><!--侧边栏-->
                <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                <!--跳转到“/user”个人信息界面-->
                <hr>
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold">处理问题反馈</router-link>
                <hr>
                <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold" v-if="role === 'SUPER_ADMIN'">用户账号管理</router-link>
                <hr v-if="role === 'SUPER_ADMIN'">
                <!--跳转到“/up”上传问题反馈界面-->
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex"><!--用户头像-->
                </div>
                <div class="py-4 my-2 text-center font-semibold"><!--用户名称-->
                    {{username}}
                </div>
            </div>
        </div>

        <div class="flex-1 p-10"><!--内容区域-->
            <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                <div v-if="loading" class="p-8 text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p class="mt-2 text-gray-600">加载中...</p>
                </div>
                <div class=" font-semibold text-black text-center p-2">预设反馈信息 (共{{ pagination.total }}条)<hr></div>
                <div v-for="ticket in items" :key="ticket.id" class="rounded p-4 mb-3">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold mb-2">{{ ticket.title }}</h3>
                            <p class="text-gray-600 mb-3">{{ ticket.body }}</p>
                            <div class="flex flex-wrap gap-2 mb-2">
                                <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                    管理员id:{{ ticket.admin_user_id }}
                                </span>
                            </div>
                        </div>
                        <div class="text-right text-sm text-gray-500 ml-4">
                            <div>{{ formatDate(ticket.created_at) }}</div>
                            <div>预设信息ID: {{ ticket.id }}</div>
                            <button class="text-gray-500 hover:text-gray-700" @click="editMessage(ticket.id)">修改</button>
                            <br>
                            <button class="text-red-500 hover:text-red-700" @click="deleteMessage(ticket.id)">删除</button>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="flex justify-between mt-4 items-center p-2">
                    <button  class="px-4 py-2 border border-gray-300
                        rounded-md text-gray-700 hover:bg-blue-50" @click="addMessage=true">
                        添加预设反馈 
                    </button>
                </div>
                <div v-if="items.length === 0" class="text-center py-4 text-lg">暂无反馈记录</div>
                <div  class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
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

    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="addMessage"><!--添加预设信息弹窗-->
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class=" font-semibold text-center text-lg py-2">添加预设信息</div>
            <hr>
            <div class="mt-4">
                <input type="text" v-model="title" placeholder="请输入预设信息标题..." class="border border-gray-300 w-full rounded-lg p-2">
            </div>
            <div class="mt-4">
                <textarea v-model="newMessageBody" rows="6" class="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="请输入预设信息内容..."></textarea>
            </div>
            <span v-if="addingmessage" class="text-blue-500">正在上传预设信息...</span>
            <span v-if="completetime" class="text-green-500">上传预设信息成功，时间: {{ formatDate(completetime) }}</span>
            <div class="flex items-center justify-center space-x-4 mt-4">
                <button type="button" @click="addMessage=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                hover:bg-gray-400 transition">取消</button>
                <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                     hover:bg-blue-600 transition" @click="addcannedreply">
                提交</button>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="update"><!--修改预设信息弹窗-->
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class=" font-semibold text-center text-lg py-2">修改预设信息</div>
            <hr>
            <div class="mt-4">
                <input type="text" v-model="title" placeholder="请输入预设信息标题..." class="border border-gray-300 w-full rounded-lg p-2">
            </div>
            <div class="mt-4">
                <textarea v-model="newMessageBody" rows="6" class="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="请输入预设信息内容..."></textarea>
            </div>
            <span v-if="addingmessage" class="text-blue-500">正在修改预设信息...</span>
            <span v-if="completetime" class="text-green-500">修改预设信息成功，时间: {{ formatDate(completetime) }}</span>
            <div class="flex items-center justify-center space-x-4 mt-4">
                <button type="button" @click="update=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                hover:bg-gray-400 transition">取消</button>
                <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                     hover:bg-blue-600 transition" @click="updateCannedReply(messageid)">
                提交</button>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="warning"><!--删除预设信息弹窗-->
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class=" font-semibold text-center text-lg py-2">确认删除？</div>
            <div class="text-center py-2 text-gray-400">此操作不可逆！</div>
            <hr>
            <div class="flex items-center justify-center space-x-4 mt-4">
                <button type="button" @click="warning=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                hover:bg-gray-400 transition">取消</button>
                <button type="button" class="bg-green-500 text-white py-2 px-4 rounded 
                     hover:bg-blue-600 transition" @click="deleteCannedReply(messageid)">
                确认</button>
            </div>
        </div>
    </div>

    <PageFoot></PageFoot>
</template>
<script>
    import PageHead from './PageHead.vue';
    import PageFoot from './PageFoot.vue';
    import axios from 'axios';
    export default {
        name: 'CannedReplyPage',
        components: {
            PageHead,
            PageFoot
        },
        data() {
            return {
                username: localStorage.getItem('username'),
                role: localStorage.getItem('role'),
                items: [],
                iserror: false,
                errormessages: '',
                addMessage: false,
                newMessageBody: '',
                addingmessage: false,
                completetime: '',
                title:'',
                loading:false,
                warning: false,
                pagination: {//分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                update:false,
                messageid:0,
            }
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
        methods: {
            deleteMessage(id){//删除预设信息
                this.messageid=id;
                this.warning=true;
            },
            async deleteCannedReply(id){//删除预设信息
                this.iserror = false;
                try{
                    await axios.delete(`http://46.203.124.16:8080/api/v1/canned-replies/${id}`)
                    this.fetchData(); // 刷新列表
                    this.warning=false;
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                } finally {
                    this.addingmessage = false
                }
            },
            editMessage(id){//编辑预设信息
                this.messageid=id;
                this.update=true;
                this.newMessageBody='';
                this.completetime = '';
                this.title='';
            },
            async updateCannedReply(id){//更新预设信息
                this.completetime = '';
                this.addingmessage = true;
                this.iserror = false;
                try{
                    const response = await axios.put(`http://46.203.124.16:8080/api/v1/canned-replies/${id}`, {
                        title: this.title,
                        body: this.newMessageBody,
                    })
                    this.completetime = response.data.created_at;
                    this.newMessageBody = '';
                    this.title = '';
                    this.addingmessage = false;
                    this.addMessage = false;
                    await this.fetchData(); // 刷新列表
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                    this.addingmessage = false
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
            async addcannedreply(){//添加预设信息
                this.addingmessage = true;
                this.iserror = false;
                this.completetime = '';
                if (!this.title.trim() || !this.newMessageBody.trim()) {
                    this.iserror = true;
                    this.errormessages = '标题和内容不能为空';
                    return;
                }
                try{
                    const response = await axios.post(`http://46.203.124.16:8080/api/v1/canned-replies`, {
                        title:this.title,
                        body: this.newMessageBody,
                    })
                    this.completetime = response.data.created_at;
                    this.newMessageBody = '';
                    this.title = '';
                    this.addingmessage = false;
                    this.addMessage = false;
                    await this.fetchData(); // 刷新列表
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                    this.addingmessage = false
                }
            },
            async fetchData() {//获取预设信息列表
                this.loading = true;
                try {
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/canned-replies',{
                        params: this.queryParams
                    })
                    // response.data 包含 items, page, page_size, total
                    this.items = response.data.items
                    this.pagination.total = response.data.total
                    this.pagination.page = response.data.page
                    this.pagination.page_size = response.data.page_size
                    this.loading = false
        
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },

            formatDate(dateString) {
                return new Date(dateString).toLocaleString('zh-CN')
            },
        },
        mounted() {//页面加载时获取历史记录
            this.fetchData();
        }
    }
</script>