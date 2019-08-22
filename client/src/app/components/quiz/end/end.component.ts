import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  @Input() scorecard: string;
  constructor( ) { }

  ngOnInit() { }

}
