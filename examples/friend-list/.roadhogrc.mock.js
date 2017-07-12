
const friends = [
  {
    id: 1,
    name: 'Bruce Wayne',
    username: '@Batman'
  },
  {
    id: 2,
    name: 'Clark Kent',
    username: '@Superman'
  },
  {
    id: 3,
    name: 'Maz ‘Magnus’ Eisenhardt',
    username: '@Magneto'
  },
  {
    id: 4,
    name: 'Reed Richards',
    username: '@Mister-Fantastic'
  },
  {
    id: 5,
    name: 'Charles Francis Xavier',
    username: '@ProfessorX'
  },
  {
    id: 6,
    name: 'Lex Luthor',
    username: '@LexLuthor'
  },
  {
    id: 7,
    name: 'Benjamin Grimm',
    username: '@Thing'
  },
  {
    id: 8,
    name: 'Walter Langkowski',
    username: '@Sasquatch'
  },
  {
    id: 9,
    name: 'Andrew Nolan',
    username: '@Ferro-Lad'
  },
  {
    id: 10,
    name: 'Jonathan Osterman',
    username: '@Dr.Manhattan'
  }
];

export default {
  '/api/search': friends
  
  // 支持值为 Object 和 Array
  //'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  //'/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  //'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  //'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  //'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};