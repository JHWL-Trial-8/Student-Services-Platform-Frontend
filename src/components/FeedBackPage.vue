<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead>
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
                <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold">用户账号管理</router-link>
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
                <div class="h-72 w-auto bg-white rounded-lg shadow-lg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default{
        components:{
            PageHead
        }
    }
</script>