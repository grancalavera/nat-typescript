import assert from "assert";

type Nat = Zero | Succ;

interface Zero {
  k: "Zero";
}

interface Succ {
  k: "Succ";
  v: Nat;
}

const succ = (v: Nat): Nat => ({ k: "Succ", v });

const zero: Nat = { k: "Zero" };
const one = succ(zero);
const two = succ(one);
const three = succ(two);
const four = succ(three);
const five = succ(four);

const toInt = (x: Nat): number => {
  switch (x.k) {
    case "Zero":
      return 0;
    case "Succ":
      return 1 + toInt(x.v);
    default:
      return assertNever(x);
  }
};

const fromNumber = (x: number): Nat => {
  assert.equal(x, Math.floor(x), `Error: "${x}" is not an integer`);
  assert(0 <= x, `Error: "${x}" is not positive`);
  return [...Array(x)].reduce(succ, zero);
};

const plus = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero") {
    return y;
  } else if (y.k === "Zero") {
    return x;
  } else {
    return { k: "Succ", v: plus(x.v, y) };
  }
};

const times = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero" || y.k === "Zero") {
    return zero;
  } else {
    return {
      k: "Succ",
      v: plus(y.v, times(x.v, y))
    };
  }
};

const isLessThan = (x: Nat, y: Nat): boolean => {
  if (x.k === "Zero" && y.k === "Zero") {
    return false;
  } else if (x.k === "Zero" && y.k === "Succ") {
    return true;
  } else if (x.k === "Succ" && y.k === "Zero") {
    return false;
  } else {
    return isLessThan((<Succ>x).v, (<Succ>y).v);
  }
};

const isGreaterThan = (x: Nat, y: Nat): boolean => {
  if (x.k === "Zero" && y.k === "Zero") {
    return false;
  } else if (x.k === "Zero" && y.k === "Succ") {
    return false;
  } else if (x.k === "Succ" && y.k === "Zero") {
    return true;
  } else {
    return isGreaterThan((<Succ>x).v, (<Succ>y).v);
  }
};

const isEqualTo = (x: Nat, y: Nat): boolean => {
  if (x.k === "Zero" && y.k === "Zero") {
    return true;
  } else if (x.k === "Succ" && y.k === "Zero") {
    return false;
  } else if (x.k === "Zero" && y.k === "Succ") {
    return false;
  } else {
    return isEqualTo((<Succ>x).v, (<Succ>y).v);
  }
};

const subtract = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero" && y.k === "Zero") {
    return x;
  } else if (x.k === "Zero" && y.k === "Succ") {
    throw new Error(`Error: subtract(x, y) "y" must be less than or equal to "x"`);
  } else if (x.k === "Succ" && y.k === "Zero") {
    return x;
  } else {
    return subtract((<Succ>x).v, (<Succ>y).v);
  }
};

const toString = (x: Nat): String => {
  switch (x.k) {
    case "Zero":
      return "Zero";
    case "Succ":
      return `Succ ( ${toString(x.v)} )`;
    default:
      return assertNever(x);
  }
};

assert.throws(() => subtract(zero, one), "subtract(x, y) should fail when x is less than y");
assert.throws(() => fromNumber(1.1), "fromNumber(x) should fail for non integer values");
assert.throws(() => fromNumber(-1), "fromNumber(x) should fail for negative values");

assert(isEqualTo(zero, zero), "isEqualTo(zero, zero) should be true");

assert(!isEqualTo(zero, one), "isEqualTo(zero, one) should be false");
assert(!isEqualTo(one, zero), "isEqualTo(one, zero) should be false");

assert(!isLessThan(zero, zero), "isLessThan(zero, zero) should be false");
assert(isLessThan(zero, one), "isLessThan(zero, one) should be true");
assert(!isLessThan(one, zero), "isLessThan(one, zero) should be false");

assert(!isGreaterThan(zero, zero), "isGreaterThan(zero, zero) should be false");
assert(!isGreaterThan(zero, one), "isGreaterThan(zero, one) should be false");
assert(isGreaterThan(one, zero), "isGreaterThan(one, zero)  should be true");

assert(isEqualTo(zero, plus(zero, zero)), "plus(zero, zero) should be zero");
assert(isEqualTo(one, plus(zero, one)), "plus(zero, one) should be one");
assert(isEqualTo(one, plus(one, zero)), "plus(one, zero) should be one");
assert(isEqualTo(two, plus(one, one)), "plus(one, one) should be two");

assert(isEqualTo(zero, times(zero, zero)), "times(zero, zero) should be zero");
assert(isEqualTo(zero, times(zero, one)), "times(zero, one) should be zero");
assert(isEqualTo(zero, times(one, zero)), "times(one, zero) should be zero");
assert(isEqualTo(one, times(one, one)), "times(one, one) should be one");
assert(isEqualTo(two, times(one, two)), "times(one, two) should be two");
assert(isEqualTo(two, times(two, one)), "times(two, one) should be two");
assert(isEqualTo(four, times(two, two)), "times(two, two) should be four");

assert(
  isEqualTo(plus(five, five), times(two, five)),
  "times(two, five) should be plus(five, five)"
);

console.log(toString(zero));
console.log(toString(one));
console.log(toString(two));
console.log(toString(three));
console.log(toString(four));
console.log(toString(five));

const plusFive = (x: Nat) => plus(five, x);
console.log(toString(plusFive(one)));
console.log(toString(plusFive(two)));
console.log(toString(plusFive(three)));
console.log(toString(plusFive(four)));
console.log(toString(plusFive(five)));

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
