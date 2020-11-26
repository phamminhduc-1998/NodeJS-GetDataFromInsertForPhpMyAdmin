var mysql = require('mysql');//thu vien mýQL
var express = require('express');
var bodyParser = require('body-parser');//truy xuat du lieu trong from

//tạo app để cấu hình router
var app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

function Connexted() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 3306,
        password: "",
        database: "minhducadmin"

    });
    return connection;
}

app.use(bodyParser.urlencoded({ extended: true }));//truy xuat du lieu trong from
app.post('/user/create', function (req, res) {
    var con = Connexted();// Ket noi CSDL
    var user = req.body.userName;//Lay du lieu
    var pass = req.body.password;
    var idClass = 'MOB';
    con.query("INSERT INTO student (IDSTUDENT, NAMESTUDENT,IDCLASS) VALUES (?,?,?)", [user, pass, idClass], function (err) {
        if (err) {
            console.log(err.message);
        } else {
            res.sendFile(__dirname + '/public/index.html');
            console.log("Insert thanh cong");
        }


    });
});

//chạy lên local host với post 3000
app.listen(process.env.PORT || '3000');
