<template>
    <div class="h-full w-full bg-gray-50 flex flex-col">
        <PageHead></PageHead><!--页面头-->
        <div class=" min-h-screen min-w-full bg-gray-100 shadow-md rounded-md p-10 flex-1 flex overflow-hidden">
            <div class=" w-80"><!--侧边栏-->
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
                    Username
                </div><!--好像需要改成{ { username } }，算一个bug，之后再改-->
                </div>
                </div>
                <div class="flex-1 p-10">
                    <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                        <textarea name="shurukuang" id="shurukuang" placeholder="请输入问题描述" v-model="text"
                            class=" w-auto h-full flex-row p-10 border focus:outline-none 
                            focus:ring-2 focus:ring-blue-600 rounded-sm m-10"></textarea>
                    <div><!--大输入框-->
                <input type="file" @change="handleFileUpload" class="px-5"/>
                </div><!--图片文件提交按钮，可能需要判断上交的是否是图片文件？-->
                <div class="flex  justify-center items-center h-11">
                    <button class=" bg-blue-400 text-black hover:bg-blue-800 over:text-white 
                        rounded-sm w-16 h-8 shadow-sm" @click="submitFile">提交</button>
                </div><!--提交按钮，之后触发判定，免得有人啥也不写就交了-->
                </div>
            </div> 
        </div>
        <footer class="text-center h-10">JHWL-Trial-8制作
        </footer><!--脚标-->
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    export default {
    data() {
    return {
        selectedFile: null,
        text:''
    };
    },
    components:{
            PageHead
        },
    methods: {
        handleFileUpload(event) {
        this.selectedFile = event.target.files[0]; // 获取选中的文件，这一段是从AI那里学来的
    },
    submitFile() {
        if(!this.text){
            alert("请输入描述！");//防止有人提交空白内容
            return;
        }
        const formData = new FormData();
        formData.append('file', this.selectedFile); // 将文件添加到FormData对象中
    }
  }
}
</script>