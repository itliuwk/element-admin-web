const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}


export default [
  {
    url: "/admin/firmwares/detail",
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data": {
          "id": "@increment",
          "version": "2.0.@string(1)",
          "name": "大售货机app",
          "deviceTypeName": "自助售货机",
          "createdDate": 1566368022554,
          "description": "描述描述描述描述描述描述描述描述描述描述描述",
          "targetDeviceCount": 10,
          "deviceCount": 10,
          "failedDeviceCount": 10
        }
      }
    }
  },

  {
    url: '/admin/firmwares/count',
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|100": 1
      }
    }
  },
  {
    url: '/admin/firmwares',
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|20":
          [
            {
              "id": "@increment",
              "name": "大售货机app",
              "version": "2.0.@string(1)",
              "deviceTypeName": "自助售货机",
              "deviceCount": 10,
              "createdDate": 1566367173039
            }
          ]
      }
    }
  },
  {
    url: '/admin/firmwares',
    type: 'post',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|20":
          [
            {
              "id": "@increment",
              "name": "大售货机app",
              "version": "2.0.@string(1)",
              "deviceTypeName": "自助售货机",
              "deviceCount": 10,
              "createdDate": 1566367173039
            }
          ]
      }
    }
  },
  {
    url: '/admin/firmwares/upgrade',
    type: 'post',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|20":
          [
            {
              "id": "@increment",
              "name": "大售货机app",
              "version": "2.0.@string(1)",
              "deviceTypeName": "自助售货机",
              "deviceCount": 10,
              "createdDate": 1566367173039
            }
          ]
      }
    }
  },

  {
    url: '/admin/firmwares/upgrades/count',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        "data": 21
      }
    }
  },

  {
    url: '/admin/firmwares/upgrades',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        "data|21":
          [
            {
              "id": "@increment",
              "deviceId": "@increment",
              "deviceName": "设备名@string(3)",
              "fromVersion": "1.0.@string(1)",
              "toVersion": "2.0.@string(3)",
              "createdDate": 1566370934742,
              "endDate": 1566370934742,
              "state": "@pick(['PENDING','SUCCEEDED','FAILED'])"
            }
          ]
      }
    }
  },






]
