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
                <button class="w-24 h-10 bg-red-500 rounded p-2 text-white 
                    hover:bg-red-700 hover:text-white" @click="logg()">
                    登录
                </button>
            </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <div class="py-4 my-2 text-center font-semibold">个人信息</div>
                <hr>
                <div class="py-4 my-2 text-center font-semibold">提交问题反馈</div>
                <hr>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                    <div class="p-5 h-auto w-auto text-center text-2xl font-semibold">欢迎使用学生服务平台！请先登录以使用</div>
                    <div class="p-5 h-auto w-auto text-center font-semibold">在这里，你可以反馈你的遇到的问题，例如：</div>
                    <div class="p-10 h-auto w-auto font-semibold">工大三路的路灯坏了，来修一下</div>
                    <div class="p-10"><img class="w-40 h-40" src="../assets/f7d80737abdeffba9d69d7d0758e22f9.jpeg" alt="图片"></div>
                    <div class="px-10 py-5 h-auto w-auto font-semibold">管理员反馈：</div>
                    <div class="px-20 py-5 h-auto w-auto font-semibold">收到！已处理</div>
                </div>
            </div>
        </div>
        <PageFoot></PageFoot>
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';
    localStorage.setItem('access_token','');
    localStorage.setItem('access_type','');
    localStorage.setItem('role','superadmin');
    localStorage.setItem('username','User');
    localStorage.setItem('email','eamil@example.com');
    localStorage.setItem('acadymic','computerscience');
    export default{
        methods:{
            logg(){
                this.$router.push('/log');
            }
        },
        components:{
            PageFoot
        }
    }
</script>