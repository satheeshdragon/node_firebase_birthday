// Import the ORM to create functions that will interact with the database.
// var orm = require("../config/orm.js");
// require("../config/connection.js");

    var firebase = require("firebase-admin");

var serviceAccount = require("../config/my-firebase-node.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://my-firebase-node-nov.firebaseio.com"
});

var db = firebase.firestore();


var hotdog = {
  all: function(cb) {
    // orm.all("hotdogs", function(res) {
    //   cb(res);
    // });


   let user_data = [];
  
   let citiesRef = db.collection('users');
   let allCities = citiesRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      // temp_data
      var data = {
        "id" : doc.id,
      };
      // user_data.push(doc.id);  // Id With_Data
      user_data.push(doc.data());  // Id With_Data
      // console.log(doc.id, '=>', doc.data());
      // console.log(doc.id, '=>', doc.data());
    });

    cb(user_data);   
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  // console.log(user_data);


  },
  // The variables cols and vals are arrays.
  create: function(req,count) {
    // console.log(count);

  var First_name = req.body.First_name;
  var Last_name  = req.body.Last_name;
  var Born       = req.body.Born;

     let data = {
        User_id: count,
        last: Last_name,
        first: First_name,
        born: Born
      };

  let setDoc = db.collection('users').doc(count.toString()).set(data);


  },
  update: function(objColVals, condition, cb) {
    orm.update("hotdogs", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("hotdogs", condition, function(res) {
      cb(res);
    });
  },
  increment_id: function(cb) {
    let increment_id = db.collection('users').get().then(function(querySnapshot) {      
      cb(querySnapshot.size);
    });
  },
  delete_user_data: function(req) {
    var Master_id = req.body.Master_id;
    console.log(Master_id);

    db.collection("users").doc(Master_id).delete().then(function() {
        // console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

  },
  edit_user_data: function(req,cb) {
    var Master_id = req.body.Master_id;
    // console.log(Master_id);

    let cityRef = db.collection('users').doc(Master_id);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          // console.log('Document data:', doc.data());
          cb(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    
  },
  update_user_data: function(req,cb) {
    var Master_id = req.body.Master_id;
    // console.log(Master_id);

      var First_name = req.body.First_name;
      var Last_name  = req.body.Last_name;
      var Born       = req.body.Born;

         let data = {
            User_id: Master_id,
            last: Last_name,
            first: First_name,
            born: Born
          };
      // console.log(data);
  let setDoc = db.collection('users').doc(Master_id.toString()).set(data);

    // let cityRef = db.collection('users').doc(Master_id);
    // let getDoc = cityRef.get()
    //   .then(doc => {
    //     if (!doc.exists) {
    //       console.log('No such document!');
    //     } else {
    //       // console.log('Document data:', doc.data());
    //       cb(doc.data());
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   });
    
  },

};

// Export the database functions for the controller (hotdogsController.js).
module.exports = hotdog;
