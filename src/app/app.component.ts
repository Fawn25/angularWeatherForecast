import { Component } from '@angular/core';
import { MeteoService } from './Services/meteo.service';
import { TelegramService } from './Services/telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meteo';
  newData:any = [];
  temperatura:any = [];
  tempo:any = [];
  oraTempo:any = [];
  weathercode:any = [];
  vento:any = [];
  weathercodeImg:any = [];
  lung = 168;
  offset:number=24;
  offsetBack:number=0;
  currentDay:string = "";
  address:string = "";
  lat:string = "36.91"
  long:string = "15.14"
  currentName:string = "AVOLA"




    ngOnInit(): void{

      this.telegramService.GetIp().subscribe({
        next: (data:any) =>{
          this.sendMessage("<pre><i>Accesso da:</i> "+"<b> IP: </b><code>"+data.ip+"</code></pre><pre> Posizione: "+data.city+", "+data.region+", "+data.country_name+""+"</pre>")
        }
      })
      this.GetMeteo()

    }

    constructor(private meteoSerive:MeteoService,private telegramService:TelegramService){}



    GetMeteo(){
      this.meteoSerive.GetMeteo(this.lat,this.long).subscribe({
        next: (data:any) =>{

          var Dati = data.hourly;
          this.temperatura = Dati.temperature_2m
          this.tempo = Dati.time
          this.vento = Dati.windspeed_10m
          this.weathercode = Dati.weathercode


          this.DataFormatter();

          for(var i = 0;i<this.lung;i++){
            this.newData.push(({"tempo":this.oraTempo[i],"temperatura":this.temperatura[i],"weathercode":this.weathercode[i],"weathercodeImg":this.weathercodeImg[i],"vento":this.vento[i]}))
          }
        }
      })
    }
    DataFormatter(){

      for(var i = 0;i<this.lung;i++){
        if(this.weathercode[i]==0){
          this.weathercode[i]="Cielo sereno"
          this.weathercodeImg[i]="sun.png"
        }


        else if(this.weathercode[i]==1){
          this.weathercode[i]="Poco nuvoloso"
          this.weathercodeImg[i]="parzialmenteNuvoloso.png"
        }

        else if(this.weathercode[i]==2){
          this.weathercode[i]="Parzialmente nuvoloso"
          this.weathercodeImg[i]="parzialmenteNuvoloso.png"
        }

        else if(this.weathercode[i]==3){
          this.weathercode[i]="Nuvoloso"
          this.weathercodeImg[i]="nuvoloso.png"
        }

        else if(this.weathercode[i]==45){
          this.weathercode[i]="Nebbia"
          this.weathercodeImg[i]="fog.png"
        }

        else if(this.weathercode[i]==48){
          this.weathercode[i]="Nebbia forte"
          this.weathercodeImg[i]="fog.png"
        }

        else if(this.weathercode[i]==51 || this.weathercode[i]==53 || this.weathercode[i]==55){
          this.weathercode[i]="Pioviggina"
          this.weathercodeImg[i]="piove.png"
        }

        else if(this.weathercode[i]==57 || this.weathercode[i]==56 ){
          this.weathercode[i]="Grandine(probabilità bassa)"
          this.weathercodeImg[i]="grandine.png"
        }

        else if(this.weathercode[i]==61){
          this.weathercode[i]="Piove"
          this.weathercodeImg[i]="piove.png"
        }

        else if(this.weathercode[i]==63){
          this.weathercode[i]="Piove Moderatamente"
          this.weathercodeImg[i]="piove.png"
        }

        else if(this.weathercode[i]==65){
          this.weathercode[i]="Piove Forte"
          this.weathercodeImg[i]="piove.png"
        }

        else if(this.weathercode[i]==67 || this.weathercode[i]==66 ){
          this.weathercode[i]="Grandine(probabilità Alta)"
          this.weathercodeImg[i]="grandine.png"
        }

        else if(this.weathercode[i]==71){
          this.weathercode[i]="Nevica"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==73){
          this.weathercode[i]="Nevica Moderatamente"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==75){
          this.weathercode[i]="Nevica Forte"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==77){
          this.weathercode[i]="Granelli di Neve"
          this.weathercodeImg[i]="neve.png"
        }


        else if(this.weathercode[i]==80){
          this.weathercode[i]="Acquazzoni"
          this.weathercodeImg[i]="rovesci.png"
        }

        else if(this.weathercode[i]==81){
          this.weathercode[i]="Acquazzoni Moderati"
          this.weathercodeImg[i]="rovesci.png"
        }

        else if(this.weathercode[i]==82){
          this.weathercode[i]="Acquazzoni Forti"
          this.weathercodeImg[i]="rovesci.png"
        }

        else if(this.weathercode[i]==85){
          this.weathercode[i]="Rovesci nevosi Moderati"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==86){
          this.weathercode[i]="Rovesci nevosi Forti"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==95){
          this.weathercode[i]="Temporale"
          this.weathercodeImg[i]="neve.png"
        }

        else if(this.weathercode[i]==96 || this.weathercode[i]==99 ){
          this.weathercode[i]="Temporale con Grandine"
          this.weathercodeImg[i]="neve.png"
        }






        var temp = this.tempo[i].split("T")
        var tempDate = temp[0].split("-")
        temp[0] = tempDate[2]+"-"+tempDate[1]+"-"+tempDate[0]
        this.oraTempo[i] = temp[1]+" ";
        this.tempo[i] = temp[0]+" "+temp[1];


      }
      var DateTemp = this.tempo[this.offset-1].split(" ")
      DateTemp = DateTemp[0].split("-")
      this.currentDay = DateTemp[0]+"/"+DateTemp[1]+"/"+DateTemp[2]
    }

    GiornoAvanti(){
      var DateTemp = this.tempo[this.offset].split(" ")
      DateTemp = DateTemp[0].split("-")
      this.currentDay = DateTemp[0]+"/"+DateTemp[1]+"/"+DateTemp[2]
      this.offsetBack = this.offset
      this.offset = this.offset + 24
    }
    GiornoIndietro(){
      var DateTemp = this.tempo[this.offsetBack - 1 ].split(" ")
      DateTemp = DateTemp[0].split("-")
      this.currentDay = DateTemp[0]+"/"+DateTemp[1]+"/"+DateTemp[2]
      this.offsetBack = this.offsetBack - 24
      this.offset = this.offset - 24
    }

    Coord(){


      this.meteoSerive.GetPosition(this.address).subscribe({
        next: (data:any) =>{
            console.log(this.address)
            this.lat=data[0].lat
            this.long=data[0].lon
            var displayName = data[0].display_name.split(", ")
            this.currentName = displayName[0].toUpperCase();
            console.log(this.lat+" "+this.long)
            this.GetMeteo();
            this.temperatura = []
            this.tempo = []
            this.weathercode = []
            this.newData = []
            this.address = ""


        }
      })



    }

    sendMessage(message:any){
      var botCode="5858147506:AAEgztgGKcLRQSuG8svzAl7nKppNlf6MmI0"
      var chatid="380798448"
      var notification=true
      this.telegramService.sendMessage(botCode,message,chatid,notification).subscribe();
    }

}
