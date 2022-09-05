import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DATA } from 'src/app/shared/data';
import { IAppState } from 'src/app/store';
import { RemoveItemAction } from 'src/app/store/cart/cart.actions';
import { CartItem } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  cartItems$: any = {};
  subscription: Subscription | undefined;
  categories: any = [];
  price: number = 0;
  appliedCode = false;
  constructor(private store: Store<IAppState>, private appService: AppService) {
    this.resetCart();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select((store) => store.cart)
      .subscribe((data: any) => {
        this.resetCart();
        data.forEach((item: any) => {
          const discount =
            item.product.category.id === 3 && item.quantity >= 10 ? 0.1 : 0;
          const price = item.product.realPrice * item.quantity * (1 - discount);
          this.cartItems$[item.product.category.name].items.push({
            ...item,
            discount,
            price,
          });
        });
        let totalPrice = 0;
        for (const key in this.cartItems$) {
          if (this.cartItems$[key].items.length) {
            this.categories.push(key);
            let discount = 0;
            let price = 0;
            this.cartItems$[key].items.forEach((item: any) => {
              price += item.price;
            });
            if (key === 'Baking/Cooking Ingredients' && price >= 50) {
              discount = 5;
              price = price - 5;
            }
            this.cartItems$[key].discount = discount;
            this.cartItems$[key].price = price;
            this.price += price;
          } else {
            delete this.cartItems$[key];
          }
        }
      });
  }

  resetCart(): void {
    this.price = 0;
    this.cartItems$ = {};
    this.categories = [];
    DATA.CATEGORIES.forEach((category: any) => {
      this.cartItems$[category.name] = { price: 0, discount: 0, items: [] };
    });
  }

  apply(evt: any): void {
    if (evt.value === DATA.PROMOTION_CODE) {
      this.appliedCode = true;
      this.appService.showSuccess('Promotion code is applied');
    } else {
      this.appService.showError('Invalid code');
    }
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(new RemoveItemAction(item));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
