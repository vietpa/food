import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store';
import { CartItem } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select((store) => store.cart);
  }
}
