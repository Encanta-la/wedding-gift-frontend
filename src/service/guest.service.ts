import { GuestDto } from '@/types/guest.type';
import { LocalStorageService } from './localstorage.service';

export class GuestService {
  localStorageService: LocalStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  getGuestId() {
    const guestRaw = this.localStorageService.getItem('whoIs');

    if (!guestRaw) {
      return null;
    }

    const guest: GuestDto = JSON.parse(guestRaw);

    return guest.id;
  }
}
