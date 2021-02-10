const { deepStrictEqual } = require('assert');
const sinon = require('sinon');

const Fibonacci = require('./fibonacci');

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    /**
     * Generators return iterators.
     *
     * There are 3 ways to read the data:
     *  - using .next()
     *  - using await
     *  - using rest/spread
     */
    await Promise.all(fibonacci.execute(3));

    const expectedCallCount = 4;
    deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResult);
  }
})();
