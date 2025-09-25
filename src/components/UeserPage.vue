<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead><!--页面头-->
            <div class="flex flex-col items-center my-12">
                <div class="relative group"><!--用户头像展示，之后需要把这个做成按钮，或者在下方添加一个能上传图片文件的按钮。。-->
                    <div class="w-32 h-32 rounded-full overflow-hidden shadow-sm"><!--。。用来上传用户的头像-->
                        <img src="../assets/JHWL-Trial-8.jpg"
                            class="w-full h-full object-cover"
                            alt="用户头像"/><!--当然，之后头像文件肯定是要保存在后端的，具体实现还要学习一下-->
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">用户名:</div><!--用户名-->
                        <div class=" p-1">{{ username }}</div>
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">学院:   </div>
                        <div class=" p-1">{{ acadymic }}</div><!--学院-->
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">邮箱:   </div>
                        <div class=" p-1">{{ email }}</div><!--邮箱-->
                    </div>
                </div><!--之后可能会有更多的个人信息，根据具体情况来添加（看api中好像还有电话号码之类的）-->
                <div class="flex py-4">
                    <button class="w-24 h-12 bg-blue-500 rounded p-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compile()">
                        编辑
                    </button><!--进入编辑页面的按钮-->
                </div>
            </div>
    </div>
    <footer class="text-center h-10">JHWL-Trial-8制作
    </footer><!--脚标-->
</template>
<script>
import { compile } from 'vue';
import PageHead from './PageHead.vue';
    export default{
        data(){
            return{
                email:localStorage.getItem('email'),
                acadymic:localStorage.getItem('acadymic'),
                username:localStorage.getItem('username')//获取本地存储的个人信息，之后可能在登录时获取一下，之后直接存本地
            }
        },
        components:{
            PageHead
        },
        methods:{
            compile(){
                this.$router.push('/compileuser')//跳转到编辑页面
            }
        }
    }
</script>