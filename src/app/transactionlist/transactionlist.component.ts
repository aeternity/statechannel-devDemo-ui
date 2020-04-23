import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SdkService } from '../sdk.service'

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['../../../ArrowNavigationStyles/css/demo.css', '../../../ArrowNavigationStyles/css/component.css', '../../../ArrowNavigationStyles/css/normalize.css']
})
export class TransactionlistComponent implements OnInit {


  dummyUpdates: any[] = [{type:"out"}, {type:"out"}, {type:"out"}, {type:"in"}, {type:"in"}, {type:"out"}]
  channelUpdates: any[] = []

  constructor(private sdkService: SdkService) {

  }

  initChannelAndWaitForContract() {
    this.sdkService.initChannel().then(async (channel) => {
      channel.onOpened(async () => {
        // Block all channel operations util contract is created
        await channel.awaitContractCreate();
      });
    }).catch(e => { debugger });
  }

  ngOnInit() {
    this.initChannelAndWaitForContract();
    this.channelUpdates = ["foo"];

    console.log(Math.random());


    setInterval(() => {
      if (this.channelUpdates.length < 7 && Math.random() < 0.5)  {
        this.channelUpdates.unshift(this.dummyUpdates.pop())
      }
    }, 1000)


  }

}
