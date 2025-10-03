<template><!--这个是路由守卫发现你没登录后跳转到的页面-->
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead>
        <div class=" text-center text-8xl font-semibold p-5">404</div>
        <button class=" text-center font-semibold text-2xl py-5" @click="goback">返回首页</button><!--这个用来把你赶回首页-->
    </div>
    <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0">JHWL-Trial-8制作
    </footer>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default{
            components:{
            PageHead
        },
        data(){
            return{
                role:localStorage.getItem('role')
            }
        },
        methods:{
            goback(){
                if(this.role==='ADMIN' || this.role==='SUPER_ADMIN') this.$router.push('/feedbackpage')
                else this.$router.push('/home')
            }
        }
    }
</script>