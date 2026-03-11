import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-assets',
  imports: [NgIf],
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets {
  showGroundDialog = false;
  showAirDialog = false;
  showNavalDialog = false;
  showSpatialDialog = false;
  openGroundDialog() {
    this.showGroundDialog = true;
  }

  closeGroundDialog() {
    this.showGroundDialog = false;
  }

  openAirDialog() {
    this.showAirDialog = true;
  }

  closeAirDialog() {
    this.showAirDialog = false;
  }

  openNavalDialog() {
    this.showNavalDialog = true;
  }

  closeNavalDialog() {
    this.showNavalDialog = false;
  }

  openSpatialDialog() {
    this.showSpatialDialog = true;
  }

  closeSpatialDialog() {
    this.showSpatialDialog = false;
  }
}
