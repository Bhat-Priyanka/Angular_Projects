import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  calculate = output<InvestmentInput>();
  enteredInitialInvestment = signal(0);
  enteredYearlyContribution = signal(0);
  enteredExpectedReturn = signal(5);
  enteredDuration = signal(10);

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredYearlyContribution(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration()
    });
    this.enteredInitialInvestment.set(0);
    this.enteredYearlyContribution.set(0);
    this.enteredExpectedReturn.set(5);
    this.enteredDuration.set(10);
  }
}
