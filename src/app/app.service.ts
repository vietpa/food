import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private toaster: ToastrService) {}

  showSuccess(msg: string, title?: string, timeOut = 3000): void {
    this.toaster.success(msg, title, {
      timeOut,
      positionClass: 'toast-top-center',
    });
  }

  showInfo(msg: string, title?: string, timeOut = 3000): void {
    this.toaster.info(msg, title, {
      timeOut,
      positionClass: 'toast-top-center',
    });
  }

  showWarning(msg: string, title?: string, timeOut = 3000): void {
    this.toaster.warning(msg, title, {
      timeOut,
      positionClass: 'toast-top-center',
    });
  }

  showError(msg: string, title?: string, timeOut = 3000): void {
    this.toaster.error(msg, title, {
      timeOut,
      positionClass: 'toast-top-center',
    });
  }
}
