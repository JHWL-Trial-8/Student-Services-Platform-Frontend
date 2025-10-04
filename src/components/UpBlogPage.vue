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

    <div class="flex-1 p-6 justify-items-center">
        <div class="bg-white rounded-xl shadow-lg p-6 w-full">
            <!-- 标题输入区域 -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">标题</label>
                <div class="flex items-center">
                    <input type="text" v-model="title" placeholder="请输入问题标题..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                </div>
            </div>

            <!-- 分类选择 -->
            <div class="category-selector mb-6">
                <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                    问题分类
                </label>
                <select v-model="category"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-200 bg-white">
                    <option value="" disabled>请选择问题分类</option>
                    <option value="寝室用具">寝室用具</option>
                    <option value="教室用具">教室用具</option>
                    <option value="公共设施">公共设施</option>
                    <option value="服务工作">服务工作</option>
                    <option value="其他问题">其他问题</option>
                </select>
            </div>

            <!-- 问题描述 -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">问题描述</label>
                <textarea 
                    placeholder="请详细描述您遇到的问题..." 
                    v-model="text"
                    class="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    resize-vertical transition-all duration-200"></textarea>
            </div>

            <!-- 复选框选项 -->
            <div class="checkbox-group mb-6">
                <div class="flex items-center space-x-6">
                    <div class="checkbox-item flex items-center">
                        <input type="checkbox" id="urgent" v-model="isUrgent"
                            class="w-4 h-4 text-blue-600 border-gray-300
                            rounded focus:ring-blue-500">
                        <label for="urgent" class="ml-2 text-sm text-gray-700">紧急问题</label>
                    </div>
                    <div class="checkbox-item flex items-center">
                        <input type="checkbox" id="anonymous" v-model="isAnonymous"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        <label for="anonymous" class="ml-2 text-sm text-gray-700">匿名提交</label>
                    </div>
                </div>
            </div>

            <!-- 图片上传区域 -->
            <div class="mb-6">
                <div class="flex items-center space-x-4">
                    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                        transition-all duration-200 flex items-center space-x-2"
                        @click="triggerFileInput">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 
                            20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span>选择图片</span>
                    </button>
                
                    <!-- 隐藏的文件输入框 -->
                    <input type="file" ref="fileInput" class="hidden" multiple accept="image/*" @change="handleFileUpload">
                
                    <button 
                        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
                        @click="submitFile">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        <span>提交反馈</span>
                    </button>
                </div>
            </div>

            <!-- 已选择文件显示 -->
            <div v-if="files.length > 0" class="mt-4 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-700 mb-2">已选择 {{ files.length }} 个文件：</p>
                <div class="space-y-2">
                    <div v-for="(file, index) in files" :key="index" 
                        class="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-200">
                        <span class="text-sm text-gray-600 truncate flex-1">{{ file.name }}</span>
                        <button @click="removeImage(index)" 
                            class="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 上传进度 -->
            <div v-if="uploading" class="mt-4 p-3 bg-blue-50 rounded-lg">
                <div class="flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    <p class="text-sm text-blue-600">正在上传 {{ currentUploadIndex + 1 }}/{{ files.length }}...</p>
                </div>
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
                <div class=" text-sm text-center text-gray-400">{{ formatDate(completetime) }}</div>
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
            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleDateString('zh-CN')
            },
            handleFileUpload(event) {
                // 处理多文件选择
                this.files = Array.from(event.target.files);
            },
            async uploadSingleFile(file) {
                const formData = new FormData();
                // 根据接口要求，参数名为"file"
                formData.append('file', file);
                const token = localStorage.getItem('access_token')
                await axios.post('http://46.203.124.16:8080/api/v1/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`  // 添加认证头
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
                const token = localStorage.getItem('access_token')
                if(this.files.length !== 0) {
                    this.uploading = true;
                    this.currentUploadIndex = 0;
                    try {
                        // 循环上传每个文件
                        for (let i = 0; i < this.files.length; i++) {
                            this.currentUploadIndex = i;
                            await this.uploadSingleFile(this.files[i]);
                        }
                        this.files = [];
                    } catch (error) {
                        this.errormessage=error.response.data.message
                        this.iserror=true
                    } finally {
                        this.uploading = false;
                        this.iscomplete = this.iserror ? false : true
                    }
                }
                try{
                    await axios.post('http://46.203.124.16:8080/api/v1/tickets',{
                        title:this.title,
                        content:this.text,
                        category:this.category,
                        is_urgent:this.isUrgent,
                        is_anonymous:this.isAnonymous,
                        image_ids:this.img
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`  // 添加认证头
                        }
                    }).then(response=>{
                        const ticketimformation=response.data
                        this.completetime=ticketimformation.created_at
                        this.success=true
                        this.iscomplete=false
                    })
                } catch (error) {
                    this.errormessage=error.response.data.message
                    this.iserror=true
                    console.log(error)
                }
                
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