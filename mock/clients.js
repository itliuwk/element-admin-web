export default [
  // user login
  {
    url: "/admin/clients",
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
