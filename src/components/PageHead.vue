<template><!--这个是页面头元素-->
    <header class="bg-white shadow-sm py-4 px-6 h-20 w-full"><!--页面头，包括我们组的徽标和网站的标题-->
        <div class="flex items-center justify-between"><!--这个是用于使页面头元素正常排列的容器，没有别的作用-->
            <div class="flex items-center"><!--徽标加标题-->
                 <!-- 徽标 -->
                <div class="w-12 h-12 rounded-md mr-3"><!--图片样式-->
                     <img src="../assets/JHWL-Trial-8.jpg" alt="徽标" class="flex">
                </div>
                <!-- 标题 -->
                <h1 class="text-xl font-semibold text-gray-900">学生服务平台</h1>
            </div>
            <button class="w-24 h-10 bg-red-500 rounded p-2 text-white 
                  hover:bg-red-700 hover:text-white" @click="change()"><!--登录按钮，点击触发绑定事件logg-->
                退出
            </button>
        </div>
    </header>
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="change_if">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class=" font-semibold text-center text-lg">确认退出？</div>
            <hr>
            <div class="space-x-3 py-2 flex items-center justify-center">
                <button 
                    @click="change_if=false"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    取消
                </button>
                <button 
                    @click="logoff()"
                    class="bg-green-500 text-white py-2 px-4 rounded
                    hover:bg-green-600 transition">
                    确认
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:"PageHead",
        data(){
            return{
                change_if:false
            }
        },
        methods:{
            change(){
                this.change_if=true
            },
            logoff(){
                localStorage.removeItem('access_token');
                this.$router.push('/')
                return;
            }
        }
    }
</script>