import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(private http: HttpClient) { }


  public GetIp(){
    var url = "https://ipapi.co/json/"
    return this.http.get(url)
  }


  public sendMessage(botCode:any,message:any,chatId:any,notification:boolean){
    console.log("SendMessage")
    var url = "https://api.telegram.org/bot"+botCode+"/sendMessage?text="+message+"&chat_id="+chatId+"&parse_mode=html&disable_notification="+notification
    return this.http.get(url)
  }

}
