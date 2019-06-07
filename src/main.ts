import assert from "assert";

type Nat = Zero | Succ;

interface Zero {
  k: "Zero";
}

interface Succ {
  k: "Succ";
  v: Nat;
}

enum Ordering {
  LT,
  EQ,
  GT
}

const compare = (x: Nat, y: Nat): Ordering => {
  if (x.k === "Zero" && y.k === "Zero") {
    return Ordering.EQ;
  } else if (x.k === "Zero") {
    return Ordering.LT;
  } else if (y.k === "Zero") {
    return Ordering.GT;
  } else {
    return compare(x.v, y.v);
  }
};

const isLT = (x: Nat, y: Nat): boolean => compare(x, y) === Ordering.LT;
const isEQ = (x: Nat, y: Nat): boolean => compare(x, y) === Ordering.EQ;
const isGT = (x: Nat, y: Nat): boolean => compare(x, y) === Ordering.GT;

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

const subtract = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero" && y.k === "Zero") {
    return x;
  } else if (x.k === "Zero" && y.k === "Succ") {
    throw new Error(
      `Error: subtract(x, y) "y" must be less than or equal to "x"`
    );
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
      return `Succ of ${toString(x.v)}`;
    default:
      return assertNever(x);
  }
};

assert.throws(
  () => subtract(zero, one),
  "subtract(x, y) should fail when x is less than y"
);
assert.throws(
  () => fromNumber(1.1),
  "fromNumber(x) should fail for non integer values"
);
assert.throws(
  () => fromNumber(-1),
  "fromNumber(x) should fail for negative values"
);

assert(isEQ(zero, zero), "isEQ(zero, zero) should be true");

assert(!isEQ(zero, one), "isEQ(zero, one) should be false");
assert(!isEQ(one, zero), "isEQ(one, zero) should be false");

assert(!isLT(zero, zero), "isLT(zero, zero) should be false");
assert(isLT(zero, one), "isLT(zero, one) should be true");
assert(!isLT(one, zero), "isLT(one, zero) should be false");

assert(!isGT(zero, zero), "isGT(zero, zero) should be false");
assert(!isGT(zero, one), "isGT(zero, one) should be false");
assert(isGT(one, zero), "isGT(one, zero)  should be true");

assert(isEQ(zero, plus(zero, zero)), "plus(zero, zero) should be zero");
assert(isEQ(one, plus(zero, one)), "plus(zero, one) should be one");
assert(isEQ(one, plus(one, zero)), "plus(one, zero) should be one");
assert(isEQ(two, plus(one, one)), "plus(one, one) should be two");

assert(isEQ(zero, times(zero, zero)), "times(zero, zero) should be zero");
assert(isEQ(zero, times(zero, one)), "times(zero, one) should be zero");
assert(isEQ(zero, times(one, zero)), "times(one, zero) should be zero");
assert(isEQ(one, times(one, one)), "times(one, one) should be one");
assert(isEQ(two, times(one, two)), "times(one, two) should be two");
assert(isEQ(two, times(two, one)), "times(two, one) should be two");
assert(isEQ(four, times(two, two)), "times(two, two) should be four");

assert(
  isEQ(plus(five, five), times(two, five)),
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
