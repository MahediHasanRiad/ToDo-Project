const ToDoModel = require("../models/todoModel");

exports.createTodo = (req, res) => {
  let date = Date.now();

  let query = {
    UserName: req.headers.userName,
    ToDoSubject: req.body["ToDoSubject"],
    ToDoDescription: req.body["ToDoDescription"],
    ToDoStatus: req.body['ToDoStatus'],
    ToDoCreateData: date,
  };

  ToDoModel.create(query, (err, data) => {
    if (err) {
      res.status(404).json({ status: "fail", massage: err });
    } else {
      console.log(req.headers.userName);
      res.status(200).json({ status: "success", massage: data });
    }
  });
};

exports.showToDoList = (req, res) => {
  const query = req.headers.userName;
  // console.log(query)

  ToDoModel.find({ userName: query }, (err, data) => {
    if (err) {
      res.status(404).json({ status: "fail", massage: err });
    } else {
      res.status(200).json({ status: "success", massage: data });
    }
  });
};

exports.updateToDoList = (req, res) => {
  let id = req.body['_id']
  let subject = req.body['ToDoSubject']
  let description = req.body['ToDoDescription']
  let updateTime = Date.now()

  let query = {
        ToDoSubject: subject,
        ToDoDescription: description,
        ToDoUpdateDate: updateTime
  }

  ToDoModel.updateOne({_id: id}, {$set: query}, (err, data) => {
    if (err) {
      res.status(404).json({ status: "fail", massage: err });
    } else {
      res.status(200).json({ status: "success", massage: data });
    }
  });
};

exports.deleteToDoList = (req, res) => {
  let id = req.body['_id']

  ToDoModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(404).json({ status: "fail", massage: err });
    } else {
      res.status(200).json({ status: "success", massage: data });
    }
  });
};



exports.statusUpdate = (req, res) => {
    let id = req.body['_id']
    let status = req.body['ToDoStatus']

    let query = {
        _id: id,
        ToDoStatus: status
    }

    ToDoModel.updateOne({_id: id}, query, (err, data) => {
        if (err) {
            res.status(404).json({ status: "fail", massage: err });
          } else {
            res.status(200).json({ status: "success", massage: data });
          }
    })
}



exports.filterByteStatus = (req, res)=> {
    const userName = req.headers.userName;
    let query = req.body['ToDoStatus']
    console.log(query)

    ToDoModel.find({userName: userName, ToDoStatus: query}, (err, data) => {

        if (err) {
            res.status(404).json({ status: "fail", massage: err });
          } else {
            res.status(200).json({ status: "success", massage: data });
          }
    })
}


exports.filterByDate = (req, res) => {
    let user = req.headers.userName
    let fromDate = req.body['FromDate']
    let toDate = req.body['ToDate']

    ToDoModel.find({userName: user, ToDoCreateData: {$gte: new Date(fromDate), $lte: new Date(toDate)}}, (err, data)=> {
        if (err) {
            res.status(404).json({ status: "fail", massage: err });
          } else {
            res.status(200).json({ status: "success", massage: data });
          }
    })
}



