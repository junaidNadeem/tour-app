import {Component, OnInit, trigger, state, style, animate, transition} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {NotificationService} from "../../services/notification.service";
import {ActiveTabService} from "../../services/active-tab.service";
@Component({
  moduleId: module.id,
  selector: 'app-main',
  styleUrls: ['main.component.css'],
  templateUrl: 'main.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s  ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  tour: any = [];

  constructor(private notificationService: NotificationService, private loadingBarService: SlimLoadingBarService,
              private activeTabService: ActiveTabService) {
    this.activeTabService.onNavTabClick(1);
    this.loadingBarService.start();
    this.tour = JSON.parse(localStorage.getItem('Tour')) || [];
    this.loadingBarService.complete();
    this.notificationService.printSuccessMessage('Tour List Fetched Successfully');
  }


  //remove a Tour
  removeTour(tourID) {
    this.notificationService.openConfirmationDialog('Are you sure you want to delete this Tour?',
      () => {
        this.loadingBarService.start();
        let tourObj = this.tour.find(x => x.id == tourID);
        let index = this.tour.indexOf(tourObj, 0);
        if (index > -1)
          this.tour.splice(index, 1);
        localStorage.setItem('Tour', JSON.stringify(this.tour));
        this.loadingBarService.complete();
        this.notificationService.printSuccessMessage('Tour with ID ' + tourID + ', has been deleted.');

      });
  }

  ngOnInit() {
  }
}
