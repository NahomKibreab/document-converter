import { ConversionStrategy } from './interfaces/conversion-strategy.interface';

export class ConversionContext {
  private strategy: ConversionStrategy;

  setStrategy(strategy: ConversionStrategy) {
    this.strategy = strategy;
  }

  convert(input: any): any {
    return this.strategy.convert(input);
  }
}
