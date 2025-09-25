<template>
    <div class="flex flex-col min-h-screen"><!--注册页面-->
        <PageHead></PageHead><!--页面头，不过这个文件的名字好像打错了，反正不影响理解就行（ZestfulYK英语不好）-->
        <div class="flex-1 flex flex-row-reverse overflow-hidden"><!--和登录界面一样的输入框-->
            <div class="flex-1 flex justify-end overflow-hidden">
            <div class=" p-32">
                <form @keyup.enter="login()" @submit.prevent></form><!--这里也需要实现回车注册的功能，最好能有弹窗显示注册成功-->
                <div class="flex flex-col w-96 h-full p-10 bg-white
                        border-red-400 border-t-2 rounded-lg shadow-lg">
                    <div class="py-4 my-2 text-center font-semibold text-4xl">注册</div><!--注册框的标题-->
                    <div class="flex py-4"><!--两个输入框-->
                        <div class=" h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">邮箱:</div>
                            <input v-model="Email" type="text" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="user@example.com"  @blur="validateEmail"><!--也需要判断一下邮箱格式是否合法-->
                        </div>
                    </div>
                    <div class="flex py-4">
                        <div class="h-10 w-80 py-1 rounded shadow-sm flex justify-center items-center">
                            <div class="p-1">密码:</div><!--密码输入框-->
                            <input type="text" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="Password" v-model="Password">
                        </div>
                    </div>
                    <div class="flex  justify-center items-center h-11">
                        <button class=" bg-red-500  text-black hover:bg-red-700 hover:text-white 
                            rounded-sm w-16 h-8 shadow-sm" @click="register()">注册</button><!--注册按钮，之后要axios.get上传数据，现在还么有这个功能-->
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <div class="px-10 py-32">
                <div class="flex flex-col">
                    <img src="../assets/JHWL-Trial-8.jpg" alt="picture">
                </div>
            </div>
        </div>
        </div>
    </div>
    <footer class="text-center py-4 bg-white border-t border-gray-200 flex-shrink-0">JHWL-Trial-8制作
    </footer>
</template>
<script>
import PageHead from './PageHead.vue';
    export default {
        components:{
            PageHead
        },
        data(){
            return{
                Email:'',
                Password:'',
                emailValid: false
            }
        },
        methods:{
            register(){
                this.$router.push('/log');//在这里需要判断用户的注册信息是否合法，现在还未实现这个功能
            }//比如输入的密码不能太简单，邮箱得合法，且不能为空之类的，在按下按钮后需要有弹窗并阻止注册
        }
    }
</script>