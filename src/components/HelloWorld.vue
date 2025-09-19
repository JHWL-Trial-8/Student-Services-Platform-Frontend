<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
    
    <!-- 右侧内容区 -->
    <div class="flex-1 flex flex-col">
      <!-- 顶部导航 -->
      <div class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-100 rounded-full !rounded-button whitespace-nowrap" @click="toggleNav">
            <i :class="['fas', isNavCollapsed ? 'fa-bars' : 'fa-times']"></i>
          </button>
          <h1 class="text-lg font-medium">AI 生成界面</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-100 rounded-full !rounded-button whitespace-nowrap">
            <i class="fas fa-search"></i>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full !rounded-button whitespace-nowrap">
            <i class="fas fa-cog"></i>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full !rounded-button whitespace-nowrap">
            <i class="fas fa-expand"></i>
          </button>
        </div>
      </div>
      <!-- 主要内容区 -->
      <div class="flex-1 p-6 bg-gray-50">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="mb-6">
              <p class="text-gray-500 mb-2">简单描述您想要的界面或功能</p>
              <div class="relative">
<textarea
    class="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="请输入您的需求描述..."
    v-model="description"
></textarea>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-1">
                <div class="relative inline-block w-40">
                  <button class="w-full bg-gray-100 px-4 py-2 text-left flex items-center justify-between !rounded-button whitespace-nowrap"
                          @click="toggleFrameworkDropdown">
                    <span>Vue2</span>
                    <i class="fas fa-chevron-down text-gray-400"></i>
                  </button>
                </div>
              </div>
              <button class="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded !rounded-button whitespace-nowrap">
                <i class="far fa-image"></i>
                <span>上传参考图</span>
              </button>
              <button class="bg-blue-600 text-white px-6 py-2 flex items-center space-x-2 !rounded-button whitespace-nowrap">
                <i class="fas fa-magic"></i>
                <span>生成界面</span>
              </button>
            </div>
          </div>
          <!-- 推荐模板 -->
          <div class="mt-8">
            <h3 class="text-lg font-medium mb-4">推荐模板</h3>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="i" class="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div class="h-40 bg-gray-100 relative overflow-hidden">
                  <img :src="getTemplateImage(i)" class="w-full h-full object-cover object-top" alt="模板预览" />
                </div>
                <div class="p-4">
                  <h4 class="font-medium">{{ getTemplateTitle(i) }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ getTemplateDesc(i) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      isNavCollapsed: false,
      selectedView: 'desktop',
      description: '',
      showFrameworkDropdown: false,
      templates: [
        {
          title: '电子商务管理后台',
          desc: '包含数据统计、订单管理、商品管理等功能的后台系统'
        },
        {
          title: '企业官网首页',
          desc: '现代简约风格的企业展示网站首页设计'
        },
        {
          title: '社交媒体仪表板',
          desc: '用于监控和管理社交媒体数据的分析面板'
        },
        {
          title: '在线教育平台',
          desc: '集成视频播放、课程管理的在线学习系统'
        }
      ]
    };
  },
  methods: {
    toggleNav() {
      this.isNavCollapsed = !this.isNavCollapsed;
    },
    toggleFrameworkDropdown() {
      this.showFrameworkDropdown = !this.showFrameworkDropdown;
    },
    getTemplateImage(index) {
// 为每个模板生成不同的图片
      const prompts = [
        'A modern dashboard interface with clean design, data visualization charts and statistics panels, soft gradient background in light blue and white, professional business style',
        'A minimalist corporate website homepage with hero section, featuring modern design elements, subtle animations, and professional business imagery on clean white background',
        'A social media analytics dashboard showing various charts, graphs and data visualization elements, with a modern and clean interface design on white background',
        'An online learning platform interface showing video player and course materials, with a professional educational design theme on light background'
      ];
      return `https://mastergo.com/ai/api/search-image?query=${prompts[index-1]}&width=600&height=400&orientation=landscape`;
    },
    getTemplateTitle(index) {
      return this.templates[index-1].title;
    },
    getTemplateDesc(index) {
      return this.templates[index-1].desc;
    }
  }
};
</script>
<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
}



.create-button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.create-button i {
  font-size: 14px;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-nav {
  height: 56px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-button {
  padding: 8px;
  border-radius: 50%;
}

.nav-button:hover {
  background-color: #f3f4f6;
}

/* 去除number input的箭头 */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
  
</style>