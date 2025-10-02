<template>
    <div class="p-4">
        <!-- 图片显示区域 -->
        <div v-if="imageUrl" class="mb-4">
            <div @click="previewImage(imageUrl)" class="cursor-pointer mb-2 text-blue-500 hover:underline">
                <img :src="imageUrl" :alt="imageName" class="max-w-full h-auto rounded-lg shadow-md">
                <p class="mt-2 text-sm text-gray-600">{{ imageName }}</p>
            </div>
        </div>
    
        <!-- 加载状态 -->
        <div v-else-if="loading" class="text-center py-2">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-2 text-gray-600">图片加载中...</p>
        </div>
    
        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-8 text-red-600">
            <p>图片加载失败</p>
            <button @click="loadImage" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                重试
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        props: {
            imageId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                imageUrl: null,
                imageName: '',
                loading: false,
                error: false
            }
        },
        methods: {
            async loadImage() {
                this.loading = true
                this.error = false
                try {
                    const response = await axios.get(`http://46.203.124.16:8080/api/v1/images/${this.imageId}`, {
                        responseType: 'blob', // 重要：指定响应类型为 blob
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                    
                    // 创建 Blob URL
                     const blob = new Blob([response.data], { type: response.headers['content-type'] })
                    this.imageUrl = URL.createObjectURL(blob)
        
                    // 从响应头获取文件名
                   const contentDisposition = response.headers['content-disposition']
                    if (contentDisposition) {
                        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
                        this.imageName = filenameMatch ? filenameMatch[1] : `image-${this.imageId}`
                   } else {
                        this.imageName = `image-${this.imageId}`
                    }
        
                    } catch (error) {
                        console.error('加载图片失败:', error)
                        this.error = true
                    } finally {
                        this.loading = false
                    }
            },
            previewImage(imageUrl) {
                window.open(imageUrl)
            }
        },
        mounted() {
            this.loadImage()
        },
        watch: {
            imageId() {
                // 如果 imageId 变化，重新加载图片
                if (this.imageUrl) {
                    URL.revokeObjectURL(this.imageUrl) // 释放之前的 URL
                    this.imageUrl = null
                }
                this.loadImage()
            }
        },
        beforeUnmount() {
            // 组件销毁时释放 Blob URL，避免内存泄漏
            if (this.imageUrl) {
                URL.revokeObjectURL(this.imageUrl)
            }
        }
    }
</script>