<template>
    <div class="h-full w-full bg-gray-50 flex flex-col">
        <header class="bg-white shadow-sm py-4 px-6 h-20 w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <!-- 徽标 -->
                    <div class="w-12 h-12 rounded-md mr-3">
                        <img src="../assets/JHWL-Trial-8.jpg" alt="徽标" class="flex">
                    </div>
                    <!-- 标题 -->
                    <h1 class="text-xl font-semibold text-gray-900">学生服务平台</h1>
                </div>
            </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                <hr>
                <router-link to="/up" class="py-4 my-2 text-center font-semibold">提交问题反馈</router-link>
                <hr>
                <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold" v-if="role === 'superadmin'">用户账号管理</router-link>
                <hr>
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold" v-if="role === 'admin'">处理信息</router-link>
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold" v-if="role === 'superadmin'">处理信息</router-link>
                <hr>
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    {{username}}
                </div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"></div>
            </div>
        </div>
        <PageFoot></PageFoot>
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';
    export default{
        data(){
            return{
                username:localStorage.getItem('username'),
                role:localStorage.getItem('role')
            };
        },
        components:{
            PageFoot
        }
    }
</script>