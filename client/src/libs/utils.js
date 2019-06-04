import Cookies from 'js-cookie';
import { forEach, hasOneOf } from '@/libs/tools'
import config from '@/config'

const { title, useI18n } = config;

/**
 * 获取左侧菜单
 * @param {Array} list 路由数组
 * @param {Array} access 权限
 */
export const getMenuByRouter = (list, access) => {
    let res = [];
    forEach(list, item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {

                //递归
                obj.children = getMenuByRouter(item.children, access);
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href;
            if (showThisMenuEle(item, access)) res.push(obj);
        }
    })
    return res;
}

/**
 * 判断路由是否有子路由
 * @param {Array} item 
 */
export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

/**
 * 通过路由权限判断是否显示
 * @param {item为一个数组} item 
 * @param {access为权限} access 
 */
const showThisMenuEle = (item, access) => {

    //有权限并且权限存在，返回true；没有权限直接返回true
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hanOneOf(item.meta.access, access)) return true;
        else return false;
    } else return true;
}

/**
 * 显示标题
 * @param {Array} item 路由 
 * @param {*} vm 组件
 */
export const showTitle = (item, vm) => {
    let { title, __titleIsFunction__ } = item.meta;
    if (!title) return;
    if (useI18n) {
        /**
         * title = "{{状态管 理 }}" ==》 状态管理
         */
        if (title.includes('{{') && title.includes('}}') && useI18n) {
            title = title.replace(/({{[\s\S]+?}})/, function (m, str) {
                //第一个参数：正则所匹配到的字符
                //第二个参数：捕获子表达式所匹配到的内容（也就是括号包裹的）
                //第三个参数：正则匹配到的每段字段的第一个字符的索引
                //第四个参数：用于匹配的字符串主体

                /**
                 * str => {{abcde}}
                 */
                return str.replace(/{{([\s\S]*)}}/, function (m, _) {
                    /**
                     * _ => abcde
                     */
                    return vm.$t(_.trim())
                })
            })
        } else if (__titleIsFunction__) {
            title = item.meta.title
        } else {
            title = vm.$t(item.name);
        }
    } else title = (item.meta && item.meta.title) || item.name

    return title;

}