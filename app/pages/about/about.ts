import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})

export class AboutPage {
  private items: any;
  
  constructor(private navCtrl: NavController) {    
  }
  slides = [
  {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "http://ionicframework.com/dist/preview-app/www/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "http://ionicframework.com/dist/preview-app/www/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "http://ionicframework.com/dist/preview-app/www/img/ica-slidebox-img-3.png",
    }
  ];
  
}