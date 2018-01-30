import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderProvider } from '../../providers/leader/leader';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Leader } from '../../shared/leader';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private leaderservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
