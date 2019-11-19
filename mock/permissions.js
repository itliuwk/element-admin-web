export default [
  // user login
  {
    url: '/admin/permissions',
    type: 'get',
    response: config => {
      // const { username } = config.body
      return {
        code: 20000,
        data: { "admin": true }
      }
    }
  },
]
