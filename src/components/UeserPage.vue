<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead><!--页面头-->
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
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg items-center"><!--主体内容显示示例-->
                <div class="flex py-4 justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">用户名:</div><!--用户名-->
                        <div class=" p-1">{{ username }}</div>
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">学院:   </div>
                        <div class=" p-1">{{ acadymic }}</div><!--学院-->
                    </div>
                </div>
                <div class="flex py-4  justify-center">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">邮箱:   </div>
                        <div class=" p-1">{{ email }}</div><!--邮箱-->
                    </div>
                </div><!--之后可能会有更多的个人信息，根据具体情况来添加（看api中好像还有电话号码之类的）-->
                <div class="flex py-4  justify-center">
                    <button class="w-24 h-12 bg-blue-500 rounded p-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compile()">
                        编辑
                    </button><!--进入编辑页面的按钮-->
                </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="text-center h-10">JHWL-Trial-8制作
    </footer><!--脚标-->
</template>
<script>
    import { compile } from 'vue';
    import PageHead from './PageHead.vue';
    import axios from 'axios'
    export default{
        data(){
            return{
                email:'',
                acadymic:'',
                username:''//获取本地存储的个人信息，之后可能在登录时获取一下，之后直接存本地
            }
        },
        components:{
            PageHead
        },
        methods:{
            compile(){
                this.$router.push('/compileuser')//跳转到编辑页面
            }
        },
        async created() {
            // 直接在created生命周期中获取数据
            try {
                const response = await axios.get('http://46.203.124.16:8080/api/v1/users/me')
                const user = response.data
                this.email = user.email
                this.academic = user.dept
                this.username = user.name
            }
            catch (error) {
                console.error('获取用户信息失败:', error)
            }
        }
    }
</script>