<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了，可以看主页的注释-->
        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                <hr>
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold">处理问题反馈</router-link>
                <hr>
                <router-link to="/statpage" class="py-4 my-2 text-center font-semibold">大屏统计显示</router-link>
                <hr>
                <router-link to="/cannedreply" class="py-4 my-2 text-center font-semibold">预设反馈信息</router-link>
                <hr>
                <router-link to="/handlesapmpage" class="py-4 my-2 text-center font-semibold">处理垃圾信息信息</router-link>
                <hr>
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    {{ Username }}
                </div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--这里显示用户信息，主要是邮箱和用户名-->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900 text-center">用户管理</h1>
                        <p class="text-gray-600 text-center">管理所有用户信息</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold mb-4">筛选条件</h2>
                        <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                        <select v-model="filters" class="w-full border border-gray-300 rounded-md px-3 py-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">全部用户</option>
                            <option value="STUDENT">学生</option>
                            <option value="ADMIN">管理员</option>
                            <option value="SUPER_ADMIN">超级管理员</option>
                        </select>
                        <div class="py-2">
                            <button @click="fetchUsers" class="px-4 py-2 bg-blue-600 text-white 
                                rounded-md hover:bg-blue-700">
                                应用筛选
                            </button>
                        </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50 w-full">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">电话</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 min-w-full">
                            <tr v-for="ticket in items" :key="ticket.id" class="hover:bg-gray-50 cursor-pointer">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">{{ ticket.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span  class="inline-flex items-center px-2.5 py-0.5 
                                        rounded-sm text-xs font-medium">
                                        {{ ticket.email }}
                                    </span>
                                </td>
                                <td  :class="getRoleClass(ticket.role)" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{  getRoleText(ticket.role) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ ticket.phone || '无' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button class="text-blue-600 hover:text-blue-900 mr-3" @click="upUserInformation(ticket.id)">
                                        修改</button>
                                    <button class="text-red-600 hover:text-red-900" @click="deleted(ticket.id)">
                                        删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="p-4 flex flex-row">
                        <div class="px-4">
                            <button class="w-24 h-12 bg-green-500 rounded px-2 text-white
                            hover:bg-green-700 hover:text-black" @click="adduser()">
                                添加
                            </button>
                        </div>
                    </div>
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
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="upuserimformation"><!--修改用户信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold">修改用户信息</h2>
            <hr>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-4">用户信息</h3>
                    <form @submit.prevent="updateUserimformation(userId)">
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="name">姓名</label>
                            <input 
                                type="text" 
                                v-model="updateuserimformation.name"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="email">邮箱</label>
                            <input :disabled="true"
                                type="email"
                                v-model="updateuserimformation.email"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="password">学院</label>
                            <input 
                                type="text"
                                v-model="updateuserimformation.dept"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="password">电话</label>
                            <input 
                                type="text"
                                v-model="updateuserimformation.phone"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2">角色</label>
                            <select v-model="updateuserimformation.role" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">请选择用户角色</option>
                                <option value="STUDENT">学生</option>
                                <option value="ADMIN">管理员</option>
                                <option value="SUPER_ADMIN">超级管理员</option>
                        </select>
                        </div>
                        <div class="mb-4">
                                <label class="block text-gray-700 mb-2" for="email">角色</label>
                                <input type="radio" value="true" v-model="updateuserimformation.allowemail">是</input>
                                <input type="radio" value="false" v-model="updateuserimformation.allowemail">否</input>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button 
                                type="button" @click="upuserimformation=false"
                                class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                                hover:bg-gray-400 transition">
                                取消
                            </button>
                            <button 
                                type="submit"
                                class="bg-green-500 text-white py-2 px-4 rounded
                                hover:bg-green-600 transition">
                                修改 
                            </button>
                        </div>
                        <span v-if="completetime" class="text-green-500">操作成功，时间: {{ formatDate(completetime) }}</span>
                    </form>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="add"><!--添加用户弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold">添加用户</h2>
            <hr>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-4">用户信息</h3>
                    <form @submit.prevent="addnewuser">
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="name">姓名</label>
                            <input 
                                type="text" 
                                v-model="newUser.name"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="email">邮箱</label>
                            <input 
                                type="email"
                                v-model="newUser.email"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="password">密码</label>
                            <input 
                                type="password"
                                v-model="newUser.password"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="password">请再次确认密码</label>
                            <input 
                                type="password"
                                v-model="password_confirmation"
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2" for="email">角色</label>
                            <select v-model="newUser.role" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">请选择用户角色</option>
                                <option value="STUDENT">学生</option>
                                <option value="ADMIN">管理员</option>
                                <option value="SUPER_ADMIN">超级管理员</option>
                        </select>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button 
                                type="button" @click="add=false"
                                class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                                hover:bg-gray-400 transition">
                                取消
                            </button>
                            <button 
                                type="submit"
                                class="bg-green-500 text-white py-2 px-4 rounded
                                hover:bg-green-600 transition" @click="addnewuser()">
                                提交
                            </button>
                        </div>
                        <span v-if="completetime" class="text-green-500">操作成功，时间: {{ formatDate(completetime) }}</span>
                    </form>
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

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="confirmdelete"><!--确认删除弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center py-2">确认删除？<hr></div>
                <div class="text-gray-500 text-center">删除后该用户将无法登录系统，且无法恢复，请谨慎操作</div>
                <div v-if="userid === deleteid" class="text-gray-500 text-center">你删除的是自己喵，你真的要这么做吗</div>
                <div class="flex items-center justify-center py-2">
                    <div class="px-2">
                        <button type="button" @click="confirmdelete=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                        hover:bg-gray-400 transition">
                        返回</button>
                    </div>
                    <button type="button" @click="deleteUser(deleteid)" class="bg-red-500 text-white py-2 px-4 rounded 
                    hover:bg-red-600 transition">
                    确认删除</button>
                </div>
            </div>
        </div>

        <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0 h-auto">JHWL-Trial-8制作
        </footer><!--脚标-->
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    import axios from 'axios';
    export default{
        components:{
            PageHead
        },
        data() {
            return {
                items : [],
                change:false,
                newUser: {
                    name: '',
                    email: '',
                    role: '',
                    password: '',
                },
                add:false,
                password_confirmation: '',
                Username:localStorage.getItem('username'),
                pagination: {//分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                iserror: false,
                errormessages: '' ,
                loading: false,
                filters: '',
                completetime: '',
                upuserimformation:false,
                userId: null,
                updateuserimformation:{
                    email: '',
                    name: '',
                    role: '',
                    dept: '',
                    phone: '',
                    allowemail:true
                },
                confirmdelete: false,
                deleteid:null,
                userid:parseInt(localStorage.getItem('id'))
            }
        },
        computed: {
            queryParams() {// 查询参数
                const params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size
                }
                if (this.filters) params.role = this.filters
                return params
            }
        },
        methods:{
            deleted(id){
                this.deleteid=id
                this.confirmdelete=true
            },
            async deleteUser(id) {
                this.loading = true
                this.iserror = false
                await axios.delete(`http://46.203.124.16:8080/api/v1/users/${id}`)
                if(id==this.userid){//如果删除的是自己的账号，清除本地存储并跳转到登录页
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    this.$router.push('/')
                }
                this.confirmdelete=false
                this.fetchUsers()
            },
            async updateUserimformation(id){//更新用户信息
                this.completetime = '';
                this.iserror = false;
                try{
                    const response = await axios.put(`http://46.203.124.16:8080/api/v1/users/${id}`, {
                        email: this.updateuserimformation.email,
                        name: this.updateuserimformation.name,
                        role: this.updateuserimformation.role,
                        dept: this.updateuserimformation.dept,
                        phone: this.updateuserimformation.phone,
                        allow_email: this.updateuserimformation.allowemail,
                    })
                    if(id==this.userid){//如果修改的是自己的信息，更新本地存储的用户名
                        localStorage.setItem('username', this.updateuserimformation.name)
                        this.Username=this.updateuserimformation.name
                    }
                    this.completetime = response.data.created_at;
                    this.newMessageBody = '';
                    this.title = '';
                    this.upUserInformation(id);
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            async upUserInformation(id){//打开并获取用户信息
                this.userId = id
                this.upuserimformation = true
                try {
                    const response = await axios.get(`http://46.203.124.16:8080/api/v1/users/${id}`)
                    const user = response.data
                    this.updateuserimformation.email = user.email
                    this.updateuserimformation.name = user.name
                    this.updateuserimformation.role = user.role
                    this.updateuserimformation.dept = user.dept
                    this.updateuserimformation.phone = user.phone
                    this.updateuserimformation.allowemail = user.allow_email
                }
                catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            async addnewuser(){//添加新用户
                if(!this.newUser.role) {
                    this.iserror = true
                    this.errormessages = '角色不能为空'
                    return
                }
                if(this.newUser.password.length < 6) {
                    this.iserror = true
                    this.errormessages = '密码长度不能小于6位'
                    return
                }
                if(this.newUser.password !== this.password_confirmation) {
                    this.iserror = true
                    this.errormessages = '两次输入的密码不一致'
                    return
                }
                try {
                    const response = await axios.post('http://46.203.124.16:8080/api/v1/users',
                        this.newUser)
                    this.iserror = false
                    this.errormessages = ''
                    this.completetime = response.data.created_at
                    this.newUser = {
                        name: '',
                        email: '',
                        role: '',
                        password: '',
                    }
                    this.password_confirmation = ''
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            async fetchUsers() {//获取用户列表
                this.iserror = false
                this.loading = true
                try {
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/users',{
                        params: this.queryParams
                    })
                    // response.data 包含 items, page, page_size, total
                    this.items = response.data.items
                    this.pagination.page = response.data.page
                    this.pagination.page_size = response.data.page_size
                    this.pagination.total = response.data.total
                    this.loading = false
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },
            adduser(){//添加用户
                this.add=true
            },
            prevPage() {//上一页
                if (this.pagination.page > 1) {
                    this.pagination.page--
                    this.fetchUsers()
                }
            },
            nextPage() {//下一页
                if (this.pagination.page < Math.ceil(this.pagination.total / this.pagination.page_size)) {
                    this.pagination.page++
                    this.fetchUsers()
                }
            },
            getRoleText(role) {//角色颜色
                const statusMap = {
                    'ADMIN': '管理员',
                    'STUDENT': '学生',
                    'SUPER_ADMIN': '超级管理员',
                }
                return statusMap[role] || role
            },
            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleString('zh-CN')
            },
            getRoleClass(role) {//角色颜色
                const statusMap = {
                    'ADMIN': 'text-blue-600',
                    'STUDENT': 'text-green-600',
                    'SUPER_ADMIN': 'text-red-600',
                }
                return statusMap[role]
            },
        },
        mounted() {
            this.fetchUsers()
        },
    }
</script>