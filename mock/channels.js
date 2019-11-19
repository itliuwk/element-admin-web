export default [
  // user login
  {
    url: '/admin/channels/select',
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
]
