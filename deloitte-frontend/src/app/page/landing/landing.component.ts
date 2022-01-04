import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';

@Component({selector: 'app-landing', templateUrl: './landing.component.html', styleUrls: ['./landing.component.scss']})
export class LandingComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this
      .renderer
      .setStyle(document.body, 'background-color', '#005587');
  }

  ngOnInit() {}

}
