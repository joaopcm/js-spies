class Fibonacci {
  *execute(input, current = 0, next = 1) {
    console.count('executed');

    if (input === 0) {
      return 0;
    }

    // returns the value
    yield current;

    // delegates the function but does not return the value
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
