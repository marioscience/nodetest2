var express = require('express');
var router = express.Router();

router.get('/userlist', function (req, res) {
  var db = req.db;
  var userlist = db.get('userlist');
  userlist.find({}, {}, function (e, docs) {
    res.json(docs);
  })
});

/* POST to Add User */
router.post('/adduser', function (req, res) {
    var db = req.db;
    var userlist = db.get('userlist');

    userlist.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* DELETE our users */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var userlist = db.get('userlist');
    var userToDelete = req.params.id;
    userlist.remove({'_id': userToDelete}, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err })
    });
});

/* UPDATE users*/
router.put('/updateuser/:id', function (req, res) {
    var db = req.db;
    var userlist = db.get('userlist');
    var userToUpdate = req.params.id;

    userlist.update({ '_id': userToUpdate}, req.body, function (err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: 'error: ' + err }
        );
    });
});

module.exports = router;
