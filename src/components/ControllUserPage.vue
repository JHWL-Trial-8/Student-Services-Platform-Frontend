<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了，可以看主页的注释-->
        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <router-link to="/home" class="py-4 my-2 text-center font-semibold">主页</router-link>
                <hr>
                <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                <hr>
                <router-link to="/up" class="py-4 my-2 text-center font-semibold">提交问题反馈</router-link>
                <hr>
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold">处理反馈</router-link>
                <hr>
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    Username
                </div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--这里显示用户信息，主要是邮箱和用户名-->
                    <div class="w-auto flex flex-row py-5 px-2 justify-between">
                        <div></div>
                        <div class="w-auto font-semibold">
                            email
                        </div>
                        <div class="w-auto  font-semibold">
                            username
                        </div><!--界面标题，表格头-->
                        <div class="w-auto  font-semibold">
                            role
                        </div>
                        <div></div>
                        <div></div>
                        <div class="w-auto  font-semibold">
                            操作
                        </div>
                        <div></div>
                    </div>
                    <hr>
                    <ul>
                        <li v-for="user in userinformationtmp":key="userinformationtmp.id" class="p-2">
                            <div class="w-auto flex flex-row py-5 justify-between">
                                <div></div>
                                <div class="w-auto p-4" >
                                    {{ user.email }}
                                </div>
                                <div></div>
                                <div></div>
                                <div class="w-auto p-4">
                                    {{ user.username }}
                                </div><!--通过循环输出用户信息-->
                                <div></div>
                                <div class="w-auto px-20 py-4">
                                    {{ user.role }}
                                </div>
                                <div class="py-2 px-20 flex flex-row">
                                    <div class="px-2">
                                        <!-- 修改按钮文本和样式根据当前角色 -->
                                        <button 
                                            class="w-24 h-12 rounded py-2 text-white"
                                            :class="user.role === 'admin' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'"
                                            @click="changerole(user)">
                                            {{ user.role === 'admin' ? '设为用户' : '设为管理员' }}
                                        </button>
                                    </div>
                                    <button class="w-24 h-12 bg-red-500 rounded py-2  text-white
                                    hover:bg-red-700 hover:text-black" @click="removeuser(user)">
                                        删除
                                    </button>
                                </div>
                            </div>
                            <hr>
                        </li>
                    </ul>
                    <div class="p-4 flex flex-row">
                        <div class="px-4">
                            <button class="w-24 h-12 bg-gray-500 rounded px-2 text-white
                        hover:bg-gray-700 hover:text-black" @click="restart()">
                         取消
                        </button>
                        </div>
                        <button class="w-24 h-12 bg-blue-500 rounded px-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compelete()">
                         保存
                        </button><!--保存按钮，打算是先本地存储，之后再上传-->
                        <div class="px-4">
                            <button class="w-24 h-12 bg-green-500 rounded px-2 text-white
                            hover:bg-green-700 hover:text-black" @click="adduser()">
                                添加
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="add">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold">添加用户</h2>
            <hr>
                <div class="p-6">
                            <h3 class="text-xl font-semibold mb-4">用户信息</h3>
                            <form @submit.prevent="submitForm">
                                <div class="mb-4">
                                    <label class="block text-gray-700 mb-2" for="name">姓名</label>
                                    <input 
                                        id="name" 
                                        type="text" 
                                        v-model="newUser.username"
                                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        required
                                    >
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 mb-2" for="email">邮箱</label>
                                    <input 
                                        id="email" 
                                        type="email"
                                        v-model="newUser.email"
                                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        required>
                                </div>
                                <div class="flex justify-end space-x-3">
                                    <button 
                                        type="button" @click="add=false"
                                        class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                                        hover:bg-gray-400 transition">
                                        取消
                                    </button>
                                    <button 
                                        type="submit" @click="addnewuser()"
                                        class="bg-green-500 text-white py-2 px-4 rounded
                                        hover:bg-green-600 transition">
                                        提交
                                    </button>
                                </div>
                        </form>
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="change_if">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold py-2" v-if="!change">您还没有做出任何修改！</h2>
            <h2 class="text-xl font-bold py-2" v-if="change">确认修改？此操作不可逆！</h2>
            <hr>
                <div class="p-6">
                    <div class="flex justify-end space-x-3">
                        <button 
                            type="button" @click="change_if=false" v-if="change"
                            class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                            hover:bg-gray-400 transition">
                            取消
                        </button>
                        <button 
                            type="submit" @click="confirmupload()" v-if="change"
                            class="bg-green-500 text-white py-2 px-4 rounded
                            hover:bg-green-600 transition">
                                提交
                        </button>
                        <button 
                            type="button" @click="change_if=false" v-if="!change"
                            class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                            hover:bg-gray-400 transition">
                            返回
                        </button>
                    </div>       
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="change_done">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold py-2">操作成功</h2>
            <hr>
                <div class="p-6">
                    <div class="flex justify-end space-x-3">
                        <button 
                            type="button" @click="change_done=false"
                            class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                            hover:bg-gray-400 transition">
                            返回
                        </button>
                    </div>       
                </div>
            </div>
        </div>
        <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0 h-auto">JHWL-Trial-8制作
        </footer><!--脚标-->
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default{
        components:{
            PageHead
        },
        data() {
            return {
                userinformationtmp : [
                { id: 1, email: 'email1@example.com',username:'User1',role:'student'},
                { id: 2, email: 'email2@example.com',username:'User2',role:'admin'},
                { id: 3, email: 'email3@example.com',username:'User3',role:'admin'}],//用户信息，之后可能就是网上读取了
                userinformation : [
                { id: 1, email: 'email1@example.com',username:'User1',role:'student'},
                { id: 2, email: 'email2@example.com',username:'User2',role:'admin'},
                { id: 3, email: 'email3@example.com',username:'User3',role:'admin'}],
                change:false,
                add: false,
                newUser: {
                    username: '',
                    email: '',
                    role: 'user'
                },
                add:false,
                change_if:false,
                change_done:false,
            }
        },
        methods:{
            compelete(){
                if(this.change){
                    this.change_if=true
                }
                else{
                    this.change_if=true
                }
            },
            removeuser(userid){
                this.userinformationtmp=this.userinformationtmp.filter((t)=>t!=userid)
                this.change=true
            },
            restart(){
                this.userinformationtmp=this.userinformation
                this.change=false
            },
            changerole(user){
                if (user.role === 'student') {
                    user.role = 'admin';
                } else {
                    user.role = 'student';
                }
                this.change=true
                this.change_done=true
            },
            adduser(){
                this.add=true
            },
            addnewuser(){
                const newId = Math.max(...this.userinformationtmp.map(u => u.id)) + 1;
                this.userinformationtmp.push({id: newId,...this.newUser});
                // 重置表单并关闭弹窗
                this.newUser = { username: '', email: '', role: 'user' };
                this.add = false;
                this.change=true
                this.change_done=true
            },
            confirmupload(){
                this.change_if=false
                this.change_done=true
                this.userinformation=this.userinformationtmp
                localStorage.setItem('userinformation',JSON.stringify(this.userinformation))//先本地存储
            }
        }
    }
</script>