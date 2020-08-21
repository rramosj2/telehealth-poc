import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var OT:any;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.apiKey = '45828062';
    this.sessionId = '1_MX40NTgyODA2Mn5-MTU5Nzg2MDU4OTQxOX5kL21OODYxckwzUWorWm1YaVZrZ1RxanJ-UH4';
    this.token = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9NWVhMjQ3MDJhZTNmMmY0OWI1YmVhYjg3ODJiYWYxZmZmZmZjMGIxODpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UVTVOemcyTURVNE9UUXhPWDVrTDIxT09EWXhja3d6VVdvcldtMVlhVlpyWjFSeGFuSi1VSDQmY3JlYXRlX3RpbWU9MTU5Nzg2MzMyMSZub25jZT0wLjcwMzcwNTk1NjA5NTQzNzUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5Nzk0OTcyMQ==';
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.startCall();
  }
  startCall() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.publisher = OT.initPublisher('publisher');

    this.session.on({
      streamCreated: (event: any) => {
        this.session.subscribe(event.stream, 'subscriber');
        OT.updateViews();
      },
      streamDestroyed: (event: any) => {
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
        OT.updateViews();        
      },
      sessionConnected: (event: any) => {
        this.session.publish(this.publisher);
      }
    });

    this.session.connect(this.token, (error: any) => {
      if (error) {
        console.log(`There was an error connecting to the session ${error}`);
      }
    });
  }

}
