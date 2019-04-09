import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ng-demo";
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBm3k-6ygIDYJbpRv2ao5J_fHqIYqv69ic",
      authDomain: "ng-recipe-buks.firebaseapp.com"
    });
  }
}
