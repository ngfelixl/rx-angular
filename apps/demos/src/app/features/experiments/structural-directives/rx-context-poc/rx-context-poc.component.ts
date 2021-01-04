import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StrategyProvider } from '../../../../rx-angular-pocs';

@Component({
  selector: 'rxa-rx-context-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select
          (strategyChange)="strategyProvider.primaryStrategy = $event"
        >
        </rxa-strategy-select>
        <rxa-trigger-provider
          #triggers="rxaTriggerProvider"
        ></rxa-trigger-provider>
        <br />
        <rxa-array-provider
          [buttons]="true"
          #a="rxaArrayProvider"
        ></rxa-array-provider>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col dh-embedded-view p-2">
          <h3>Placed before</h3>
          <div
            class="ctx before"
            [rxContextContainer]="a.array$"
            [suspenseTrg]="triggers.suspense$"
            [errorTrg]="triggers.error$"
            [completeTrg]="triggers.complete$"
          >
            <ul rxAfterContext *rxFor="let item of a.array$; let n">
              <li>{{ item.id }} - {{ item.value }}</li>
            </ul>

            <div
              class="tpl rx-suspense-tpl d-flex justify-content-start align-items-center w-100"
              rxSuspense
            >
              <mat-icon>refresh</mat-icon>
              <span class="ml-1 flex-grow-1">Loading...</span>
            </div>
            <div
              class="tpl rx-complete-tpl d-flex justify-content-start align-items-center w-100"
              rxComplete
            >
              <mat-icon>thumb_up</mat-icon>
              <span class="ml-1 flex-grow-1">Congrats!</span>
            </div>
            <div
              class="tpl rx-error-tpl d-flex justify-content-start align-items-center w-100"
              rxError
            >
              <mat-icon>thumb_down</mat-icon>
              <span class="ml-1 flex-grow-1">Ups.</span>
            </div>
          </div>
        </div>
        <div class="col dh-embedded-view p-2">
          <h3>Placed custom</h3>
          <div
            class="ctx custom"
            [rxContextContainer]="a.array$"
            [suspenseTrg]="triggers.suspense$"
            [errorTrg]="triggers.error$"
            [completeTrg]="triggers.complete$"
          >
            <ul *rxFor="let item of a.array$; let n">
              <li>{{ item.id }} - {{ item.value }}</li>
            </ul>

            <div class="tpl rx-suspense-tpl d-flex justify-content-center align-items-center" rxSuspense>
              <mat-progress-spinner
                [diameter]="80"
                [color]="'primary'"
                [mode]="'indeterminate'"
              ></mat-progress-spinner>
            </div>

            <div class="rx-error-tpl" rxComplete>
              <mat-icon>thumb_up</mat-icon>
            </div>
            <div class="tpl rx-complete-tpl" rxComplete>
              <mat-icon>thumb_up</mat-icon>
            </div>
          </div>
        </div>
        <div class="col dh-embedded-view p-2">
          <h3>Placed after</h3>
          <div
            class="tpl ctx after"
            [rxContextContainer]="a.array$"
            [suspenseTrg]="triggers.suspense$"
            [errorTrg]="triggers.error$"
            [completeTrg]="triggers.complete$"
          >
            <ul *rxFor="let item of a.array$; let n">
              <li>{{ item.id }} - {{ item.value }}</li>
            </ul>

            <div
              class="tpl rx-suspense-tpl d-flex justify-content-start align-items-center w-100"
              rxSuspense
            >
              <mat-icon>refresh</mat-icon>
              <span class="ml-1 flex-grow-1">Loading...</span>
            </div>
            <div
              class="tpl rx-complete-tpl d-flex justify-content-start align-items-center w-100"
              rxComplete
            >
              <mat-icon>thumb_up</mat-icon>
              <span class="ml-1 flex-grow-1">Congrats!</span>
            </div>
            <div
              class="tpl rx-error-tpl d-flex justify-content-start align-items-center w-100"
              rxError
            >
              <mat-icon>thumb_down</mat-icon>
              <span class="ml-1 flex-grow-1">Ups.</span>
            </div>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;',
  },
  providers: [StrategyProvider],
  styles: [
    `
      .ctx {
        border: 1px dashed hotpink;
        padding: 15px;
      }

      .ctx.before .tpl,
      .ctx.after .rx-suspense-tpl,
      .ctx.after .rx-error-tpl,
      .ctx.after .rx-complete-tpl {
        border: 2px solid;
      }

      .ctx.before .rx-suspense-tpl,
      .ctx.after .rx-suspense-tpl {
        border-color: #0074d9;
        color: #0074d9;
      }

      .ctx.before .rx-error-tpl,
      .ctx.after .rx-error-tpl {
        border-color: #dc0030;
        color: #dc0030;
      }

      .ctx.before .rx-complete-tpl,
      .ctx.after .rx-complete-tpl {
        border-color: #008800;
        color: #008800;
      }

      .ctx.custom {
        position: relative;
        min-height: 100px;
      }
      .ctx.custom .rx-suspense-tpl {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .ctx.custom .rx-error-tpl,
      .ctx.custom .rx-complete-tpl,
      .ctx.custom .rx-complete-tpl {
        margin: 20px auto;
        font-size: 5rem;
        height: initial;
        width: initial;
      }
    `,
  ],
})
export class RxContextPocComponent {
  constructor(public strategyProvider: StrategyProvider) {}
}
