import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Task List';
  taskList: string[] = [

  ];

  email: string = '';
  pwd: string = '';
  user: User = null as any;

  constructor() {
    this.initFirebase();
  }
  ngOnInit(): void {
  }



  getUser() {
    onAuthStateChanged(getAuth(), (userObs) => {
      this.user = userObs as User;
    })
  }

  initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyDsvWBEmM2AcHiHuFCbrztJQg_xhgAY_iM",
      authDomain: "hazel-service-364415.firebaseapp.com",
      projectId: "hazel-service-364415",
      storageBucket: "hazel-service-364415.appspot.com",
      messagingSenderId: "791156466881",
      appId: "1:791156466881:web:2ad63b02ece007762da040",
      measurementId: "G-EJ0C4SFCV4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    this.getUser();
  }


  createAccount() {
    createUserWithEmailAndPassword(getAuth(), this.email, this.pwd).then(data => {
      console.log(data);
      this.user = data.user;

      this.saveUserToDB();
    }).catch(error => {
      console.log(error.message, error.code);

      // alert(error.message);
      // if (error.code == 'auth/weak-password') {
      //   alert('Password must be 6 characters');
      // }
    });
  }

  loginUser() {
    signInWithEmailAndPassword(getAuth(), this.email, this.pwd).then(data => {
      console.log(data);

    }).catch(err => {
      console.log((err.message));

    })
  }

  logout() {
    signOut(getAuth());
  }

  saveUserToDB() {
    set(ref(getDatabase(), "users/" + this.user.uid), {
      email: this.user.email,
      createdAt: this.user.metadata.creationTime,
      uid: this.user.uid
    }).then(() => {
      console.log('User created successfully!');

    }).catch(error => {
      console.log(error);

    })

  }


  updateProfile() {
    updateProfile(getAuth().currentUser as any, {
      displayName: 'John Doe',
      photoURL: 'https://i.pinimg.com/originals/e7/99/f0/e799f0e29158a3e2b0d51b94d1f0fa9d.jpg'
    })
  }


}