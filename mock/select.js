
export default [
  {
    url: '/admin/locations/select',
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        "data|10": [
          {
            "id|+1": 49536,
            "name": "场地mon"
          }
        ]
      }
    }
  },
]