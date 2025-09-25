<template><!--这个是页面头元素-->
    <header class="bg-white shadow-sm py-4 px-6 h-20 w-full">
            <div class="flex items-center">
                <!-- 徽标 -->
                <div class="w-12 h-12 rounded-md mr-3">
                    <img src="../assets/JHWL-Trial-8.jpg" alt="徽标" class="flex">
                </div>
                <!-- 标题 -->
                    <router-link to="/home">
                        <h1 class="text-xl font-semibold text-gray-900">学生服务平台</h1>
                    </router-link>
                </div>
        </header>
</template>
<script>
    export default{
        name:"PageHead"
    }
</script>