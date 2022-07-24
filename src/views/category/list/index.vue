<template>
  <el-card shadow="never">
    <div class="buttonCss">
      <el-button size="small" type="primary" @click="handleOpenDrawer"
        >新增</el-button
      >
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="refresh">
          <el-icon>
            <svg-icon icon="reload"></svg-icon>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-tree
      v-loading="loading"
      :data="categoryList"
      :props="{ label: 'name', children: 'child' }"
      node-key="id"
    >
      <template #default="{ data }">
        <div class="custom-tree-node">
          <span>{{ data.name }}</span>
          <span>
            <el-button
              text
              type="primary"
              @click="handleShowGoods(data.id)"
              size="small"
              >推荐商品</el-button
            >
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, data)"
            />
            <el-button
              text
              type="primary"
              size="small"
              @click.stop="handleOpenDrawer(data)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否要删除该记录？"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(data.id)"
            >
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </div>
      </template>
    </el-tree>
    <!-- 弹出Drawer -->
    <el-drawer
      v-model="drawer"
      :title="title"
      :direction="direction"
      :before-close="handleCancel"
    >
      <template #default>
        <el-form ref="cateFormRef" :inline="true" :model="cateForm">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="cateForm.name" placeholder="分类名称" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">提交</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 推荐商品 -->
    <el-drawer v-model="tableDrawer" title="推荐商品" :direction="direction">
      <el-table border stripe :data="drawerData">
        <el-table-column align="center" property="id" label="ID" />
        <el-table-column align="center" property="goods" label="商品封面">
          <template #default="scope">
            <el-image
              fit="cover"
              style="
                width: 50px;
                height: 50px;
                border-radius: 5px;
                margin-right: 15px;
              "
              :src="scope.row.cover"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" property="name" label="商品名称" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-popconfirm
              title="是否要删除该记录？"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDeleteGoods(scope.row)"
            >
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="handleConnect">关联</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goodsApi from '@/api/goods'
import { ElNotification } from 'element-plus'
const categoryList = ref()
const loading = ref()
const direction = ref('rtl')
const drawer = ref(false)
const tableDrawer = ref(false)
const drawerData = ref()
const title = ref()
const cateFormRef = ref()
const cateId = ref()
const showGoodsId = ref()
const cateForm = reactive({
  name: ''
})
// 获取分类列表
const getCategory = async () => {
  loading.value = true
  const res = await goodsApi.getCategory()
  categoryList.value = res.data
  loading.value = false
}
getCategory()
// 修改状态
const handleStatusChange = async (val, data) => {
  await goodsApi.changeStatus(data.id, val)
  await ElNotification({
    message: '修改状态成功',
    type: 'success'
  })
  getCategory()
}
// 弹出Drawer
const handleOpenDrawer = (data) => {
  drawer.value = true
  if (data) {
    title.value = '修改'
    handleEdit(data)
  } else {
    title.value = '新增'
  }
}
// 修改回填
const handleEdit = (data) => {
  title.value = '修改'
  cateForm.name = data.name
  cateId.value = data.id
}
// 确认
const handleConfirm = async () => {
  if (title.value === '新增') {
    await goodsApi.addCategory(cateForm)
    ElNotification({
      message: '新增成功',
      type: 'success'
    })
  }
  if (cateId.value) {
    await goodsApi.editCategory(cateId.value, cateForm)
    ElNotification({
      message: '修改成功',
      type: 'success'
    })
  }
  drawer.value = false
  cateFormRef.value.resetFields()
  getCategory()
}
// 推荐商品
const handleShowGoods = async (id) => {
  showGoodsId.value = id
  const res = await goodsApi.showCategory({ category_id: id })
  tableDrawer.value = true
  drawerData.value = res.data
}
// 关闭
const handleCancel = () => {
  cateFormRef.value.resetFields()
  drawer.value = false
}
// 删除
const handleDelete = async (id) => {
  await goodsApi.deleteCategory(id)
  ElNotification({
    message: '删除成功',
    type: 'success'
  })
  getCategory()
}
// 重置数据
const refresh = () => {
  getCategory()
}
// 删除table表格
const handleDeleteGoods = async (row) => {
  await goodsApi.deleteGoods(row.id)
  ElNotification({
    message: '删除成功',
    type: 'success'
  })
  handleShowGoods(showGoodsId.value)
}
// 关联
const handleConnect = () => {}
</script>
<style scoped lang="scss">
:deep(.el-tree-node__content) {
  padding: 10px 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.buttonCss {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
