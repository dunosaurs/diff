# diff

> Deno library for usage of diff Based on the O(n * m) DP solution to the LCS
> problem

```typescript
import { diffCharacters } from "https://deno.land/x/diff/mod.ts";

diffCharacters("ABCBDAB", "BDCABA");
```

## API

### diffCharacters(oldString: string, newString: string, ignoreCase = false): DiffCharacter[]

Compares two strings by character and returns a list

**oldString**: The string to be transformed

**newString**: The string to be transformed into

**ignoreCase**: Whether case differences should be taken into account

Returns an array of `DiffCharacter` objects (explained below)

### longestCommonSubsequence(a: string, b: string, ignoreCase = false)

Compares two strings by character and returns the
[longest common subsequence](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)

## Types

_DiffCharacter_

```typescript
{
  character:
  string;
  wasAdded:
  boolean;
  wasRemoved:
  boolean;
}
```

The object contains the character and whether that character was removed, added,
or neither. Here is example usage

```typescript
for (const character of diffCharacters("boopa", "boop beep boppy")) {
  let finalString = "";
  if (character.wasRemoved) {
    // print red if removed without newline
    finalString += `\x1b[31m${character.character}\x1b[0m`;
  } else if (character.wasAdded) {
    // print green if added
    finalString += `\x1b[32m${character.character}\x1b[0m`;
  } else {
    // print white if unchanged
    finalString += `\x1b[37m${character.character}\x1b[0m`;
  }
  console.log(finalString);
}
```

![image](https://user-images.githubusercontent.com/36348190/167757003-aef6e4c7-6c83-444e-ba04-7bb6c6681133.png)
