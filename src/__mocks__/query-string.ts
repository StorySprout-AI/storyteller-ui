const queryStringAPI = {
  parse: jest.fn().mockImplementation(() => {
    return new URLSearchParams('u=User;99')
  })
}

export const parse = queryStringAPI.parse

export default queryStringAPI
