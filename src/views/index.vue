<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics1" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ item.title }}</span>
              <el-tag effect="plain" :type="item.unitColor">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="title">{{ item.value }}</span>
          <el-divider />
          <div class="cardFooter">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="rowCenter">
      <el-col :span="3" v-for="(item, index) in cardList" :key="index">
        <el-card shadow="hover">
          <div class="box-card" @click="goTo(item.path)">
            <el-icon>
              <svg-icon :icon="item.icon"></svg-icon>
            </el-icon>
            <span class="cardTitle">{{ item.title }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <div class="echartsCard">
              <span>订单统计</span>
              <div>
                <el-check-tag
                  v-for="(item, index) in options"
                  :key="index"
                  :checked="current == item.value"
                  @click="handleChoose(item.value)"
                  style="margin-right: 8px"
                >
                  {{ item.text }}
                </el-check-tag>
              </div>
            </div>
          </template>
          <div ref="main" style="width: 100%; height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12" class="colCard">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>店铺及商品提示</span>
              <el-tag effect="plain" type="danger"> 店铺及商品提示 </el-tag>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in goods" :key="index">
              <el-card class="cardBox" shadow="hover">
                <div class="shopsCard">
                  <span class="cardNum"> {{ item.value }}</span>
                  <span class="cardLabel"> {{ item.label }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>交易提示</span>
              <el-tag effect="plain" type="danger">
                需要立即处理的交易订单
              </el-tag>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in order" :key="index">
              <el-card class="cardBox" shadow="hover">
                <div class="shopsCard">
                  <span class="cardNum"> {{ item.value }}</span>
                  <span class="cardLabel"> {{ item.label }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import HomeApi from '@/api/home'
// 引入echarts
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const statistics1 = ref()
const goods = ref()
const order = ref()

const main = ref()
const current = ref('week')
const cardList = [
  {
    title: '用户',
    icon: 'users',
    path: '/user/list'
  },
  {
    title: '商品',
    icon: 'shopping-cart',
    path: '/goods/list'
  },
  {
    title: '订单',
    icon: 'buyShop',
    path: '/order/list'
  },
  {
    title: '评价',
    icon: 'notify',
    path: '/comment/list'
  },
  {
    title: '图库',
    icon: 'pictures',
    path: '/image/list'
  },
  {
    icon: 'proclaim',
    title: '公告',
    path: '/notice/list'
  },
  {
    title: '配置',
    icon: 'set-up',
    path: '/setting/base'
  },
  { title: '优惠券', icon: 'couponColor', path: '/coupon/list' }
]
const options = [
  {
    text: '近1个月',
    value: 'month'
  },
  {
    text: '近1周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  }
]
const goTo = (path) => {
  router.push(path)
}
const getStatistics1 = async () => {
  const res = await HomeApi.getStatistics1()
  statistics1.value = res.data.panels
}
const getStatistics2 = async () => {
  const res = await HomeApi.getStatistics2()
  goods.value = res.data.goods
  order.value = res.data.order
}
getStatistics1()
getStatistics2()
const handleChoose = (type) => {
  current.value = type
  init()
}
onMounted(() => {
  init()
})
const init = async () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value)
  // 指定图表的配置项和数据
  const option = {
    tooltip: {},
    xAxis: {
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        data: []
      }
    ]
  }
  await HomeApi.getStatistics3(current.value).then((res) => {
    // 使用刚指定的配置项和数据显示图表。
    option.xAxis.data = res.data.x
    option.series[0].data = res.data.y
    myChart.setOption(option)
  })
}
</script>
<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 8px;
  background-color: #f9fafb;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 30px;
  color: #6b7280;
  font-weight: 700;
}
.cardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 14px;
}
.rowCenter {
  margin: 20px 0;
}
.box-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  .cardTitle {
    margin-top: 8px;
    font-size: 14px;
  }
}
.echartsCard {
  display: flex;
  justify-content: space-between;
}
.colCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cardBox {
    background-color: #f6f6f6;
    .shopsCard {
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardNum {
        margin-bottom: 8px;
        font-size: 20px;
      }
      .cardLabel {
        color: #6b7280;
        font-size: 12px;
      }
    }
  }
}
</style>
