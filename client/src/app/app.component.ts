import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('game')
  private gameCanvas: ElementRef;
  private context: any;
  private socket: any;
  private mainRect: any;
  private bulletRect: any;
  public clearRect() {
    this.context.clearRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height
    )
  }

  public ngOnInit(){
    this.socket = io('http://localhost:3000');
  }

  public ngAfterViewInit(){
    this.context = this.gameCanvas.nativeElement.getContext('2d');
    this.socket.on('rectPosition', rectPosition => {
      this.clearRect();
      this.mainRect = this.context.fillRect(rectPosition.mainX, rectPosition.mainY, 20, 20);
      this.bulletRect = this.context.fillRect(rectPosition.bulletX, rectPosition.bulletY, 5, 5);
    });
  }

  public move(direction: string){
    this.socket.emit('move', direction);
  }

  constructor(public el: ElementRef, public renderer: Renderer2) {
    renderer.listen('document', 'keydown.arrowup', (event) => {
      return this.move('up');
    });
    renderer.listen('document', 'keydown.arrowdown', (event) => {
      return this.move('down');
    });
    renderer.listen('document', 'keydown.arrowright', (event) => {
      return this.move('right');
    });
    renderer.listen('document', 'keydown.arrowleft', (event) => {
      return this.move('left');
    });
 }
}
