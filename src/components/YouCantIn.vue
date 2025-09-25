<template><!--当有人试图访问管理员界面时，就会进入这个神秘的界面-->
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead>
        <div class=" text-center text-8xl font-semibold p-5">您好像不是管理员？</div>
        <RouterLink class=" text-center font-semibold text-2xl py-5" to="/home">返回首页</RouterLink>
    </div><!--赶用户回主页的链接-->
    <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0">JHWL-Trial-8制作
    </footer>
</template>
<script>
    import { RouterLink } from 'vue-router';
    import PageHead from './PageHead.vue';
        export default{
                components:{
                PageHead
            }
        }
</script>