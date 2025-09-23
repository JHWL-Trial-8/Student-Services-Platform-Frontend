<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead>
        <div class="flex-1 flex flex-row-reverse overflow-hidden">
            <div class="flex-1 flex justify-end overflow-hidden">
            <div class=" p-32">
                <form @keyup.enter="login()" @submit.prevent></form>
                <div class="flex flex-col w-96 h-full p-10 bg-white
                        border-red-400 border-t-2 rounded-lg shadow-lg">
                    <div class="py-4 my-2 text-center font-semibold text-4xl">登录</div>
                    <div class="flex py-4">
                        <div class=" h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">邮箱:</div>
                            <input v-model="Email" type="text" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="user@example.com"  @blur="validateEmail">
                        </div>
                    </div>
                    <div class="flex py-4">
                        <div class="h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">密码:   </div>
                            <input type="text" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="Password" v-model="Password">
                        </div>
                    </div>
                    <div class="flex  justify-center items-center h-11">
                        <button class=" bg-red-500  text-black hover:bg-red-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm" @click="login()">登录</button>
                        <div class="w-16 h-8"></div>
                        <button class=" bg-red-500  text-black hover:bg-red-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm " @click="register()">注册</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <div class="px-10 py-32">
                <div class="flex flex-col">
                    <img src="../assets/JHWL-Trial-8.jpg" alt="picture">
                </div>
            </div>
        </div>
        </div>
    </div>
    <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0">JHWL-Trial-8制作
    </footer>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default {
        components:{
            PageHead
        },
        data(){
            return{
                Email:'',
                Password:'',
                emailValid: false
            }
        },
        methods:{
            login(){
                localStorage.setItem('username','username');
                localStorage.setItem('access_token','111');
                localStorage.setItem('access_type','admin');
                this.$router.push('/home');
            },
            register(){
                this.$router.push('/register')
            }
        }
    }
</script>