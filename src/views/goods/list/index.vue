<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="changeGoodsData">
    <el-tab-pane
      v-for="(item, index) in tabPane"
      :key="index"
      :label="item.label"
      :name="item.name"
    ></el-tab-pane>
  </el-tabs>
  <el-card shadow="never">
    <el-row class="rowHeader">
      <el-col :span="8">
        <el-form ref="goodsRef" :model="goodsForm">
          <el-form-item label="关键词" prop="title">
            <el-input
              class="goodsInput"
              size="small"
              clearable
              placeholder="商品名称"
              v-model.trim="goodsForm.title"
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" v-if="showStatus">
        <el-form ref="goodsRef" :model="categoryForm">
          <el-form-item label="商品分类" prop="category_id">
            <el-select
              v-model="categoryForm.category_id"
              placeholder="请选择商品分类"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="colButton">
        <div class="headerButton">
          <el-button type="primary" size="small" @click="handleSearch"
            >搜索</el-button
          >
          <el-button size="small" @click="resetForm">重置</el-button>
          <el-button
            v-if="!showStatus"
            text
            type="primary"
            size="small"
            @click="handleShow"
            >展开<el-icon><ArrowDown /></el-icon
          ></el-button>
          <el-button v-else text type="primary" size="small" @click="handleShow"
            >收起<el-icon><ArrowUp /></el-icon
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <div class="buttonCss">
      <div>
        <el-button size="small" type="primary">新增</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
        <el-button size="small">上架</el-button>
        <el-button size="small">下架</el-button>
      </div>
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="refresh">
          <el-icon>
            <svg-icon icon="reload"></svg-icon>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table v-loading="loading" :data="goodsList" stripe style="width: 100%">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="date" label="商品" width="300">
        <template #default="scope">
          <div class="box">
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
            <div>
              <p>{{ scope.row.title }}</p>
              <div>
                <span class="redText">￥{{ scope.row.min_price }}</span>
                <el-divider direction="vertical" />
                <span class="textColor">￥{{ scope.row.min_oprice }}</span>
              </div>
              <p class="category">
                分类:{{
                  scope.row.category ? scope.row.category.name : '未分类'
                }}
              </p>
              <p class="createTime">创建时间:{{ scope.row.create_time }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="discount" label="实际销量" />
      <el-table-column align="center" prop="status" label="商品状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">仓库</el-tag>
          <el-tag v-else type="success">上架</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ischeck" label="审核状态" />
      <el-table-column align="center" prop="stock" label="总库存" />
      <el-table-column label="操作" align="center" fixed="right" width="400">
        <template #default="scope">
          <el-button
            text
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            :type="
              (scope.row.goods_skus && scope.row.goods_skus.length > 0) ||
              scope.row.sku_value
                ? 'primary'
                : 'danger'
            "
            text
            size="small"
            >商品规格</el-button
          >
          <el-button
            :type="
              scope.row.goods_banner && scope.row.goods_banner.length > 0
                ? 'primary'
                : 'danger'
            "
            text
            size="small"
            >设置轮播图</el-button
          >
          <el-button
            :type="scope.row.content ? 'primary' : 'danger'"
            text
            size="small"
            >商品详情</el-button
          >
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
            title="是否要删除该商品？"
          >
            <template #reference>
              <el-button type="primary" text size="small">删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="page"
        @current-change="handleCurrentChange"
        background
        :total="Number(total)"
        layout="prev, pager, next"
      />
    </div>
  </el-card>
</template>
<script setup>
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import goodsApi from '@/api/goods'
const tabPane = [
  {
    label: '全部',
    name: 'all'
  },
  {
    label: '审核中',
    name: 'checking'
  },
  {
    label: '出售中',
    name: 'saling'
  },
  {
    label: '已下架',
    name: 'off'
  },
  {
    label: '库存预警',
    name: 'min_stock'
  },
  {
    label: '回收站',
    name: 'delete'
  }
]
// 搜索title
const goodsForm = reactive({
  title: ''
})
// 搜索分类id
const categoryForm = reactive({
  category_id: ''
})
const showStatus = ref(false)
const goodsRef = ref()
const loading = ref()
const activeName = ref('all')
const goodsList = ref()
const categoryList = ref()
const total = ref()
const page = ref(1)
// 初始化表格数据
const getGoodsData = async (data) => {
  loading.value = true
  const obj = {
    ...data,
    tab: activeName.value
  }
  const res = await goodsApi.getTab(obj, page.value)
  goodsList.value = res.data.list
  total.value = res.data.totalCount
  loading.value = false
}
getGoodsData()
// 初始化分类数据
const getCategory = async () => {
  const res = await goodsApi.getCategory()
  categoryList.value = res.data
}
getCategory()
// 改变tabs触发
const changeGoodsData = async (tab) => {
  activeName.value = tab
  if (activeName.value === tab) {
    await getGoodsData()
  }
}
// 点击分页
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getGoodsData()
}
// 搜索
const handleSearch = () => {
  if (categoryForm.category_id && !goodsForm.title) {
    getGoodsData({
      category_id: categoryForm.category_id
    })
  }
  if (goodsForm.title && !categoryForm.category_id) {
    getGoodsData({
      title: goodsForm.title
    })
  }
  if (categoryForm.category_id && goodsForm.title) {
    getGoodsData({
      title: goodsForm.title,
      category_id: categoryForm.category_id
    })
  }
}
// 重置
const resetForm = () => {
  goodsRef.value.resetFields()
  changeGoodsData('all')
}
// 展开收起
const handleShow = () => {
  showStatus.value = !showStatus.value
}
// 删除
const handleDelete = async (row) => {
  const res = await goodsApi.deleteList({ ids: [row.id] })
  console.log(res)
  ElNotification({
    message: '删除成功',
    type: 'success',
    offset: 100
  })
  getGoodsData()
}
// 重置数据
const refresh = () => {
  if (!categoryForm.category_id && !goodsForm.title) {
    getGoodsData()
  } else {
    handleSearch()
  }
}
</script>
<style scoped lang="scss">
.box {
  display: flex;
  .redText {
    color: #f43f5e;
    font-size: 14px;
  }
  .textColor {
    color: #6b7280;
    font-size: 12px;
  }
  .category {
    color: #9ca3af;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .createTime {
    color: #9ca3af;
    font-size: 12px;
  }
}
.pagination {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
.rowHeader {
  display: flex;
  // justify-content: space-between;
  .el-form {
    width: 100%;
  }
  .goodsInput {
    width: 300px;
  }
  .colButton {
    position: absolute;
    right: 0;
  }
  .headerButton {
    vertical-align: middle;
    margin-top: 4px;
    display: flex;
  }
}
.buttonCss {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
