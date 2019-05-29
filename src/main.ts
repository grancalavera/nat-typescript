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

const plus = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero") {
    return y;
  } else if (y.k === "Zero") {
    return x;
  } else {
    return { k: "Succ", v: plus(x.v, y) };
  }
};

const plus_ = (x: Nat) => (y: Nat) => plus(x, y);

const times = (x: Nat, y: Nat): Nat => {
  if (x.k === "Zero" || y.k === "Zero") {
    return zero;
  } else {
    return {
      k: "Succ",
      // v: plus(times(one, y.v), times(x.v, y))
      v: plus(y.v, times(x.v, y))
    };
  }
};

// cart :: [a] -> [b] -> [(a,b)]
// cart [] _ = []
// cart _ [] = []
// cart (x:xs) (y:ys) = (x,y) : (cart [x] ys) `conc` (cart xs (y:ys))

const plus1 = plus_(succ(zero));

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

const show = (x: Nat) => {
  console.log(JSON.stringify(x, null, 2));
  console.log(toInt(x));
};

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

// show(plus(zero, succ(zero)));
// show(plus1(zero));
// show(plus(succ(zero), succ(zero)));
show(times(three, five));
