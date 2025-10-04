<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead><!--页面头-->
        <div class="flex-1 flex overflow-hidden"><!--下方侧栏和主题内容是水平排列的，因此-->
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <RouterLink class="py-4 my-2 text-center font-semibold" to="/home" v-if="role === 'STUDENT'">反馈记录</RouterLink>
                <hr v-if="role === 'STUDENT'">
                <RouterLink class="py-4 my-2 text-center font-semibold" to="/up" v-if="role === 'STUDENT'">提交问题反馈</RouterLink><!--边栏内容示例，但是没有绑定页面跳转内容-->
                <hr v-if="role === 'STUDENT'"><!--分割线-->
                <RouterLink class="py-4 my-2 text-center font-semibold" to="/feedbackpage" v-if="role === 'ADMIN'">处理问题反馈</RouterLink>
                <hr v-if="role === 'ADMIN'"><!--管理员才显示-->
                <RouterLink class="py-4 my-2 text-center font-semibold" to="/cannedreply" v-if="role === 'ADMIN'|| role === 'SUPER_ADMIN'">预设反馈信息</RouterLink>
                <hr v-if="role === 'ADMIN'|| role === 'SUPER_ADMIN'"><!--管理员才显示-->
                <RouterLink class="py-4 my-2 text-center font-semibold" to="/controlluser" v-if="role === 'SUPER_ADMIN'">用户账号管理</RouterLink>
                <hr v-if="role === 'SUPER_ADMIN'"><!--超级管理员才显示-->
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
                    <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">邮箱:   </div>
                        <input type="text" v-model="email" disabled="disabled" class=" p-1"><!--邮箱-->
                    </div>
                </div>
                <div class="flex py-4 justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">用户名:</div><!--用户名-->
                        <input :disabled="iscompile" type="text" v-model="username" class=" p-1">
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">学院:   </div>
                        <input :disabled="iscompile" type="text" v-model="acadymic" class=" p-1"><!--学院-->
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">电话:   </div>
                        <input :disabled="iscompile" type="text" v-model="phone" class=" p-1"><!--邮箱-->
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">是否允许邮箱通知:   </div>
                        <input :disabled="iscompile" type="radio" value="是" v-model="allowemail"></input>
                        <div disabled class="text-center p-1">是</div>
                        <input :disabled="iscompile" type="radio" value="否" v-model="allowemail"></input>
                        <div disabled class="text-center p-1">否</div>
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <button class="w-24 h-12 bg-blue-500 rounded p-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compile()">
                        {{ iscompile ? '编辑':'保存' }}
                    </button><!--进入编辑页面的按钮-->
                </div>
                <div class="flex py-4  justify-center" v-if="iserror">
                    {{ message }}
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="change">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold py-2">修改成功！</h2>
            <h2 class="text-sm py-2">保存时间{{ formatDate(message) }}</h2>
            <hr>
            <div class="p-6">
                <div class="flex justify-end space-x-3">
                    <button 
                        type="button" @click="change=false"
                        class="bg-green-300 text-white py-2 px-4 rounded hover:text-black
                        hover:bg-green-500 transition">
                        确认
                    </button>
                </div>       
            </div>
        </div>
    </div>
    <footer class="text-center h-10">JHWL-Trial-8制作
    </footer><!--脚标-->
</template>
<script>
    import { compile } from 'vue';
    import PageHead from './PageHead.vue';
    import axios from 'axios'
    export default{
        data(){
            return{
                email:'',
                acadymic:'',
                username:'',
                phone:'',
                allowemail:'',
                allow:true,
                iscompile:true,
                message:'',
                change:false,
                iserror:false,
                role:''
            }
        },
        components:{
            PageHead
        },
        methods:{
            compile(){
                if(this.iscompile) this.iscompile=false
                else{
                    this.iserror=false
                    if(this.allowemail=='是')this.allow=true
                    else this.allow=false
                    axios.put('http://46.203.124.16:8080/api/v1/users/me',{
                        email:this.email,
                        dept:this.acadymic,
                        name:this.username,
                        phone:this.phone,
                        allow_email:this.allow //修复了没有下划线导致的错误，后端居然不告诉我参数有误TAT
                    }).then(response => {
                        this.iscompile=true
                        const updatedata=response.data
                        this.message=updatedata.updated_at
                        this.change=true
                        localStorage.setItem('username', this.username)
                    })
                    .catch(error => {
                        const errormessage=error.response.data
                        this.message=errormessage.message
                        this.iserror=true
                    });
                }
            },
            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleDateString('zh-CN')
            },
        },
        async created() {
            // 直接在created生命周期中获取数据
            try {
                const response = await axios.get('http://46.203.124.16:8080/api/v1/users/me')
                const user = response.data
                this.email = user.email
                this.acadymic = user.dept
                this.username = user.name
                this.phone=user.phone
                this.allowemail=(user.allow_email?'是':'否')
                this.role=user.role
            }
            catch (error) {
                console.error('获取用户信息失败:', error)
            }
        },
    }
</script>