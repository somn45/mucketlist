"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.auth = void 0;
var _app = require("firebase/app");
var _auth = require("firebase/auth");
var _firestore = require("firebase/firestore");
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA6Je5RyubpRZ03U7W7hpVguLNva3Tz8W0',
  authDomain: 'mucketlist-ecfd0.firebaseapp.com',
  projectId: 'mucketlist-ecfd0',
  storageBucket: 'mucketlist-ecfd0.appspot.com',
  messagingSenderId: '292072337648',
  appId: '1:292072337648:web:33b78fc06a59f13dbf1235'
};

// Initialize Firebase
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;