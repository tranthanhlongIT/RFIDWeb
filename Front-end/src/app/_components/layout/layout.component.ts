import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@app/_services/storage.service';

@Component({
  selector: 'app-Layout',
  templateUrl: './Layout.component.html',
  styleUrls: ['./Layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private token: StorageService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.token.signOut();
    this.router.navigate(['/']);
  }
}
