import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private http: HttpClient) { }

  public GetPosition(position:string){
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q="
    return this.http.get(url+position)
  }
  public GetMeteo(lat:string,long:string){
    return this.http.get("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&hourly=temperature_2m,weathercode,windspeed_10m")
  }

}
