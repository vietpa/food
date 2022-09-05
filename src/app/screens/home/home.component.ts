import { Component, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { DATA } from 'src/app/shared/data';
import { IAppState } from 'src/app/store';
import {
  AddItemAction,
  IncreaseQuantity,
} from 'src/app/store/cart/cart.actions';
import { CartItem } from 'src/app/store/cart/cart.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: any[];
  products: any[];
  cartItems$: CartItem[] = [];
  subscription: any = {};
  constructor(private store: Store<IAppState>, private appService: AppService) {
    this.products = DATA.PRODUCTS.map((p: any) => {
      return {
        ...p,
        realPrice: p.price - p.reduced,
        category: this.getCategory(p.category),
      };
    });
    this.categories = DATA.CATEGORIES.map((c: any) => {
      return {
        ...c,
        products: this.getProducts(c.id).map((p: any) => {
          return {
            ...p,
            realPrice: p.price - p.reduced,
            category: this.getCategory(p.category),
          };
        }),
      };
    });
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.subscription.cart = this.store
      .select((store) => store.cart)
      .subscribe((data: CartItem[]) => {
        this.cartItems$ = data;
      });
  }

  getCategory(categoryId: number): any {
    return DATA.CATEGORIES.find((x: any) => x.id === categoryId);
  }

  getProducts(categoryId: number): any[] {
    return DATA.PRODUCTS.filter((x: any) => x.category === categoryId);
  }

  addToCart(product: any): void {
    if (product.quantity > 0) {
      const index = this.cartItems$.findIndex(
        (item: any) => item.product.id === product.id
      );
      if (index < 0) {
        const cartItem = {
          id: uuidv4(),
          quantity: 1,
          product: { ...product },
        };
        this.appService.showSuccess('Add to cart successful!');
        this.store.dispatch(new AddItemAction(cartItem));
      } else {
        if (this.cartItems$[index].quantity < product.quantity) {
          this.appService.showSuccess('Add to cart successful!');
          this.store.dispatch(new IncreaseQuantity(this.cartItems$[index]));
        } else {
          this.appService.showError('Maximum available quantity');
        }
      }
    }
  }

  ngOnDestroy(): void {
    for (let key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }
}
