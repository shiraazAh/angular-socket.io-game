import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("game")
  private gameCanvas: ElementRef;
  private context: any;  
  private socket: any;
  private mainRect: any;
  private bulletRect: any;

  public ngOnInit(){
    this.socket = io("http://localhost:3000");
  }

  public ngAfterViewInit(){
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.socket.on("mainRectPosition", mainRectPosition => {
      this.context.clearRect(
        0,
        0,
        this.gameCanvas.nativeElement.width,
        this.gameCanvas.nativeElement.height
      )
      this.mainRect = this.context.fillRect(mainRectPosition.x, mainRectPosition.y, 20, 20);
    });
    this.socket.on("bulletRectPosition", bulletRectPosition => {
      this.bulletRect = this.context.fillRect(bulletRectPosition.x, bulletRectPosition.y, 5, 5);
    });
  }

  public move(direction: string){
    this.socket.emit("move", direction);
  }
  
}
