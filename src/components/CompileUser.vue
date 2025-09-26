<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead>
            <div class="flex flex-col items-center my-12">
                <div class="relative group">
                    <div class="w-32 h-32 rounded-full overflow-hidden shadow-sm">
                        <img src="../assets/JHWL-Trial-8.jpg"
                            class="w-full h-full object-cover"
                            alt="用户头像"/><!--用户头像展示，之后可能需要把这个做成按钮，或者在下方添加一个能上传图片文件的按钮。。-->
                    </div><!--。。用来上传用户的头像--><!--当然，之后头像文件肯定是要保存在后端的，具体实现还要学习一下-->
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">用户名:</div><!--输入框，和个人信息界面没太大区别-->
                        <input type="text":placeholder="user" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="username" v-model="username"><!--通过v-model来实现输入框绑定-->
                    </div><!--placeholder是提示符，和下面的的变量绑定，实现直接有内容的效果-->
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">学院:   </div>
                        <input type="text":placeholder="acadymic" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="计算机学院" v-model="acadymic">
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">邮箱:   </div>
                        <input type="text":placeholder="email" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                             v-model="email">
                    </div>
                </div>
                <div class="flex py-1">
                    <button class="w-24 h-12 bg-blue-500 rounded p-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compelete()">
                        保存
                    </button><!--保存按钮，之后触发事件来本地存储-->
                </div>
            </div>
    </div>
    <footer class="text-center h-10">JHWL-Trial-8制作
    </footer>
</template>
<script>
import PageHead from './PageHead.vue';
    export default{
        data(){
            return{
                username:localStorage.getItem('username'),
                email:localStorage.getItem('email'),
                acadymic:localStorage.getItem('acadymic')//读取已有的用户信息
            }
        },
        components:{
            PageHead
        },
        methods:{
            compelete(){
                if(this.username !=='') localStorage.setItem('username',this.username)
                if(!this.email !=='') localStorage.setItem('email',this.email)
                if(!this.acadymic !=='') localStorage.setItem('acadymic',this.acadymic)
                const result=confirm("确认修改？")
                if(result){
                    alert("保存成功")
                    this.$router.push('/user');
                }
                //存储信息，需要一个判断输入是否合法的函数，然后弹窗提示
                //跳转会个人信息界面
            },
        }
    }
</script>