export default [
  // user login
  {
    url: '/admin/devices/types',
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        data: [
          { id: 1, name: 1 }
        ]
      }
    }
  },
  {
    url: "/admin/devices/summary",
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data": {
          "devices": 21,
          "activeDevices": 1
        }
      }
    }
  },
  {
    url: "/admin/devices",
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|6": [
          {
            "id": "@increment",
            "groupName": "正佳广场广告屏",
            "active": false,
            "locationName": "正佳广场",
            "name": "这是设备名@increment",
            "typeId": "quxia",
            "locationProvince": "场地省",
            "locationCity": "@city",
            "locationDistrict": "天河区",
            "locationStreet": "302",
            "createdDate": 1566369192846,
            "typeName": "酒店售货机"
          }
        ]
      }
    }
  },

]
