import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  Sticker
} from './shared/interface/sticker.interface';
import {
  HttpStickerService
} from './shared/services/http-sticker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private httpServ: HttpStickerService) {}
  title = 'project14';
  stickers!: Sticker[];
  idCounter = 0
  async createSticker(sticker: Sticker) {
    try {
      sticker.id = ++this.idCounter
      await this.httpServ.postSticker(sticker)
    } catch (err) {
      console.log(err);
    } finally {
      this.getStickers()
    }
  }
  async deleteSticker(id: any) {
    try {
      await this.httpServ.deleteSticker(id)
    } catch (err) {
      console.log(err);
    } finally {
      this.getStickers()
    }
  }
  async getStickers() {
    try {
      this.stickers = await this.httpServ.getStickers()
    } catch (err) {
      console.log(err);
    } finally {
      this.stickers.sort((a, b) => {
        return a.id - b.id
      })
      this.idCounter = this.stickers[this.stickers.length - 1].id
    }
  }
  editSticker(data:Sticker){
    try{
      this.httpServ.editSticker(data)
    }catch(err){
      console.log(err);
      
    }
  }
  ngOnInit() {
    this.getStickers()
  }
}
