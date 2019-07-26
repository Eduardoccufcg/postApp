const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('postapp','root','edueduedu', {
    host:'localhost',
    dialect: 'mysql'
});
module.exports = {Sequelize: Sequelize, sequelize: sequelize}
