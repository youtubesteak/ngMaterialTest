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

const SerialCus = sequelize.define(
    'serialcus',{
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
        width: {
            type: Sequelize.DECIMAL,
            field: 'Width'
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: '[InvSerialHead+]'
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
            type: Sequelize.STRING(50),
            field: 'Description'
        },
        longdesc: {
            type: Sequelize.STRING(100),
            field: 'LongDesc'
        },
        alternatekey1: {
            type: Sequelize.STRING(20),
            field: 'AlternateKey1'
        },
        alternatekey2: {
            type: Sequelize.STRING(20),
            field: 'AlternateKey2'
        },
        stockuom: {
            type: Sequelize.STRING(10),
        },
        alternateuom: {
            type: Sequelize.STRING(20),
            field: 'AlternateUom'
        },
        otheruom: {
            type: Sequelize.STRING(20),
            field: 'OtherUom'
        },
        partcategory: {
            type: Sequelize.STRING(20),
            field: 'PartCategory'
        },
        mass: {
            type: Sequelize.STRING(20),
            field: 'Mass'
        },
        volume: {
            type: Sequelize.STRING(20),
            field: 'Volume'
        },
        decimals: {
            type: Sequelize.STRING(20),
            field: 'Decimals'
        },
        productclass: {
            type: Sequelize.STRING(20),
            field: 'ProductClass'
        },
        userfield1: {
            type: Sequelize.STRING(20),
            field: 'UserField1'
        },
        userfield2: {
            type: Sequelize.STRING(20),
            field: 'UserField2'
        },
        userfield3: {
            type: Sequelize.STRING(20),
            field: 'UserField3'
        },
        userfield4: {
            type: Sequelize.STRING(20),
            field: 'UserField4'
        },
        userfield5: {
            type: Sequelize.STRING(20),
            field: 'UserField5'
        },
        stockonhold: {
            type: Sequelize.STRING(20),
            field: 'StockOnHold'
        },
        stockonholdreason: {
            type: Sequelize.STRING(20),
            field: 'StockOnHoldReason'
        },
        datestkadded: {
            type: Sequelize.STRING(20),
            field: 'DateStkAdded'
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

SerialCus.sync({force: true}).then(() => {
    SerialCus.create({"serial":"0771370606A1","warehouse":"01","stockcode":"5301-0033-AP","width":15})
});

StockCode.sync({force: true}).then(() => {
    StockCode.bulkCreate([
        {"stockcode":"1.5 MIL FLAT POLY BAGS","description":"BAGS FOR MATS","longdesc":"9\" X 18\"  1000/CASE","alternatekey1":" ","alternatekey2":" ","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"B","mass":1,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-05-12T00:00:00.000Z"},                
        {"stockcode":"12\"-300-SEAMTAPE","description":"MOISTURE BARRIER","longdesc":" ","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"B","mass":7,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-02-23T00:00:00.000Z"},                
        {"stockcode":"16/30 GREEN/BLK SUPER SACK","description":"16/30 GREEN/BLACK","longdesc":"GREEN/ BLACK","alternatekey1":" ","alternatekey2":" ","stockuom":"LB",
            "alternateuom":"LB","otheruom":"EA","partcategory":"B","mass":1,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":"F","stockonholdreason":" ","datestkadded":"2014-07-18T00:00:00.000Z"},                
        {"stockcode":"16/30 RAW SAND","description":"16/30 RAW SAND","longdesc":"NATURAL","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"LB",
            "otheruom":"EA","partcategory":"B","mass":50,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2015-03-31T00:00:00.000Z"},                
        {"stockcode":"20/40 GRN. SAND","description":"20/40 GREEN SAND","longdesc":"GREEN","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"LB",
            "otheruom":"EA","partcategory":"B","mass":50,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2015-09-08T00:00:00.000Z"},                
        {"stockcode":"20/40 RAW SAND","description":"20/40 RAW SAND","longdesc":" ","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"LB","otheruom":"EA",
            "partcategory":"B","mass":50,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ","userfield5":" ",
            "stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-05-16T00:00:00.000Z"},                
        {"stockcode":"30/50 ENVIROFILL","description":"30/50 BLK/GRN","longdesc":"50 LB. BAG","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"B","mass":50,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2015-03-31T00:00:00.000Z"},                
        {"stockcode":"32'-6\" SEAM TAPE","description":"POLY TAPE","longdesc":" ","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA","otheruom":"EA",
            "partcategory":"B","mass":0,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ","userfield5":" ",
            "stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-01-07T00:00:00.000Z"},                
        {"stockcode":"35BM-0044-5W","description":" 3 x 5 SOFTBALL BATTER'S MAT","longdesc":"DG/OG","alternatekey1":"30 oz","alternatekey2":".56\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":4.6281,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2017-04-03T00:00:00.000Z"},                
        {"stockcode":"37BM-0004-5W","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"MOSS GREEN","alternatekey1":"30 oz","alternatekey2":".56\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":16,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":"F","stockonholdreason":" ","datestkadded":"2012-06-08T00:00:00.000Z"},                
        {"stockcode":"37BM-0005-5W","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"PINE GREEN","alternatekey1":"30 oz","alternatekey2":".56\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":19,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":"F","stockonholdreason":" ","datestkadded":"2010-01-18T00:00:00.000Z"},                
        {"stockcode":"37BM-0044-5N","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"DG/OG","alternatekey1":"30 oz","alternatekey2":".56\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":16,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-04-14T00:00:00.000Z"},                
        {"stockcode":"37BM-0044-5W","description":" 3 x 7 SOFTBALL BATTER'S MAT","longdesc":"DG/OG","alternatekey1":"30 oz","alternatekey2":".56\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":16,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2014-08-12T00:00:00.000Z"},                
        {"stockcode":"37BM-0055-5W","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"CLAY","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"M","mass":19,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":"F","stockonholdreason":" ","datestkadded":"2010-08-31T00:00:00.000Z"},                
        {"stockcode":"37BM-0125-5N","description":"3 X 7 SOFTBALL BATTER'S MAT","longdesc":"Wintergreen","alternatekey1":"32 oz","alternatekey2":".44\"","stockuom":"EA",
            "alternateuom":"EA","otheruom":"EA","partcategory":"M","mass":19,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I",
            "userfield4":" ","userfield5":" ","stockonhold":"F","stockonholdreason":" ","datestkadded":null},                
        {"stockcode":"3M847-5GAL","description":"EXTRA FLAMMABLE ADHESIVE","longdesc":"OBSOLETE","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"B","mass":12,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":"O","stockonhold":"F","stockonholdreason":"OB","datestkadded":"2009-06-16T00:00:00.000Z"},                
        {"stockcode":"3M847-QUART","description":"EXTRA FLAMMABLE ADHESIVE","longdesc":"OBSOLETE","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"B","mass":12,"volume":0,"decimals":3,"productclass":"INMT","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":"O","stockonhold":"F","stockonholdreason":"OB","datestkadded":"2009-03-12T00:00:00.000Z"},                
        {"stockcode":"3ODF-0007-5W","description":"3' ON DECK CIRCLE","longdesc":"FLA.BLUE","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"M","mass":15,"volume":0,"decimals":3,"productclass":"MATS","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2013-06-24T00:00:00.000Z"},                
        {"stockcode":"3X3 FLOATING GREEN PAD","description":"3X3 FLOATING GREEN PAD","longdesc":" ","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"M","mass":0,"volume":0,"decimals":3,"productclass":"GOLF","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-12-31T00:00:00.000Z"},                
        {"stockcode":"4\" PRACTICE GREEN CUP","description":"STD. GOLF SKU #18100","longdesc":" ","alternatekey1":" ","alternatekey2":" ","stockuom":"EA","alternateuom":"EA",
            "otheruom":"EA","partcategory":"B","mass":0,"volume":0,"decimals":3,"productclass":"GOLF","userfield1":" ","userfield2":0,"userfield3":"I","userfield4":" ",
            "userfield5":" ","stockonhold":" ","stockonholdreason":" ","datestkadded":"2016-05-17T00:00:00.000Z"}
    ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
        //return User.findAll();
    }).then(users => {
        //console.log(users) // ... in order to get the array of user objects
    })
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

    /* URL NAMING CONVENTION: 
        '/module/' + '/action/' + '/:options' 
        module:
            singular/plural, singular where only 1 will be returned
        actions:
            search : searches for item based on parameters(query, actually, but whatever)
    */


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
        //serial
            app.get('/db/serial/:serial/', function(req, res) {
                Serial.findOne({
                    attributes: [ 'serial' , 'stockcode', 'warehouse'],
                    where: { serial: req.params.serial }
                }).then(data => {
                    res.json({data});
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
    
        //serialcus
            app.get('/db/serialcus/:serial/:stockcode/:warehouse/', function(req, res) {
                Serial.findAll({
                    where: {
                        serial: req.params.serial,
                        stockcode: req.params.stockcode,
                        warehouse: req.params.warehouse
                    }
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
        app.get('/db/stockcode/:stockcode', function(req, res) {
            StockCode.findOne({
                where: {
                    stockcode : req.params.stockcode
                }
            }).then(data => {
                res.json({data});
            });
        });
        app.get('/db/stockcodes/search', function(req, res) {
            var query = User.find({});

            /*Object.keys(req.query).forEach(function(keyvalue) {
                console.log(key);
                console.log(value)
                query.where(key).regex(new RegExp(req.query[key]));
            });*/
            Object.keys(o).forEach(function(key) {
                var val = o[key];
                logic();
            });
            
            /*
            if (req.query.username) {
                query.where('username').regex(new RegExp(req.query.username));
            }
            if (req.query.email) {
                query.where('email').regex(new RegExp(req.query.email));
            }*/

            /*query.select('username', 'email');
            query.exec(function(err, users) {
                if (err) throw err;
                res.json(users);
            });*/

        });


const port = "3001";
const host = "localhost";
app.listen(port,host,function(){
    console.log(`Server listening on http://${host}:${port}.`);
});