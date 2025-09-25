<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了，可以看主页的注释-->
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
                <router-link to="/feedbackpage" class="py-4 my-2 text-center font-semibold">处理反馈</router-link>
                <hr>
                <div class="w-auto rounded-md p-4"><!--信息显示-->
                <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    Username
                </div>
                </div>
                </div>
                <div class="flex-1 p-10">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg"><!--这里显示用户信息，主要是邮箱和用户名-->
                    <div class="w-auto flex flex-row py-5 px-2">
                        <div class="w-auto px-20 font-semibold">
                            email
                        </div>
                        <div class="w-auto  font-semibold">
                            username
                        </div><!--界面标题，表格头-->
                    </div>
                    <hr>
                    <ul>
                        <li v-for="user in userinformation":key="userinformation.id" class="p-2">
                            <div class="w-auto flex flex-row py-5">
                                <div class="w-auto px-4" >
                                    {{ user.email }}
                                </div>
                                <div class="w-auto px-4">
                                    {{ user.username }}
                                </div><!--通过循环输出用户信息-->
                            </div>
                            <hr>
                        </li>
                    </ul>
                    <div class="p-4">
                        <button class="w-24 h-12 bg-blue-500 rounded px-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compelete()">
                         保存
                        </button><!--保存按钮，打算是先本地存储，之后再上传-->
                    </div>
                </div>
            </div>
        </div>
        <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0 h-auto">JHWL-Trial-8制作
        </footer><!--脚标-->
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default{
        components:{
            PageHead
        },
        data() {
            return {
                userinformation : [
                { id: 1, email: 'email1@example.com' ,username:'User1'},
                { id: 2, email: 'email2@example.com',username:'User2'},
                { id: 3, email: 'email3@example.com',username:'User3'}]//用户信息，之后可能就是网上读取了
            }
        },
        methods:{
            compelete(){
                localStorage.setItem('userinformation',JSON.stringify(this.userinformation))//先本地存储
            }
        }
    }
</script>