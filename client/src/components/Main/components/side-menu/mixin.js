
import { showTitle } from '@/libs/utils'

export default {
    components: {
        CommonIcon
    },
    methods: {
        showTitle(item) {
            return showTitle(item, this)
        },
    }
}