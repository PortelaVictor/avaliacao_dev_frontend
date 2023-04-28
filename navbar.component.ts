import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    isCollapsed = true;
    
    constructor() {
    }

    ngOnInit(){
    }
}
