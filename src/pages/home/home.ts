import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { LrtProvider } from '../../providers/lrt/lrt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lrtStations: any;
  public lrtFareData: any;
  public locationFrom: string;
  public locationTo: string;
  public locationFromFullDetails: any;
  public locationToFullDetails: any;

  private getAllLrtStationsParams = 'list_all_rail_stop';

  constructor(
    private navCtrl: NavController,
    private lrtProvider: LrtProvider,
  ) {
    this.loadLrtStations(this.getAllLrtStationsParams); // get all by default
  }

  loadLrtStations(searchParam): void {
    this.lrtProvider.getLrtStations(searchParam).subscribe((res: any) => {
      // this.lrtStations = res ? res.json().forEach((item) => item['value'] = item['stop_name']) : null;
      this.lrtStations = res.json();
    }, (err: any) => {
      console.log('Error getting LRT stations', err);
    });
  }

  locationFromChanged(selectedLocation: any): void {
    this.locationFromFullDetails = selectedLocation;
  }

  locationToChanged(selectedLocation: any): void {
    this.locationToFullDetails = selectedLocation;
  }

  calculateFare(): void {
    let urlParam = `list_fare&from=${this.locationFrom['stop_id']}&to=${this.locationTo['stop_id']}`;
    this.lrtProvider.getLrtStations(urlParam).subscribe((res: any) => {
      this.lrtFareData = res.json();
    }, (err: any) => {
      console.log('Error getting fare for LRT stations', err);
    });
  }

  goToAbout() {
    console.log('go to about page');
    this.navCtrl.push(AboutPage);
  }

}
