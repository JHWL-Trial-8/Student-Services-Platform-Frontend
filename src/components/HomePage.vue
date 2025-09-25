<template><!--这个是学生服务平台的首页，未登录时的页面，路径“/”（路径文件在router文件夹下的router.ts里）-->
    <div class="h-full w-full bg-gray-50 flex flex-col"><!--背景灰色，也是最大的容器-->
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
                    hover:bg-red-700 hover:text-white" @click="logg()"><!--登录按钮，点击触发绑定事件logg-->
                    登录
                </button>
            </div>
        </header>

        <div class="flex-1 flex overflow-hidden"><!--下方侧栏和主题内容是水平排列的，因此-->
        <div class=" p-10 w-80"><!--侧边栏-->
            <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                <div class="py-4 my-2 text-center font-semibold">个人信息</div>
                <hr>
                <div class="py-4 my-2 text-center font-semibold">提交问题反馈</div><!--边栏内容示例，但是没有绑定页面跳转内容-->
                <hr><!--分割线-->
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--主体内容显示示例-->
                    <div class="p-5 h-auto w-auto text-center text-2xl font-semibold">欢迎使用学生服务平台！请先登录以使用</div>
                    <div class="p-5 h-auto w-auto text-center font-semibold">在这里，你可以反馈你的遇到的问题，例如：</div>
                    <div class="p-10 h-auto w-auto font-semibold">工大三路的路灯坏了，来修一下</div>
                    <div class="p-10"><img class="w-40 h-40" src="../assets/f7d80737abdeffba9d69d7d0758e22f9.jpeg" alt="图片"></div><!--随机挑的图片-->
                    <div class="px-10 py-5 h-auto w-auto font-semibold">管理员反馈：</div>
                    <div class="px-20 py-5 h-auto w-auto font-semibold">收到！已处理</div>
                </div>
            </div>
        </div>
        <PageFoot></PageFoot><!--脚标，包含版权信息-->
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';//引用脚标文件
    localStorage.setItem('access_token','');//打算写初始化内容的，access_token是用来判断用户是否登录
    localStorage.setItem('role','superadmin');//角色定义admin,superadmin,user
    localStorage.setItem('username','User');//用户名，邮箱，学院，先设为默认值
    localStorage.setItem('email','eamil@example.com');
    localStorage.setItem('acadymic','computerscience');
    export default{
        methods:{
            logg(){
                this.$router.push('/log');//跳转到/log界面，即登录界面
            }
        },
        components:{
            PageFoot //命名脚标文件
        }
    }
</script>