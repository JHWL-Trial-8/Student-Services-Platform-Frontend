<template>
    <div class="h-full w-full bg-gray-50 flex flex-col">
        <PageHead></PageHead><!--页面头-->
        <div class=" min-h-screen min-w-full bg-gray-100 shadow-md rounded-md p-10 flex-1 flex overflow-hidden">
            <div class=" w-80"><!--侧边栏-->
                <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                        border-red-400 border-t-2 rounded-lg shadow-lg">
                    <router-link to="/home" class="py-4 my-2 text-center font-semibold">反馈记录</router-link>
                    <hr>
                    <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                    <hr>
                    <div class="w-auto rounded-md p-4"><!--信息显示-->
                        <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                    </div>
                    <div class="py-4 my-2 text-center font-semibold">
                        {{ username }}
                    </div><!--此bug已被修复，猜猜原来是什么O_O-->
                </div>
            </div>


            <div class="flex-1 p-10 flex-row">
                <div class="h-auto w-auto bg-white rounded-lg shadow-lg">
                    <div class="flex py-4 px-2">
                        <div class=" h-10 w-80 py-1 rounded shadow-sm flex">
                            <div class="p-1">标题:   </div>
                            <input type="text" v-model="title" class=" p-1"><!--标题-->
                        </div>
                    </div>
                    <div class="category-selector mb-4">
                        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                            问题分类
                        </label>
                        <select v-model="category"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled>请选择问题分类</option>
                            <option value="寝室用具">寝室用具</option>
                            <option value="教室用具">教室用具</option>
                            <option value="公共设施">公共设施</option>
                            <option value="服务工作">服务工作</option>
                            <option value="其他问题">其他问题</option>
                        </select>
                    </div>
                    <textarea name="shurukuang" id="shurukuang" placeholder="请输入问题描述" v-model="text"
                        class=" w-auto h-full flex-row p-10 border focus:outline-none 
                        focus:ring-2 focus:ring-blue-600 rounded-sm m-10"></textarea>
                    <div><!--大输入框-->
                    </div><!--图片文件提交按钮,并且还是多图片提交-->
                    <div class="checkbox-group px-2 flex-row">
                        <div class="checkbox-item py-2">
                            <input type="checkbox" id="urgent" v-model="isUrgent">
                            <label for="urgent">紧急问题</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="anonymous" v-model="isAnonymous">
                            <label for="anonymous">匿名提交</label>
                        </div>
                    </div>
                    <div class="flex py-2 px-2 flex-row">
                        <button class="h-8 w-32 bg-blue-400 p-2 flex items-center justify-center text-white rounded hover:bg-blue-500" 
                                @click="triggerFileInput">选择图片</button>
                        <!-- 隐藏的文件输入框 -->
                        <input type="file" ref="fileInput" class="file-input" multiple accept="image/*" @change="handleFileUpload">
                        <div class="px-2">
                            <button class="h-8 w-32 bg-blue-400 p-2 flex items-center 
                            justify-center text-white rounded hover:bg-blue-500" @click="submitFile">提交</button>
                            <!--提交按钮，之后触发判定，免得有人啥也不写就交了-->
                        </div>
                    </div>
                    <!-- 显示已选择的文件 -->
                    <div v-if="files.length > 0" class="ml-10 mt-2">
                        <p class="text-sm text-gray-600">已选择 {{ files.length }} 个文件：</p>
                        <ul class="text-xs text-gray-500 mt-1">
                            <li v-for="(file, index) in files" :key="index" class="truncate">
                                {{ file.name }}
                                <button @click="removeImage(index)" class="text-red-500">×</button>
                            </li>
                        </ul>
                    </div>
                    <div v-if="uploading" class="ml-10 mt-4">
                        <p class="text-sm text-blue-600">正在上传 {{ currentUploadIndex + 1 }}/{{ files.length }}...</p>
                    </div>
                </div>
            </div> 
        </div>


        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iscomplete"><!--小弹窗(·-·)-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" text-lg text-center">所有图片上传成功！正在上传反馈...</div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="success">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" text-lg text-center">上传成功！</div>
                <div class=" text-sm text-center text-gray-400">{{completetime}}</div>
                <hr>
                <div class="flex justify-end space-x-3 py-2 items-center">
                    <button 
                        type="button" @click="success=false" 
                        class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                        hover:bg-gray-400 transition">
                        返回
                    </button>
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="uploadmessageerror">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" text-lg text-center">{{ errormessage }}</div>
                <hr>
                <div class="flex justify-end space-x-3 py-2 items-center">
                    <button 
                        type="button" @click="uploadmessageerror=false" 
                        class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                        hover:bg-gray-400 transition">
                        返回
                    </button>
                </div>
            </div>
        </div>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" text-lg text-center py-2">上传失败！</div>
                <div class=" text-sm text-center">{{ errormessage }}</div>
                <hr>
                <div class="flex justify-end space-x-3 py-2 items-center">
                    <button 
                        type="button" @click="iserror=false" 
                        class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                        hover:bg-gray-400 transition">
                        返回
                    </button>
                </div>
            </div>
        </div>
        <footer class="text-center h-10">JHWL-Trial-8制作
        </footer><!--脚标-->
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    import axios from 'axios'
    export default {
        data() {
            return {
                text:'',
                username:localStorage.getItem('username'),
                files: [], // 用于存储多个文件
                iscomplete:false,
                iserror:false,
                uploading: false,
                currentUploadIndex: 0,
                errormessage:'',
                img:[],
                uploadmessageerror:false,
                title:'',
                isUrgent: false,
                isAnonymous: false,
                completetime:'',
                success:false,
                category: '',
                categories: [
                    { value: '寝室用具', label: '寝室用具' },
                    { value: '教室用具', label: '教室用具' },
                    { value: '公共设施', label: '公共设施' },
                    { value: '服务工作', label: '服务工作' },
                    { value: '其他问题', label: '其他问题' }]
            };
        },
        components:{
            PageHead
        },
        methods: {
            handleFileUpload(event) {
                // 处理多文件选择
                this.files = Array.from(event.target.files);
            },
            async uploadSingleFile(file) {
                const formData = new FormData();
                // 根据接口要求，参数名为"file"
                formData.append('file', file);
                await axios.post('http://46.203.124.16:8080/api/v1/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    // 添加超时设置
                    timeout: 30000,
                }).then(response=>{
                    const imginformation=response.data
                    this.img.push(imginformation.image_id)
                })
               
            },
            async submitFile() {
                if(!this.text){
                    this.errormessage='反馈信息不能为空！'
                    this.uploadmessageerror=true
                    return;
                }
                if(!this.title){
                    this.errormessage='为反馈信息起个标题吧'
                    this.uploadmessageerror=true
                    return;
                }
                if(!this.category){
                    this.errormessage='为反馈信息分一下类吧'
                    this.uploadmessageerror=true
                    return;
                }
                if(this.files.length !== 0) {
                    this.uploading = true;
                    this.currentUploadIndex = 0;
                    try {
                        // 循环上传每个文件
                        for (let i = 0; i < this.files.length; i++) {
                            this.currentUploadIndex = i;
                            await this.uploadSingleFile(this.files[i]);
                        }
                        this.text = '';
                        this.files = [];
                    } catch (error) {
                        this.errormessage=error.response.data.message
                        this.iserror=true
                    } finally {
                        this.uploading = false;
                        this.iscomplete = this.iserror ? false : true
                        console.log(this.img)
                    }
                }
                await axios.post('http://46.203.124.16:8080/api/v1/tickets',{
                    title:this.title,
                    content:this.text,
                    category:this.category,
                    is_urgent:this.isUrgent,
                    is_anonymous:this.isAnonymous,
                    image_ids:this.img
                }).then(response=>{
                    const ticketimformation=response.data
                    this.completetime=ticketimformation.created_at
                    this.success=true
                    this.iscomplete=false
                })
            },
            triggerFileInput() {
                // 通过refs访问文件输入框并触发点击,这也是DS写的,千万不要问我这个原理是什么!_!
                this.$refs.fileInput.click();
            },
            removeImage(index){
                this.files.splice(index, 1);
            }
        },
    }
</script>
<style scoped>
    .file-input {
        display: none;
    }
</style><!--你猜为什么会在vue里出现这个，因为这段是从DS那里搬来的T_T-->