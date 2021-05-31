import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Sticker
} from '../interface/sticker.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpStickerService {
  tables = {
    stickers: "stickers/",
  }
  routeURL = "http://localhost:3000/"
  constructor(private http: HttpClient) {}
  getStickers(): Promise < any > {
    return this.http.get(this.routeURL + this.tables.stickers).toPromise()
  }
  postSticker(data: Sticker) {
    return this.http.post(this.routeURL + this.tables.stickers, data).toPromise()
  }
  deleteSticker(id: number) {
    return this.http.delete(this.routeURL + this.tables.stickers + id).toPromise()
  }
  editSticker(data:Sticker){
    return this.http.patch(this.routeURL + this.tables.stickers + data.id,data).toPromise()
  }
}
