import CommonIcon from '@/components/common-icon'
import { showTitle } from '@/libs/utils'

export default {
    components: {
        CommonIcon
    },
    methods: {

        //展示标题
        showTitle(item) {
            return showTitle(item, this)
        },

        //判断是否有子节点children
        showChildren(item) {
            return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
        },

        //获取名字或url
        getNameOrHref (item, children0) {
            return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
        }
    }
}