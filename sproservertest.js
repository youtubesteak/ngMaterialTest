const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

//sequelize
    var Sequelize = require('sequelize');
    const sequelize = new Sequelize('mssql://srs:@192.168.0.14/SysproCompanyT');
//DB definitions

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
            primaryKey: true,
            field: 'Description'
        },
        longdesc: {
            type: Sequelize.STRING(30),
            primaryKey: true,
            field: 'LongDesc'
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'InvMaster'
    }
);


// ! DO NOT DO THIS. force: true will drop the table if it already exists

//!TEST ENVIRO CONNECTS TO SPRO TEST COMPANY SQL DB, THE SQL ACCOUNT DOES!!!!!! 
//!NOT HAVE PERMISSION TO POST, ONLY QUERY. JUST IN CASE, DO NOT SYNC HERE, PLEASE.!

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

    //serials
        app.get('/db/serials', function(req, res) {
            Serial.findAll({
                where: {
                    qtyonhand: { $gt : 0 }
                },
                limit: 20
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serials/:serial/', function(req, res) {
            Serial.findOne({
                where: { 
                    serial: req.params.serial,
                    qtyonhand:  { $gt:0 }
                }
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serials/find/:serial/', function(req, res) {
            Serial.findAll({
                where: { 
                    serial: req.params.serial,
                    qtyonhand:  { $gt:0 } 
                }
            }).then(data => {
                res.json({data});
            });
        });

        app.get('/db/serialssearch', function(req,res) {
            Serial.findAll({
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


//dfm        

        app.get('/dfm/invtsr/:serial/:stockcode/:warehouse/:location', function(req, res) {
            console.log('New DFM post:');
            var message = "";

            if( !filedir ){ var filedir = "\\\\cisvr02\\XMLDOCUMENTS\\T\\IN\\INVTSR\\"; }
            if( !filename ){ var filename = "test"; }
            if( !fileextpre ){var filextpre = ".temp";}
            if( !fileext ){ var fileext = ".xml"; }

            if( !filedirout ){ var filedirout = "test\\out\\"; }

            var fileextpre = ".temp";
            var fileext = ".xml";

            var filepre = filedir + filename + fileextpre;
            var file = filedir + filename + fileext; 

            var filecontents = `<?xml version="1.0" encoding="UTF-8"?>
                <PostInvSerialTransactions>
                <Item>
                    <TransactionType>S</TransactionType>
                    <TransactionCode>MOVE</TransactionCode>
                    <StockCode>${req.params.stockcode}</StockCode>
                    <SerialNumber>${req.params.serial}</SerialNumber>
                    <Warehouse>${req.params.warehouse}</Warehouse>
                    <TransactionDate>2017-07-11</TransactionDate>
                    <Reference>wmsx;jhammond;</Reference>
                    <Notation>Transnote</Notation>
                    <NewLocation>${req.params.location}</NewLocation>
                </Item>
                </PostInvSerialTransactions>`;

            var timeout = "15000";

            //functions
            function writefile(callback){
                process.stdout.write('Writing file...');
                fs.writeFileSync(
                    `${filepre}`,
                    filecontents
                );
                callback(null,'Wrote file.');
            }
            function renamefile(arg1, callback){
                process.stdout.write(arg1 + 'Renaming file...');
                fs.rename(
                    `${filepre}`,
                    `${file}`
                );
                callback(null,'Renamed file.');
            }

            function watchfile(arg1, callback){
                process.stdout.write(arg1 + 'Watching file...');
                startWaiting(file,timeout,function(err,result){
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null, result);
                    }
                });
            }

            function checkfileresponse(arg1, callback){
                process.stdout.write(arg1 + 'Getting file response...');
                callback(null,'File response not yet being processed.');
            }
            function verifydatabase(arg1, callback){
                process.stdout.write(arg1 + 'Verifying changes in db...');
                Serial.findAll({
                    where: {
                        serial: req.params.serial,
                        stockcode: req.params.stockcode,
                        warehouse: req.params.warehouse,
                        location: req.params.location,
                        qtyonhand: { $gt: 0 } 
                    }
                })
                    .then(serials => {
                        if(serials.length == 1){
                            callback(null,'Movement posted successfully.')
                        }
                        else{
                            callback('Serial location was not updated, please try again.')
                        }
                    })
            }
        
            //async call
            async.waterfall([
                writefile,
                renamefile,
                watchfile,
                checkfileresponse,
                verifydatabase
            ], function (err, result) {
                if(err) {
                    process.stdout.write(err);
                    res.json({ 
                        error: err
                    });
                }
                else {
                    process.stdout.write(result);
                    res.json({ 
                        message: 'Success!'
                    });
                }
            });
        });


const port = "3001";
const host = "localhost";
app.listen(port,host,function(){
    console.log(`Server listening on http://${host}:${port}.`);
});