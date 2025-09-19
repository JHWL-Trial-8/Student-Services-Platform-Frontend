<template>
    <div class="h-full w-full bg-yellow-100 flex justify-center">
            <!--头-->
            <header class="bg-white shadow-sm py-4 px-6 h-20 w-full flex">
                <div class="flex items-center">
                    <!-- 徽标 -->
                    <div class="w-12 h-12 rounded-md mr-3">
                        <img src="../assets/JHWL-Trial-8.jpg" alt="徽标" class="flex">
                    </div>
                    <!-- 标题 -->
                    <h1 class="text-xl font-semibold text-gray-900">学生服务平台</h1>
                    <button class="absolute right-10 w-24 h-12 bg-red-500 rounded p-2 text-black 
                        hover:bg-red-700 hover:text-white" @click="logg()">
                        登录
                    </button>
                </div>
            </header>
            <div class="absolute top-20 left-0 w-60 h-full p-10 bg-white  border-red-400 border-t-2">
                <router-link to="/user" class="p-4 m-2 text-center font-semibold">个人信息</router-link>
                <hr>
                <router-link to="/up" class="p-4 m-2 text-center font-semibold">提交问题反馈</router-link>
            </div>
    </div>
</template>
<script>
    export default{
        methods:{
            logg(){
                this.$router.push('/log');
            }
        }
    }
</script>