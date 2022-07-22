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
export default { getTab, getCategory, deleteList }
