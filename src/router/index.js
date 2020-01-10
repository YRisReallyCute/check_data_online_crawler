import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views/OnlineCrawler'
import config from '../views/config'
import table_test from "../views/table_test";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        title:'在线爬虫设置总页面'
      }
    },
    {
      path: '/config/:jobGroup',
      name: 'config',
      component: config,
      meta:{keepAlive: true,title: '在线爬虫配置页面'}
    },
    {
      path: '/:word/:where',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        title:'在线爬虫设置总页面'
      }
    },
    {
      path: '/table_test',
      name: 'table_test',
      component: table_test,
      // meta:{keepAlive: true}
    }
  ]
})
