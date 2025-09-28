<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了-->
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
                    {{ Username }}
                </div>
            </div>
            </div>
            <div class="flex-1 p-10">
                <div class="flex flex-col">
                    <div v-for="item in feedbackdata" :key="item.id">
                        <div class="py-2">
                            <div class="h-50 w-auto bg-white rounded-lg shadow-lg p-2"><!--管理员反馈界面主要部分-->
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-col flex-1">
                                        <div class=" text-1xl font-semibold py-2">
                                            问题: {{ item.qestion }}
                                        </div>
                                        <hr>
                                        <div class="text-lg">用户名: {{ item.username }}</div>
                                        <div v-if="item.feedback === ''">
                                            <div class=" text-red-500">暂无反馈</div>
                                        </div>
                                        <div v-else>
                                            <div class=" text-green-500">反馈：{{ item.feedback }}</div>
                                        </div>
                                        <div v-if="item.rubbish">
                                            <div class=" text-yellow-600 text-sm">垃圾信息</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row items-center ml-4">
                                        <button class="w-24 h-12 bg-yellow-500 rounded py-2  text-white
                                         hover:bg-yellow-700 hover:text-black">
                                            垃圾信息
                                        </button>
                                    </div>
                                    <div class="flex flex-row items-center ml-4">
                                        <button class="w-24 h-12 bg-blue-500 rounded py-2  text-white
                                         hover:bg-blue-700 hover:text-black">
                                            反馈
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
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
        },
        data(){
            return{
                feedbackdata:[
                    {id:1,username:'sjs',qestion:'407的灯坏了,速来修理',feedback:'已处理',rubbish:false},
                    {id:2,username:'无名',qestion:'这是一条垃圾反馈',feedback:'',rubbish:true},
                    {id:3,username:'匿名',qestion:'水卡丢了,该去哪里挂失',feedback:'',rubbish:false}],
                Username:localStorage.getItem('username')
            }
        }
    }
</script>