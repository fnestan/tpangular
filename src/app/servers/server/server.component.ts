import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const name = this.route.snapshot.paramMap.get('name');
    const status = this.route.snapshot.paramMap.get('status');
    this.server = this.serversService.getServer(+id);


    this.server = {id: +id, name, status};

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.server = {id: +paramMap.get('id'), name: paramMap.get('name'), status: paramMap.get('status')}
      }
    );
  }

  edit(id) {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
