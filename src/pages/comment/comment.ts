import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment : Comment =null;
  dish : Dish =null;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: [5, Validators.required],
        comment: ['', Validators.required],
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.comment);
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.comment=this.commentForm.value;
    this.comment.date=(new Date()).toISOString();
    // this.dish.comments.push(this.comment);
    console.log(this.comment);

    this.viewCtrl.dismiss(this.comment);
  }

}
