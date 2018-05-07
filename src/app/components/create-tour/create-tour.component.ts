import {Component, OnInit, trigger, state, style, animate, transition} from '@angular/core';
import {MouseEvent} from '@agm/core';
import {AppConstants} from "../../helpers/app-constants";
import {Router, ActivatedRoute} from "@angular/router";
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {NotificationService} from "../../services/notification.service";
import {ActiveTabService} from "../../services/active-tab.service";

@Component({
  moduleId: module.id,
  selector: 'app-main',
  styleUrls: ['create-tour.component.css'],
  templateUrl: 'create-tour.component.html',
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

export class CreateTourComponent implements OnInit {
  model: any = {driver: "-1"}
  wayPointArr: wayPoint[] = [];
  tourID = -1;
  zoom: number = 8; // google maps zoom level
  lat: number = 51.673858;  // initial center lat
  lng: number = 7.815982;   // initial center lng
  pageMode: number = 0; //0=view, 1=add, 2=edit


  constructor(private router: Router, private route: ActivatedRoute, private notificationService: NotificationService,
              private loadingBarService: SlimLoadingBarService, private activeTabService: ActiveTabService) {
    this.activeTabService.onNavTabClick(2);
  }


  ngOnInit() {
    // (+) converts string 'id' to a number
    this.tourID = this.route.snapshot.params['id'];
    if (this.router.url.indexOf('edit') >= 0)
      this.pageMode = 2;
    else if (this.router.url.indexOf('view') >= 0)
      this.pageMode = 0;
    else
      this.pageMode = 1;

    if (this.pageMode != 1) //  show details on edit/view mode
      this.loadTour();
  }

  loadTour() {
    this.loadingBarService.start();
    let tourArr = JSON.parse(localStorage.getItem('Tour')) || [];
    let tourObj = tourArr.find(x => x.id == this.tourID);
    this.model.driver = tourObj.driver;
    this.wayPointArr = tourObj.path;
    this.loadingBarService.complete();
    this.notificationService.printSuccessMessage('Tour Fetched Successfully');
  }

  clickedMarker(label: string, index: number) {
    //console.log(`clicked the wayPoint: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    let newMarker = {lat: $event.coords.lat, lng: $event.coords.lng, draggable: true, label: this.wayPointArr.length + ''};
    this.wayPointArr.push(newMarker);
  }

  markerDragEnd(m: wayPoint, $event: MouseEvent) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
  }

  lineDragEnd($event: any) {
    //console.log('Line clicked', $event);
  }

  onPostionChanges($event: any) {
    //console.log('Postion Changes', $event);
  }

  getDriverArr() {
    return AppConstants.DRIVER_ARR;
  }

  saveTour() {
    this.loadingBarService.start();
    let tourArr = JSON.parse(localStorage.getItem('Tour')) || [];
    let id:number = (tourArr.length > 0) ? tourArr[tourArr.length - 1].id + 1 : 0;
    tourArr.push({id: id, path: this.wayPointArr, driver: this.model.driver});
    localStorage.setItem('Tour', JSON.stringify(tourArr));
    this.router.navigate(['/main']);
    this.loadingBarService.complete();
    this.notificationService.printSuccessMessage('Tour Saved Successfully');
  }

  updateTour() {
    this.loadingBarService.start();
    let tourArr = JSON.parse(localStorage.getItem('Tour')) || [];
    let tourObj = tourArr.find(x => x.id == this.tourID);
    let index = tourArr.indexOf(tourObj);
    tourArr[index].id = this.tourID;
    tourArr[index].driver = this.model.driver;
    tourArr[index].path = this.wayPointArr;
    localStorage.setItem('Tour', JSON.stringify(tourArr));
    this.router.navigate(['/main']);
    this.loadingBarService.complete();
    this.notificationService.printSuccessMessage('Tour Updated Successfully');
  }
}


interface wayPoint {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
