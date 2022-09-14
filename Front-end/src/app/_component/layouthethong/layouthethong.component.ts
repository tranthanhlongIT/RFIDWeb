import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '@app/_services/token-storage.service';

@Component({
  selector: 'app-layouthethong',
  templateUrl: './layouthethong.component.html',
  styleUrls: ['./layouthethong.component.css']
})
export class LayouthethongComponent implements OnInit {

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.token.signOut();
    this.router.navigate(['/']);
  }
}
