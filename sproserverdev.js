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

const StockCode = sequelize.define(
    'stockcode',{
        stockcode: {
            type: Sequelize.STRING(30),
            primaryKey: true,
            unique: true,
            field: 'StockCode'
        },
        description: {
            type: Sequelize.STRING(10),
            field: 'Description'
        },
        longdesc: {
            type: Sequelize.STRING(30),
            field: 'LongDesc'
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'InvMaster'
    }
);


// force: true will drop the table if it already exists
User.sync({force: true});

Serial.sync({force: true}).then(() => {
    Serial.create({"serial":"0771370606A1","warehouse":"01","stockcode":"5301-0033-AP",
        "location":"01","lot":"078151","qtyonhand":317.52,"qtyavailable":317.52,"qtyreceived":317.52 });
    Serial.create({"serial":"0771370702A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370702A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370704A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370704A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370705A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370705A1","warehouse":"0 1","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370706A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":308.7,"qtyavailable":308.7,"qtyreceived":308.7});
    Serial.create({"serial":"0771370804A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370804A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370805A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370805A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370806B","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"78151",
        "qtyonhand":313.11,"qtyavailable":313.11,"qtyreceived":313.11});
    Serial.create({"serial":"0771370901A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":313.11,"qtyavailable":313.11,"qtyreceived":313.11});
    Serial.create({"serial":"0771370901A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":313.11,"qtyavailable":313.11,"qtyreceived":313.11});
    Serial.create({"serial":"0771370903A","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"0771370903A1","warehouse":"01","stockcode":"5301-0033-AP","location":"01","lot":"078151",
        "qtyonhand":264.6,"qtyavailable":264.6,"qtyreceived":264.6});
    Serial.create({"serial":"108888L","warehouse":"01","stockcode":"5301-0033-AP","location":"706E",
        "lot":"000000000073948","qtyonhand":117,"qtyavailable":117,"qtyreceived":225});
    Serial.create({"serial":"08869C21","warehouse":"SR","stockcode":"5301-0033-AP","location":"506A",
        "lot":"000000000071439","qtyonhand":39,"qtyavailable":39,"qtyreceived":39});
    Serial.create({"serial":"108889L","warehouse":"SR","stockcode":"5301-0033-AP","location":" ",
        "lot":"000000000073948","qtyonhand":50,"qtyavailable":50,"qtyreceived":50});
});

StockCode.sync({force: true}).then(() => {
        StockCode.create({"stockcode":"1.5 MIL FLAT POLY BAGS","description":"BAGS FOR MATS","longdesc":"9\" X 18\"  1000/CASE"});
        StockCode.create({"stockcode":"12\"-300-SEAMTAPE","description":"MOISTURE BARRIER","longdesc":" "});
        StockCode.create({"stockcode":"16/30 GREEN/BLK SUPER SACK","description":"16/30 GREEN/BLACK","longdesc":"GREEN/ BLACK"});
        StockCode.create({"stockcode":"16/30 RAW SAND","description":"16/30 RAW SAND","longdesc":"NATURAL"});
        StockCode.create({"stockcode":"20/40 GRN. SAND","description":"20/40 GREEN SAND","longdesc":"GREEN"});
        StockCode.create({"stockcode":"20/40 RAW SAND","description":"20/40 RAW SAND","longdesc":" "});
        StockCode.create({"stockcode":"30/50 ENVIROFILL","description":"30/50 BLK/GRN","longdesc":"50 LB. BAG"});
        StockCode.create({"stockcode":"32'-6\" SEAM TAPE","description":"POLY TAPE","longdesc":" "});
        StockCode.create({"stockcode":"35BM-0044-5W","description":" 3 x 5 SOFTBALL BATTER'S MAT","longdesc":"DG/OG"});
        StockCode.create({"stockcode":"37BM-0004-5W","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"MOSS GREEN"});
        StockCode.create({"stockcode":"37BM-0005-5W","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"PINE GREEN"});
        StockCode.create({"stockcode":"37BM-0044-5N","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"DG/OG"});
        StockCode.create({"stockcode":"37BM-0044-5W","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"DG/OG"});
        StockCode.create({"stockcode":"37BM-0055-5W","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"CLAY"});
        StockCode.create({"stockcode":"37BM-0125-5N","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"Wintergreen"});
        StockCode.create({"stockcode":"3M847-5GAL","description":"EXTRA FLAMMABLE ADHESIVE","longdesc":"OBSOLETE"});
        StockCode.create({"stockcode":"3M847-QUART","description":"EXTRA FLAMMABLE ADHESIVE","longdesc":"OBSOLETE"});
        StockCode.create({"stockcode":"3ODF-0007-5W","description":"3' ON DECK CIRCLE","longdesc":"FLA.BLUE"});
        StockCode.create({"stockcode":"3X3 FLOATING GREEN PAD","description":"3X3 FLOATING GREEN PAD","longdesc":" "});
        StockCode.create({"stockcode":"4\" PRACTICE GREEN CUP","description":"STD. GOLF SKU #18100","longdesc":" "});
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


    //serials
        app.get('/db/serials', function(req, res) {
            Serial.findAll({
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

    //stockcodes
        app.get('/db/stockcodes', function(req, res) {
            StockCode.findAll({
                limit: 20
            }).then(data => {
                res.json({data});
            });
        });


const port = "3001";
const host = "localhost";
app.listen(port,host,function(){
    console.log(`Server listening on http://${host}:${port}.`);
});