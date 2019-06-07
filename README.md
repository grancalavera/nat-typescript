# Natural Numbers Toy

> From zero to infinity and beyond.

Read [the code](./src/main.ts):

```typescript
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
```

Run [the app](./package.json#L15):

```
Zero
Succ ( Zero )
Succ ( Succ ( Zero ) )
Succ ( Succ ( Succ ( Zero ) ) )
Succ ( Succ ( Succ ( Succ ( Zero ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) ) ) ) ) )
Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Succ ( Zero ) ) ) ) ) ) ) ) ) )
```

Compare with the [haskell](https://github.com/grancalavera/nat-haskell) version
