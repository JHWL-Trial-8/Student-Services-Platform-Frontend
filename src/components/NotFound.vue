<template><!--当你乱输入路由时就会到达这个神秘的页面-->
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead>
        <div class=" text-center text-8xl font-semibold p-5">404</div>
        <RouterLink class=" text-center font-semibold text-2xl py-5" to="/home">返回首页</RouterLink>
    </div><!--返回登录后的首页-->
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