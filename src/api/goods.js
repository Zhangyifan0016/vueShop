import request from '../utils/request'

const getTab = (data, page) => {
  return request({
    url: '/admin/goods/' + page,
    method: 'GET',
    data
  })
}

const getCategory = () => {
  return request({ url: '/admin/category', method: 'GET' })
}

const deleteList = (data) => {
  return request({ url: '/admin/goods/delete_all', method: 'POST', data })
}
// 改变分类状态
const changeStatus = (id, status) => {
  return request({
    url: `/admin/category/${id}/update_status`,
    method: 'POST',
    data: { status }
  })
}
// 删除分类数据
const deleteCategory = (id) => {
  return request({ url: `/admin/category/${id}/delete`, method: 'POST' })
}
// 新增
const addCategory = (data) => {
  return request({ url: '/admin/category', method: 'POST', data })
}
// 修改
const editCategory = (id, data) => {
  return request({ url: `/admin/category/${id}`, method: 'POST', data })
}
// 推荐商品
const showCategory = (data) => {
  return request({ url: '/admin/app_category_item/list', method: 'GET', data })
}
// 删除推荐商品
const deleteGoods = (id) => {
  return request({
    url: `/admin/app_category_item/${id}/delete`,
    method: 'POST'
  })
}
export default {
  getTab,
  getCategory,
  deleteList,
  changeStatus,
  deleteCategory,
  addCategory,
  editCategory,
  showCategory,
  deleteGoods
}
