const menuData = [{
  name: '基本信息',
  icon: 'dashboard',
  path: 'basic',
  children: [{
    name: '个人信息',
    path: 'basicInfo',
  }],
}, {
  name: '文章管理',
  icon: 'dashboard',
  path: 'blogMana',
  children: [{
    name: '文章列表',
    path: 'blogList',
  },{
    name: '发布文章',
    path: 'writeBlog',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);
