# express-stickers
- Node.js, Express搭建在线便利贴

- 安装依赖
    ```bash
    npm install
    ```

- `model/` 目录添加config.js文件，添加数据库配置
    ```js
    //配置案例
    var config = {
        DB_NAME: 'db_name   ',
        USERNAME: 'root',
        PASSWORD: 'xxxxxxxx'
    }
    module.exports = config
    ```


- npm start [打开localhost:3000]

- webpack打包

- Sequelize, mysql2

- OAuth2.0, passport, passport-github登录
