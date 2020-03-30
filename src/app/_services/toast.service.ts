import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private toastController: ToastController) { }

  async presentHintToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      showCloseButton: true,
      keyboardClose: true
    });
    await toast.present();
  }

  async presentAuthToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
      keyboardClose: true,
      closeButtonText: 'Ok'
    });
    await toast.present();
  }




  async presentLogOutToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      showCloseButton: true,
      keyboardClose: true
    });
    await toast.present();
  }
}
