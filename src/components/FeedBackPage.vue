<template>
    <div class="flex flex-col min-h-screen">
        <PageHead></PageHead><!--这些内容和主页相似，不注释了-->
        <div class="flex-1 flex overflow-hidden">
            <div class=" p-10 w-80"><!--侧边栏-->
                <div class="flex flex-col w-60 min-h-screen p-10 bg-white 
                    border-red-400 border-t-2 rounded-lg shadow-lg">
                    <router-link to="/user" class="py-4 my-2 text-center font-semibold">个人信息</router-link>
                    <hr>
                    <router-link to="/cannedreply" class="py-4 my-2 text-center font-semibold">预设反馈信息</router-link>
                    <hr>
                    <router-link to="/controlluser" class="py-4 my-2 text-center font-semibold" v-if="role === 'SUPER_ADMIN'">用户账号管理</router-link>
                    <hr v-if="role === 'SUPER_ADMIN'">
                    <RouterLink class="py-4 my-2 text-center font-semibold" to="/statpage" v-if="role === 'SUPER_ADMIN'">大屏统计显示</RouterLink>
                    <hr v-if="role === 'SUPER_ADMIN'"><!--超级管理员才显示-->
                    <router-link to="/handlesapmpage" class="py-4 my-2 text-center font-semibold" v-if="role === 'SUPER_ADMIN'">处理垃圾信息信息</router-link>
                    <hr v-if="role === 'SUPER_ADMIN'">
                    <div class="w-auto rounded-md p-4"><!--信息显示-->
                    <img src="../assets/JHWL-Trial-8.jpg" alt="头像" class="flex">
                </div>
                <div class="py-4 my-2 text-center font-semibold">
                    {{ Username }}
                </div>
            </div>
            </div>
            <div class="flex-1 p-10">
                <div class="h-auto w-auto  rounded-lg shadow-lg"><!--主体内容，反馈的历史记录及通知-->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900 text-center">工单管理</h1>
                        <p class="text-gray-600 text-center">管理所有用户提交的反馈工单</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold mb-4">筛选条件</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <!-- 状态筛选 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                                <select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">全部状态</option>
                                    <option value="NEW">新建</option>
                                    <option value="CLAIMED">已认领</option>
                                    <option value="IN_PROGRESS">处理中</option>
                                    <option value="RESOLVED">已解决</option>
                                    <option value="CLOSED">已关闭</option>
                                </select>
                            </div>

                            <!-- 分类筛选 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
                                <select v-model="filters.category" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">全部分类</option>
                                    <option value="寝室用具">寝室用具</option>
                                    <option value="教室用具">教室用具</option>
                                    <option value="公共设施">公共设施</option>
                                    <option value="服务工作">服务工作</option>
                                    <option value="其他问题">其他问题</option>
                                </select>
                            </div>

                            <!-- 紧急程度 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">紧急程度</label>
                                <select v-model="filters.is_urgent" class="w-full border border-gray-300 rounded-md px-3 py-2 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option :value="null">全部</option>
                                    <option :value="true">仅紧急</option>
                                    <option :value="false">非紧急</option>
                                </select>
                            </div>

                            <!-- 对应管理员负责的工单 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">负责情况</label>
                                <select v-model="filters.assigned_to_me" class="w-full border border-gray-300 rounded-md 
                                    px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option :value="false">全部工单</option>
                                    <option :value="true">我负责的</option>
                                </select>
                            </div>
                            <!-- 操作按钮 -->
                            <div class="flex justify-between mt-4">
                                <button @click="resetFilters" class="px-4 py-2 border border-gray-300
                                    rounded-md text-gray-700 hover:bg-gray-50">
                                    重置筛选
                                </button>
                                <button @click="fetchTickets" class="px-4 py-2 bg-blue-600 text-white 
                                    rounded-md hover:bg-blue-700">
                                    应用筛选
                                </button>
                            </div>
                        </div>
                            <div class="flex-row col-span-1 md:col-span-2 lg:col-span-1 items-end">
                                <!-- 表格头部 -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex justify-between items-center">
                                        <h2 class="text-lg font-semibold">工单列表</h2>
                                        <div class="text-sm text-gray-600">
                                            显示 {{ tickets.length }} 条，共 {{ pagination.total }} 条
                                        </div>
                                    </div>
                                </div>

                                <!-- 加载状态 -->
                                <div v-if="loading" class="p-8 text-center">
                                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p class="mt-2 text-gray-600">加载中...</p>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50 w-full">
                                                <tr>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工单信息</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
                                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                                </tr>
                                            </thead>
                                                <tbody class="bg-white divide-y divide-gray-200 min-w-full">
                                                    <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50 cursor-pointer">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div>
                                                                    <div class="text-sm font-medium text-gray-900">{{ ticket.title.substring(0, 10) }}</div>
                                                                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ ticket.content.substring(0, 10) }}</div>
                                                                    <div class="flex items-center mt-1 space-x-2">
                                                                        <span v-if="ticket.is_urgent" class="inline-flex items-center px-2 py-1 rounded-sm 
                                                                            text-xs font-medium bg-red-100 text-red-800">紧急</span>
                                                                        <span v-if="ticket.is_anonymous" class="inline-flex items-center px-2 py-1 
                                                                            rounded-sm text-xs font-medium bg-gray-100 text-gray-800">匿名</span>
                                                                        <span v-else class="inline-flex items-center px-2 py-1 
                                                                            rounded-sm text-xs font-medium bg-gray-100 text-gray-800">用户:{{ ticket.id }}</span>
                                                                        <span v-if="ticket.image_ids" class="inline-flex items-center px-2 py-1 
                                                                            rounded-sm text-xs font-medium bg-gray-100 text-gray-800">包含图片</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <span :class="getStatusClasses(ticket.status)" class="inline-flex items-center px-2.5 py-0.5 
                                                                rounded-sm text-xs font-medium">
                                                                {{ getStatusText(ticket.status) }}
                                                            </span>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {{ ticket.category }}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {{ formatDate(ticket.created_at) }}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button v-if="!ticket.assigned_admin_id && ticket.status === 'NEW' " @click="claimTicket(ticket.id)"
                                                                class="text-blue-600 hover:text-blue-900 mr-3">
                                                                认领
                                                            </button>
                                                            <button v-if="ticket.assigned_admin_id === currentUserId && ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED'" @click="unclaimTicket(ticket.id)"
                                                                class="text-blue-600 hover:text-blue-900 mr-3">
                                                                撤销认领
                                                            </button>
                                                            <button class="text-green-600 hover:text-green-900" @click="ticket_detail(ticket.id)">
                                                                查看
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <!-- 分页 -->
                    <div v-if="!loading && tickets.length > 0" class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
                        <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-700">
                                第 {{ pagination.page }} 页，共 {{ Math.ceil(pagination.total / pagination.page_size) }} 页
                            </div>
                            <div class="flex space-x-2">
                                <button @click="prevPage" :disabled="pagination.page === 1" class="px-3 py-1 border border-gray-300 rounded-md
                                    text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    上一页
                                </button>
                                <button @click="nextPage" :disabled="pagination.page >= Math.ceil(pagination.total / pagination.page_size)"
                                    class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white 
                                    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    下一页
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="!loading && tickets.length === 0" class="p-8 text-center"><!--查找工单失败-->
                        <div class="text-5xl mb-4">📭</div>
                        <h3 class="text-lg font-medium text-gray-900 mb-1">暂无工单</h3>
                        <p class="text-gray-500">当前筛选条件下没有找到工单</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="iserror"><!--错误信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-red-500 font-semibold text-center py-2">操作失败！<hr></div>
                <div class="text-gray-500 text-center">{{ errormessages }}</div>
                <div class="flex items-center justify-center py-2">
                    <button 
                    type="button" @click="iserror=false"
                    class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">
                    返回
                    </button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="details"><!--详细信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div v-if="loading" class="text-xl text-gray-500 text-center">加载中<hr></div>
                <div class=" font-semibold text-center text-lg py-2">反馈详情</div>
                <hr>
                <div class="mt-4" v-if="complete">
                    <h3 class="text-lg mb-2 text-center">{{ ticket_details.title }}</h3>
                    <p class="text-gray-600 mb-3"><strong>问题描述:</strong>{{ ticket_details.content }}</p>
                    <div class="flex flex-wrap gap-2 mb-2">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {{ ticket_details.category }}
                            </span>
                            <span :class="getStatusClasses(ticket_details.status)" class="px-2 py-1 text-xs rounded">
                                {{ getStatusText(ticket_details.status) }}
                            </span>
                            <span v-if="ticket_details.is_urgent" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                紧急
                            </span>
                            <span v-if="ticket_details.is_anonymous" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                匿名
                            </span>
                            <span v-else class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                用户:{{ ticket_details.id }}
                            </span>
                            <span v-if="!ticket_details.assigned_admin_id" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                未认领
                            </span>
                    </div>

                    <div v-if="ticket_details.image_ids && ticket_details.image_ids.length > 0" class="mb-6"><!--附件图片-->
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">附件图片</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="imageId in ticket_details.image_ids" :key="imageId"class="relative group">
                                <!-- 使用图片显示组件 -->
                                <ImageDisplay :image-id="imageId" />
                            </div>
                        </div>
                    </div>

                    <div class="text-gray-500 text-sm">创建时间: {{ formatDate(ticket_details.created_at) }}</div>
                    <div class="text-gray-500 text-sm">最后更新时间: {{ formatDate(ticket_details.updated_at) }}</div>

                    <div v-if="ticket_details.assigned_admin_id" class="mb-6"><!--处理信息-->
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">处理信息</h2>
                        <div class="flex items-center space-x-4">
                            <div class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                负责人: 管理员 {{ ticket_details.assigned_admin_id }}
                            </div>
                            <div class="text-gray-500 text-sm">
                                认领时间: {{ formatDate(ticket_details.claimed_at) }}
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 mb-6" v-if="ticket_details.messages && ticket_details.messages.length > 0"><!--沟通信息-->
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">沟通记录</h2>
                        <div class="space-y-4">
                            <div v-for="message in ticket_details.messages" :key="message.id"
                                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                                <div class="flex justify-between items-center mb-2" v-if="!message.is_internal_note">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium text-gray-700">
                                            {{ message.is_internal_note ? '管理员' : '用户' }} {{ message.sender_user_id }}
                                        </span>
                                        <span  class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs" 
                                            v-if="message.is_internal_note">内部备注</span>
                                    </div>
                                    <span class="text-gray-500 text-sm">{{ formatDate(message.created_at) }}</span>
                                </div>
                                <p class="text-gray-600">{{ message.body }}</p>
                            </div>
                        </div>
                    </div>
                    <p v-else>暂无回复</p>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 mb-6" v-if="ticket_details.rating"><!--评分信息-->
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">评分</h2>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <div class="flex mr-4">
                                <span v-for="n in 5" :key="n" class="text-2xl":class="n <= ticket_details.rating.stars ? 
                                'text-yellow-500' : 'text-gray-300'">★</span>
                            </div>
                            <span class="text-lg font-medium text-gray-700">{{ ticket_details.rating.stars }} 星</span>
                        </div>
                        <p class="text-gray-600 mb-2">{{ ticket_details.rating.comment }}</p>
                        <p class="text-gray-500 text-sm">评分时间: {{ formatDate(ticket_details.rating.created_at) }}</p>
                    </div>
                </div>

                
                <div class="flex justify-between mt-4">
                    <button @click="addMessage = true"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        添加回复
                    </button>

                    <button @click="addingspam_flag = true" v-if="ticket_details.status !== 'RESOLVED' 
                    && ticket_details.status !== 'SPAM_PENDING' && ticket_details.status !== 'SPAM_CONFIRMED' && 
                    ticket_details.status !== 'SPAM_REJECTED' && ticket_details.status !== 'CLOSED'"
                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        标记为垃圾信息
                    </button>

                    <button @click="solved()" v-if="ticket_details.status !== 'RESOLVED' && ticket_details.assigned_admin_id === currentUserId
                    && ticket_details.status !== 'SPAM_PENDING' && ticket_details.status !== 'SPAM_CONFIRMED' && 
                    ticket_details.status !== 'SPAM_REJECTED' && ticket_details.status !== 'CLOSED'"
                        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        标记已处理
                    </button>

                    <button @click="close()" v-if="ticket_details.status === 'RESOLVED'"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        关闭工单
                    </button>

                </div>
                <div v-if="resolvedetails" class="mt-2">
                    <p class="text-red-500 text-sm mt-2 text-center">{{ resolvedetails }}</p>
                </div>
                <div class="flex items-center justify-center py-2">
                    <button type="button" @click="details=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded  
                    hover:bg-gray-400 transition">返回</button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="addMessage"><!--添加回复弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" font-semibold text-center text-lg py-2">添加回复</div>
                <hr>
                <div class="mt-4">
                    <textarea v-model="newMessageBody" rows="6" class="w-full p-2 border 
                    border-gray-300 rounded-lg" placeholder="请输入回复内容..."></textarea>
                </div>
                <div class="mt-4 flex items-center space-x-2">
                    <input type="checkbox" v-model="is_internal_note" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                    <label for="is_internal_note">后台提交(仅管理员可见)</label>
                </div>
                <span v-if="addingmessage" class="text-blue-500">正在上传回复...</span>
                <span v-if="completetime" class="text-green-500">回复成功，时间: {{ formatDate(completetime) }}</span>
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="addMessage=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                    <button type="button" @click="usecannedreplay" class="bg-green-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-green-400 transition">使用预设信息</button>
                    <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                        hover:bg-blue-600 transition" @click="addfeedbackmessage">
                    提交</button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isuescannedreplay"><!--使用预设信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" font-semibold text-center text-lg py-2">选择预设信息</div>
                <hr>

            <div class=" font-semibold text-black text-center p-2">预设反馈信息 (共{{ pagination2.total }}条)<hr></div>
                <div v-for="ticket in cannedreplies" :key="ticket.id" class="rounded p-4 mb-3">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold mb-2">{{ ticket.title }}</h3>
                            <p class="text-gray-600 mb-3">{{ ticket.body }}</p>
                            <div class="flex flex-wrap gap-2 mb-2">
                                <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                    管理员id:{{ ticket.admin_user_id }}
                                </span>
                            </div>
                        </div>
                        <div class="text-right text-sm text-gray-500 ml-4">
                            <div>{{ formatDate(ticket.created_at) }}</div>
                            <div>预设信息ID: {{ ticket.id }}</div>
                            <button @click="selectCannedReply(ticket)">选择</button>
                        </div>
                    </div>
                    <hr>
                </div>
                <div v-if="cannedreplies.length === 0" class="text-center py-4 text-lg">暂无反馈记录</div>
                <div  class="px-6 py-4 border-t border-gray-200"><!--分页组件-->
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-700">
                            第 {{ pagination2.page }} 页，共 {{ Math.ceil(pagination2.total / pagination2.page_size) }} 页
                        </div>
                        <div class="flex space-x-2">
                            <button @click="prevPage2" :disabled="pagination2.page === 1" class="px-3 py-1 border border-gray-300 rounded-md
                                text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                上一页
                            </button>
                            <button @click="nextPage2" :disabled="pagination2.page >= Math.ceil(pagination2.total / pagination2.page_size)"
                                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white 
                                hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                下一页
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="isloadingcannedreplies" class="text-center">正在加载预设信息...</div>
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="isuescannedreplay=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="addingspam_flag"><!--标记垃圾信息弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" font-semibold text-center text-lg py-2">备注标记理由</div>
                <hr>
                <div class="mt-4">
                    <textarea v-model="newMessageBody" rows="6" class="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="请输入您的理由..."></textarea>
                </div>
                <span v-if="addingingspam_flag" class="text-blue-500">正在上传申请...</span>
                <span v-if="completetime" class="text-green-500">申请成功，状态: {{completetime}}</span>
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="addingspam_flag=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                    <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded 
                        hover:bg-blue-600 transition" @click="addspam_flag">
                    提交</button>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="warning"><!--提示是否覆盖弹窗-->
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class=" font-semibold text-center text-lg py-2">是否覆盖？</div>
                <hr>
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <button type="button" @click="warning=false" class="bg-gray-300 text-gray-700 py-2 px-4 rounded 
                    hover:bg-gray-400 transition">取消</button>
                    <button type="button" class="bg-red-500 text-white py-2 px-4 rounded 
                        hover:bg-red-600 transition" @click="confrimslestcannedreply">
                    确认</button>
                </div>
            </div>
        </div>

        <PageFoot/>
    </div>
