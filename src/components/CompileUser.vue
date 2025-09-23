<template>
    <div class="h-full w-full bg-gray-50 flex justify-center flex-col">
        <PageHead></PageHead>
            <div class="flex flex-col items-center my-12">
                <div class="relative group">
                    <div class="w-32 h-32 rounded-full overflow-hidden shadow-sm">
                        <img src="../assets/JHWL-Trial-8.jpg"
                            class="w-full h-full object-cover"
                            alt="用户头像"/>
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">用户名:</div>
                        <input type="text":placeholder="user" class="flex-row p-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                            placeholder="username" v-model="username">
                    </div>
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
                    </button>
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
                username:localStorage.getItem('email'),
                email:localStorage.getItem('email'),
                acadymic:localStorage.getItem('email')
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
                alert("保存成功")
                this.$router.push('/user');
            },
        }
    }
</script>