const express = require('express');
const app = express();

var bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require('cors');
app.use(cors());

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined, undefined, {
    dialect: 'sqlite',
    storage: 'database.db'
});

//DB definitions

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val) {
            var hash = bcrypt.hashSync(val, saltRounds);
            this.setDataValue('password', hash);
        }
    }
});

const Serial = sequelize.define(
    'serial',{
        serial: {
            type: Sequelize.STRING(30),
            primaryKey: true,
            field: 'Serial'
        },
        warehouse: {
            type: Sequelize.STRING(10),
            primaryKey: true,
            field: 'Warehouse'
        },
        stockcode: {
            type: Sequelize.STRING(30),
            primaryKey: true,
            field: 'StockCode'
        },
        location: {
            type: Sequelize.STRING(20),
            field: 'Location'
        },
        lot: {
            type: Sequelize.STRING(50),
            field: 'Lot'
        },
        qtyonhand: {
            type: Sequelize.DECIMAL,
            field: 'QtyOnHand'
        },
        qtyavailable: {
            type: Sequelize.DECIMAL,
            field: 'QtyAvailable'
        },
        qtyreceived: {
            type: Sequelize.DECIMAL,
            field: 'QtyReceived'
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'InvSerialHead'
    }
);

const SalesOrder = sequelize.define('salesorder', {
    salesorder: {
        type: Sequelize.NUMERIC,
        allowNull: false,
        unique: true
    }
})

const Hero = sequelize.define('hero', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    info: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
})

// force: true will drop the table if it already exists
User.sync({force: true});

Serial.sync({force: true}).then(() => {
    Serial.create({ serial: '00402040', stockcode: 'PF65-0022-UP', warehouse: '01'});
    Serial.create({ serial: '00402044', stockcode: 'PF65-0022-df', warehouse: '01'});
    Serial.create({ serial: '00204040', stockcode: 'PF64-0045-UP', warehouse: '01'});
    Serial.create({ serial: '00402030', stockcode: 'PF65-0022-UP', warehouse: '02'});
    Serial.create({ serial: '03245102', stockcode: 'PF22-0022-UP', warehouse: 'RM'});
});

Hero.sync({force:true}).then(() => {
  // Table created
    Hero.create({ name: 'Zero' });
    Hero.create({ name: 'Mr. Nice' });
    Hero.create({ name: 'Narco' });
    Hero.create({ name: 'Bombasto' });
    Hero.create({ name: 'Celeritas' });
    Hero.create({ name: 'Magneta' });
    Hero.create({ name: 'RubberMan' });
    Hero.create({ name: 'Dynama' });
    Hero.create({ name: 'Dr IQ' });
    Hero.create({ name: 'Magma' });
    Hero.create({ name: 'Tornado' });
});


//global functions



app.get('/', function(req, res) {
    res.json({ 
        message: "Node is working!" 
    });
});


//db
    app.get('/db/', function(req,res){
        sequelize
            .authenticate()
            .then(() => {
                var msg = 'Connection has been established successfully.';
                console.log(msg);
                res.send(msg);
            })
            .catch(err => {
                var msg = 'Unable to connect to the database:'
                console.error('Unable to connect to the database:', err);
                res.send(msg, err);
            });
    });

    //users

        app.get('/db/users/', function(req, res) {
            User.findAll().then(users => {
                console.log(users)
                res.json({users});
            })
        });

        app.get('/db/users/add', function(req, res) {
            return sequelize.transaction(function (t) {
                return User.create({
                    username: req.query.username,
                    password: req.query.password
                });
            }).then(function (result) {
                res.json(result)
            }).catch(function (err) {
                res.json(err);
            });
        });

        app.get('/db/users/login', function(req, res) {
            User.findAll({ 
                attributes: ['username', 'password'],
                where: { username: req.query.username } 
            }).then(results => {
                console.log(results);
                if(results.length == 1){
                    var comphash = bcrypt.compareSync(req.query.password,results[0].password);
                    if(comphash == true){
                        res.json({
                            message: 'Successful login!',
                            data: results
                        });
                    }
                    else{
                        res.json({error: 'Password incorrect.'});
                    }
                }
                else{
                    res.json({
                        error: `${username} is not a valid username`
                    });
                }
            });
        });

    //heroes
        app.get('/db/heroes', function(req, res) {
            Hero.findAll({
                attributes: [ 'id' , 'name']
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/heroes/:id', function(req, res) {
            Hero.findById(req.params.id).then(data => {
                res.json({data});
            });
        });

        app.get('/db/heroessearch', function(req,res) {
            Hero.findAll({
                attributes: [ 'id' , 'name' ],
                where: { name: req.query.name }
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/heroes/:id/update', function(req,res) {
            var data = [
                
            ];
            res.json('updated!');
        });

    //serials
        app.get('/db/serials', function(req, res) {
            Serial.findAll({
                attributes: [ 'serial' , 'stockcode', 'warehouse']
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serials/:serial/', function(req, res) {
            Serial.findOne({
                attributes: [ 'serial' , 'stockcode', 'warehouse'],
                where: { serial: req.params.serial }
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serials/find/:serial/', function(req, res) {
            Serial.findAll({
                attributes: [ 'serial' , 'stockcode', 'warehouse'],
                where: { serial: req.params.serial }
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serialssearch', function(req,res) {
            Serial.findAll({
                attributes: [ 'serial' , 'stockcode', 'warehouse' ],
                where: { serial: req.query.serial }
            }).then(data => {
                res.json({data});
            });
        });


const port = "3001";
const host = "localhost";
app.listen(port,host,function(){
    console.log(`Server listening on http://${host}:${port}.`);
});