</template>
<script>
    import PageHead from './PageHead.vue';
    import axios from 'axios';
    import PageFoot from './PageFoot.vue';
    import ImageDisplay from './ImageDisplay.vue';
    export default{
        components:{
            PageHead,
            PageFoot,
            ImageDisplay
        },
        data(){
            return{
                Username:localStorage.getItem('username'),
                role:localStorage.getItem('role'),
                tickets: [],//反馈记录
                loading: false,
                filters: {//筛选条件
                    status: '',
                    category: '',
                    is_urgent: null,
                    assigned_to_me: false,
                    search: ''
                },
                pagination: {//分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                pagination2: {//预设信息分页信息
                    page: 1,
                    page_size: 5,
                    total: 0
                },
                stats: {//统计信息
                    total: 0,
                    new: 0,
                    urgent: 0,
                    assigned_to_me: 0
                },
                iserror: false,//是否出错
                errormessages: '',//错误信息
                ticket_details:{},//工单详细信息
                details:false,//是否显示详细信息
                loading_details:false,//是否正在加载详细信息
                complete:false,//是否已完成
                addMessage:false,//是否显示添加消息的弹窗
                newMessageBody:'',//新消息内容
                addingmessage:false,//是否正在上传消息
                completetime:'',//完成时间
                is_internal_note:false,//是否为内部备注
                currentUserId: parseInt(localStorage.getItem('id')),//当前用户ID
                addingspam_flag:false,//是否正在添加垃圾邮件标记
                addingingspam_flag:false,//是否正在上传垃圾邮件标记
                resolvedetails:'',//是否显示已解决的详细信息
                isuescannedreplay:false,//是否显示预设反馈信息
                cannedreplies:[],//预设反馈信息
                isloadingcannedreplies:false,//是否正在加载预设反馈信息
                warning:false, //是否显示警告信息
                selectedCannedReply:[]
            }
        },
        computed: {
            queryParams() {// 查询参数
                const params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size
                }

                // 添加筛选条件
                if (this.filters.status) params.status = this.filters.status
                if (this.filters.category) params.category = this.filters.category
                if (this.filters.is_urgent !== null) params.is_urgent = this.filters.is_urgent
                if (this.filters.assigned_to_me) params.assigned_to_me = true

                return params
            },
            queryParams2() {// 查询参数
                const params = {
                    page: this.pagination2.page,
                    page_size: this.pagination2.page_size
                }
                return params
            }
        },
        methods:{
            selectCannedReply(ticket) {
                this.selectedCannedReply = ticket
                if(this.newMessageBody!=this.selectedCannedReply.body){
                    this.warning=true
                    return
                }
                this.newMessageBody = ticket.body
                this.isuescannedreplay = false
            },
            confrimslestcannedreply(){
                this.warning=false
                this.newMessageBody = this.selectedCannedReply.body
                this.isuescannedreplay = false
            },
            usecannedreplay(){
                this.isuescannedreplay = true
                this.getcannedreplay()
            },
            async getcannedreplay(){
                this.isloadingcannedreplies = true
                try{
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/canned-replies',{params:this.queryParams2})
                    this.cannedreplies = response.data.items || []
                    this.isloadingcannedreplies = false
                }catch(error){
                    this.errormessages = error.response?.data?.details || '请检查网络连接'
                    this.iserror = true
                }
            },
            async close(){//关闭工单
                try{
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/close`)
                    this.ticket_detail(this.ticket_details.id)
                }catch(error){
                    this.errormessages = error.response?.data?.details || '请检查网络连接'
                    this.iserror = true
                }
            },
            async solved(){//标记已解决
                this.resolvedetails = ''
                try {
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/resolve`)
                    this.ticket_detail(this.ticket_details.id)
                    this.fetchTickets()
                } catch (error) {
                    this.resolvedetails = error.response?.data?.details || '请检查网络连接'
                    console.error('撤销认领工单失败:', error)
                }
            },
            async addspam_flag(){//添加垃圾邮件标记
                this.addingingspam_flag = true
                this.completetime=''
                try {
                    const response= await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/spam-flag`,{
                        reason: this.newMessageBody
                    })
                    this.addingingspam_flag = false
                    this.completetime = response.data.status
                    this.newMessageBody = ''

                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                    console.error('添加垃圾邮件标记失败:', error)
                }
            },
            async unclaimTicket(ticket) {//撤销认领工单
                try {
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${ticket}/unclaim`,{},
                    {headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }})

                    // 刷新列表
                    this.fetchTickets()

                } catch (error) {
                    console.error('撤销认领工单失败:', error)
                }
            },
            async claimTicket(ticket) {//认领工单
                try {
                    await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${ticket}/claim`,{},
                    {headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }})

                    // 刷新列表
                    this.fetchTickets()

                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.error || '请检查网络连接'
                    console.error('撤销认领工单失败:', error)
                }
            },
            async addfeedbackmessage(){//添加反馈消息
                this.addingmessage = true
                this.completetime = ''
                try{
                    const response = await axios.post(`http://46.203.124.16:8080/api/v1/tickets/${this.ticket_details.id}/messages`, {
                        body: this.newMessageBody,
                        is_internal_note: this.is_internal_note
                    })
                    this.completetime = response.data.created_at
                    this.newMessageBody = ''
                    this.addingmessage = false
                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                    this.addingmessage = false
                }
            },
            details_show(){//显示详细信息
                this.details=true
            },
            async ticket_detail(id){//获取详细信息
                this.details_show()
                this.completetime = ''
                this.ticket_details = {}
                this.complete = false
                this.resolvedetails = ''
                try{
                    this.loading = true
                    const response = await axios.get(`http://46.203.124.16:8080/api/v1/tickets/${id}`)
                    this.ticket_details = response.data
                    this.loading = false
                    this.complete = true
                }
                catch(error){
                    this.details = false
                    this.loading = false
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                }
            },

            prevPage() {//上一页
                if (this.pagination.page > 1) {
                    this.pagination.page--
                    this.fetchTickets()
                }
            },
            nextPage() {//下一页
                if (this.pagination.page < Math.ceil(this.pagination.total / this.pagination.page_size)) {
                    this.pagination.page++
                    this.fetchTickets()
                }
            },

            prevPage2() {//上一页
                if (this.pagination2.page > 1) {
                    this.pagination2.page--
                    this.getcannedreplay()
                }
            },
            nextPage2() {//下一页
                if (this.pagination2.page < Math.ceil(this.pagination2.total / this.pagination2.page_size)) {
                    this.pagination2.page++
                    this.getcannedreplay()
                }
            },

            async fetchTickets() {//获取反馈记录
                this.loading = true
                try {
                    const response = await axios.get('http://46.203.124.16:8080/api/v1/tickets', {
                    params: this.queryParams,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                this.tickets = response.data.items || []
                this.pagination.total = response.data.total || 0

                // 更新统计信息（这里需要根据实际情况调整）
                //this.updateStats()

                } catch (error) {
                    this.iserror = true
                    this.errormessages = error.response?.data?.message || '请检查网络连接'
                } finally {
                    this.loading = false
                }
            },
            getStatusText(status) {//获取状态文本
                const statusMap = {
                    'NEW': '新建',
                    'CLAIMED': '已认领',
                    'IN_PROGRESS': '处理中',
                    'RESOLVED': '已解决',
                    'CLOSED': '已关闭',
                    'SPAM_PENDING': '超管审核中',
                    'SPAM_CONFIRMED': '垃圾信息',
                    'SPAM_REJECTED': '非垃圾信息'
                }
                return statusMap[status] || status
            },

            getStatusClasses(status) {//获取状态类
                const classMap = {
                    'NEW': 'bg-blue-100 text-blue-800',
                    'CLAIMED': 'bg-yellow-100 text-yellow-800',
                    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
                    'RESOLVED': 'bg-green-100 text-green-800',
                    'CLOSED': 'bg-gray-100 text-gray-800',
                    'SPAM_CONFIRMED':'bg-yellow-100 text-gray-800'
                }
                return classMap[status] || 'bg-gray-100 text-gray-800'
            }, 

            formatDate(dateString) {//格式化日期
                return new Date(dateString).toLocaleDateString('zh-CN')
            },

            resetFilters() {//重置筛选条件
                this.filters = {
                    status: '',
                    category: '',
                    is_urgent: null,
                    assigned_to_me: false,
                    search: ''
                }
                this.pagination.page = 1
                this.fetchTickets()
            },
        },
        mounted(){//每次进入获取一次工单列表
            this.fetchTickets()
        },
        watch: {// 当分页参数变化时自动获取数据
            'pagination.page'() {
                this.fetchTickets()
            },
            'pagination.page_size'() {
                this.pagination.page = 1
                this.fetchTickets()
            }
        }
    }
</script>