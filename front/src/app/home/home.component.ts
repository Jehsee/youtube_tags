import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  public YT: any;
  public video: any;
  public player: any;
  public reframed: boolean = false;
  public done: boolean = false;

  tagForm: FormGroup;
  playerCreated: boolean = false;
  showChipsComponent: boolean = false;
  youtubeUrl:string;

  constructor() { }

  ngOnInit() {
    this.tagForm = new FormGroup({
      youtubeLink: new FormControl('')
    })

    this.tagForm.valueChanges.subscribe(console.log)

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  onYouTubeIframeAPIReady(tagForm: FormGroup) {
    this.youtubeUrl = tagForm.value.youtubeLink
    let videoId = tagForm.value.youtubeLink.split('?v=')[1]
    if (this.player) {
      this.player.loadVideoById(videoId)
    } else {
      // @ts-ignore
      this.player = new YT.Player('player', {
        height: '450',
        width: '100%',
        videoId: videoId,
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onError': this.onPlayerError.bind(this)
        }
      });
      this.playerCreated = true;
    }
  }

  onPlayerReady(event) {
    event.target.playVideo();
    this.showChipsComponent = true;
  }

  onPlayerError(event) {
    if (event.data == 2) {
      console.log('the url seems to be invalid')
    }
  }


}
