
import request from '@/utils/request'

export function GET_PERMISSIONS(params) {
    return request({
        url: "/api/admin/permissions",
        method: 'get',
    }).then(res => res.data.data)
}
