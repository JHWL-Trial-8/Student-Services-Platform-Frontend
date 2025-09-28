<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--页面头,但是页面头点击是到/home页面-->
        <div class="flex-1 flex flex-row-reverse overflow-hidden"><!--可以考虑加上侧栏，但是为什么登录页面会要侧栏呢-->
            <div class="flex-1 flex justify-end overflow-hidden">
            <div class=" p-32">
                <form @submit.prevent="login">
                    <div class="flex flex-col w-96 h-full p-10 bg-white
                        border-red-400 border-t-2 rounded-lg shadow-lg"><!--登录框，其实是由侧栏的代码改过来的-->
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
                    <div class="flex  justify-center items-center h-11">
                        <button class=" bg-red-500  text-black hover:bg-red-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm" type="submit">登录</button><!--登录按钮，绑定了登录事件login-->
                        <div class="w-16 h-8"></div>
                        <button class=" bg-red-500  text-black hover:bg-red-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm " @click="register()">注册</button><!--注册按钮，绑定了页面跳转事件register-->
                        </div>
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
                userinformation:''
            }
        },
        methods:{
            login(){
                axios.post('http://46.203.124.16:8080/api/v1/auth/login',{
                    email:'user@example.com',
                    password:'pa$$word'
                }).then(response=>{
                    const userinformation=response.data
                    localStorage.setItem('access_token',userinformation.access_token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userinformation.access_token}`;
                    this.$router.push('/home');
                    
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            register(){
                this.$router.push('/register')//跳传到/register注册页面
            }
        }
    }
</script>