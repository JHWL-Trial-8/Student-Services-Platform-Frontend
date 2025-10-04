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
                <div class="py-4 my-2 text-center font-semibold text-red-600 text-lg">您还未登录</div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--主体内容显示示例-->
                    <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--主体内容，反馈的历史记录及通知-->
                    <div class=" font-semibold text-black text-center p-2 text-4xl">欢迎使用学生服务平台！</div>
                    <div class=" font-semibold text-black text-center p-2 text-1xl">在这里，你可以反馈你遇到的问题<hr></div>
                        <div class="rounded p-4 mb-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold mb-2">工大三路的灯坏了</h3>
                                    <p class="text-gray-600 mb-3">工大三路的灯坏了</p>
                                    <div class="flex flex-wrap gap-2 mb-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            公共施设
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                                            新建
                                        </span>
                                        <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                            紧急
                                        </span>
                                        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            匿名
                                        </span>
                                    </div>
                                </div>
          
                                <div class="text-right text-sm text-gray-500 ml-4">
                                    <div>2025/10/7</div>
                                    <div>工单ID: 1145</div>
                                    <button>>详细信息</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="rounded p-4 mb-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold mb-2">老闭灯</h3>
                                    <p class="text-gray-600 mb-3">寝室的灯坏了</p>
                                    <div class="flex flex-wrap gap-2 mb-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            寝室用具
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                                            新建
                                        </span>
                                        <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                            紧急
                                        </span>
                                        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            匿名
                                        </span>
                                    </div>
                                </div>
          
                                <div class="text-right text-sm text-gray-500 ml-4">
                                    <div>2025/10/7</div>
                                    <div>工单ID: 11451</div>
                                    <button>>详细信息</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="rounded p-4 mb-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold mb-2">连不上校园网了</h3>
                                    <p class="text-gray-600 mb-3">连不上校园网了</p>
                                    <div class="flex flex-wrap gap-2 mb-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            服务工作
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                                            新建
                                        </span>
                                        <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                            紧急
                                        </span>
                                        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            匿名
                                        </span>
                                    </div>
                                </div>
          
                                <div class="text-right text-sm text-gray-500 ml-4">
                                    <div>2025/10/7</div>
                                    <div>工单ID: 114514</div>
                                    <button>>详细信息</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="rounded p-4 mb-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold mb-2">投影仪坏了</h3>
                                    <p class="text-gray-600 mb-3">投影仪坏了</p>
                                    <div class="flex flex-wrap gap-2 mb-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            教室用具
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                                            新建
                                        </span>
                                        <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                            紧急
                                        </span>
                                        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            匿名
                                        </span>
                                    </div>
                                </div>
          
                                <div class="text-right text-sm text-gray-500 ml-4">
                                    <div>2025/10/7</div>
                                    <div>工单ID: 1145141</div>
                                    <button>>详细信息</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                </div><!--主体内容，反馈的历史记录及通知-->
                <div class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-700">
                            第 1 页，共 1 页
                        </div>
                        <div class="flex space-x-2">
                            <button  class="px-3 py-1 border border-gray-300 rounded-md
                                text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                上一页
                            </button>
                            <button 
                                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white 
                                hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                下一页
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <PageFoot></PageFoot><!--脚标，包含版权信息-->
    </div>
</template>
<script>
    import PageFoot from './PageFoot.vue';//引用脚标文件
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