const axios = require('axios')
const signupApi = 'http://localhost:3001/api/v1/user/signup'

const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123',
    userName: 'Iron-Man',
    role: 'user',
    account: []
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456',
    userName: 'Captain',
    role: 'user',
    account: []
  },
  {
    firstName: 'Bruce',
    lastName: 'Banner',
    email: 'bruce@banner.com',
    password: 'password789',
    userName: 'Hulk',
    role: 'user',
    account: []
  },
  {
    firstName: 'Hank',
    lastName: 'Pym',
    email: 'hank@pym.com',
    password: 'password101112',
    userName: 'Ant-Man',
    role: 'user',
    account: []
  },
  {
    firstName: 'Janet',
    lastName: 'Van Dyne',
    email: 'janet@vandyne.com',
    password: 'password131415',
    userName: 'La Guêpe',
    role: 'user',
    account: []
  },
  {
    firstName: 'Clint',
    lastName: 'Barton',
    email: 'clint@barton.com',
    password: 'password161718',
    userName: 'Oeil De Faucon',
    role: 'user',
    account: []
  },
  {
    firstName: 'Wanda',
    lastName: 'Maxiomoff',
    email: 'wanda@maximoff.com',
    password: 'password192021',
    userName: 'La Sorcière Rouge',
    role: 'user',
    account: []
  },
  {
    firstName: 'Pietro',
    lastName: 'Maxiomoff',
    email: 'pietro@maximoff.com',
    password: 'password222324',
    userName: 'Vif-Argent',
    role: 'user',
    account: []
  }
]

users.forEach(user => {
  axios
    .post(signupApi, user)
    .then(response => console.log(response))
    .catch(error => console.log(error))
})
