<template>
    <div class="flex flex-col min-h-screen">
        <header class="bg-white shadow-sm py-4 px-6 h-20 w-full"><!--页面头，包括我们组的徽标和网站的标题-->
            <div class="flex items-center justify-between"><!--这个是用于使页面头元素正常排列的容器，没有别的作用-->
                <div class="flex items-center"><!--徽标加标题-->
                    <!-- 徽标 -->
                    <div class="w-12 h-12 rounded-md mr-3"><!--图片样式-->
                        <img src="../assets/JHWL-Trial-8.jpg" alt="徽标" class="flex">
                    </div>
                    <!-- 标题 -->
                    <h1 class="text-xl font-semibold text-gray-900">学生服务平台</h1>
                </div>
            </div>
        </header><!--页面头,但是页面头点击是到/home页面-->
        <div class="flex-1 flex flex-row-reverse overflow-hidden"><!--可以考虑加上侧栏，但是为什么登录页面会要侧栏呢-->
            <div class="flex-1 flex justify-end overflow-hidden">
            <div class=" p-32">
                <form @submit.prevent="login">
                    <div class="flex flex-col w-96 h-full p-10 bg-white
                        border-red-500 border-t-2 rounded-lg shadow-lg"><!--登录框，其实是由侧栏的代码改过来的-->
                    <div class="py-4 my-2 text-center font-semibold text-4xl">登录</div><!--登录框标题-->
                    <div class="flex py-4">
                        <div class=" h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">邮箱:</div><!--邮箱输入框，但是需要一个能判断邮箱格式是否合法的函数并做出不同的显示-->
                            <input v-model="Email" type="email" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="user@example.com"  @blur="validateEmail" required>
                        </div>
                    </div>
                    <div class="flex py-4">
                        <div class="h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">密码:   </div><!--密码输入框，刚改正密码输入类型不是password的问题-->
                            <input type="password" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="Password" v-model="Password" required>
                        </div>
                    </div>
                    <div class="flex text-sm text-red-500 px-20" v-if="iserror">
                        {{message}}
                    </div>
                    <div class="flex  justify-center items-center h-11">
                        <button class=" bg-blue-500  text-black hover:bg-blue-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm" type="submit">登录</button><!--登录按钮，绑定了登录事件login-->
                    </div>
                    <RouterLink class="text-blue-600 text-sm text-center py-2" to="/register">还没有账号？注册账号</RouterLink><!--注册按钮，绑定了页面跳转事件register-->
                </div>
                </form><!--需要加入一个回车登录的功能，还在研究中-->
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <div class="px-10 py-32">
                <div class="flex flex-col">
                    <img src="../assets/JHWL-Trial-8.jpg" alt="picture"><!--左侧大照片-->
                </div>
            </div>
        </div>
        </div>
    </div>
    <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0">JHWL-Trial-8制作
    </footer><!--脚标-->
</template>
<script>
    import PageHead from './PageHead.vue';
    import axios from'axios';
    export default {
        components:{
            PageHead
        },
        data(){
            return{
                Email:'',
                Password:'',
                emailValid: false,
                access_token:'',
                userinformation:'',
                iserror:false,
                message:''
            }
        },
        methods:{
            async login(){
                try {
                    // 1. 发送登录请求
                    const loginResponse = await axios.post('http://46.203.124.16:8080/api/v1/auth/login', {
                        email: this.Email,
                        password: this.Password
                    });
                    const access_token = loginResponse.data.access_token;
                    // 2. 保存token
                    localStorage.setItem('access_token', access_token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
                    // 3. 获取用户信息
                    const userResponse = await axios.get('http://46.203.124.16:8080/api/v1/users/me');
                    const userData = userResponse.data;
      
                    // 4. 保存用户信息
                    localStorage.setItem('username', userData.name);
                    localStorage.setItem('role', userData.role);
                    
                    const role=userData.role
                    // 5. 跳转页面
                    if(role === 'STUDENT'){
                        this.$router.push('/home');
                    }
                    else{
                        this.$router.push('/feedbackpage');
                    }
                }
                catch(error){
                    this.iserror=true
                    this.message=error.response.data.message
                }
            },
            register(){
                this.$router.push('/register')//跳传到/register注册页面
            }
        }
    }
</script>