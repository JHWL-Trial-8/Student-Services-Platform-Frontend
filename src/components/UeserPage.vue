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
                        <div class=" p-1">{{ username }}</div>
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">学院:   </div>
                        <div class=" p-1">{{ acadymic }}</div>
                    </div>
                </div>
                <div class="flex py-4">
                    <div class="bg-gray-300 h-10 w-80 py-1 rounded shadow-sm flex">
                        <div class="p-1">邮箱:   </div>
                        <div class=" p-1">{{ email }}</div>
                    </div>
                </div>
                <div class="flex py-4">
                    <button class="w-24 h-12 bg-blue-500 rounded p-2 text-white
                        hover:bg-blue-700 hover:text-black" @click="compile()">
                        编辑
                    </button>
                </div>
            </div>
    </div>
    <footer class="text-center h-10">JHWL-Trial-8制作
    </footer>
</template>
<script>
import { compile } from 'vue';
import PageHead from './PageHead.vue';
    export default{
        data(){
            return{
                email:localStorage.getItem('email'),
                acadymic:localStorage.getItem('acadymic'),
                username:localStorage.getItem('username')
            }
        },
        components:{
            PageHead
        },
        methods:{
            compile(){
                this.$router.push('/compileuser')
            }
        }
    }
</script>