// src/app/decisionmaking/decisionmaking.component.ts
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {Component, ViewEncapsulation} from '@angular/core';
import {
  ArgumentRequest,
  Decision,
  SummaryResponse,
  ArgumentService
} from '../../Services/argument.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-decisionmaking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './decisionmaking.component.html',
  styleUrls: ['./decisionmaking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DecisionmakingComponent {
  oneReq: ArgumentRequest = { speaker: '', text: '' };
  oneDecision?: Decision;

  // keep every sent arg for summary
  history: ArgumentRequest[] = [];
  summaryResp?: SummaryResponse;

  constructor(private svc: ArgumentService) {}

  submitOne() {
    if (!this.oneReq.speaker || !this.oneReq.text) return;

    // record for summary later
    this.history.push({ ...this.oneReq });

    this.svc.evalOne(this.oneReq)
      .subscribe(dec => this.oneDecision = dec);

    // clear form
    this.oneReq = { speaker: '', text: '' };
  }

  loadSummary() {
    if (!this.history.length) return;
    this.svc.summaryBatch(this.history)
      .subscribe(summary => this.summaryResp = summary);
  }

}
