import {
  ConversionStrategy,
  ConversionStrategyInput,
} from './interfaces/conversion-strategy.interface';

export class ConversionContext {
  private strategy: ConversionStrategy;

  setStrategy(strategy: ConversionStrategy) {
    this.strategy = strategy;
  }

  convert(input: ConversionStrategyInput): any {
    return this.strategy.convert(input);
  }
}
