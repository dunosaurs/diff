import { IDiffCharacter } from "./types.ts";

export function longestCommonSubsequence(a: string, b: string): string {
  const arr: {
    length: number;
    character: string | null;
    previous: number[];
  }[][] = [];

  for (let i = 0; i < a.length; i++) {
    arr[i] = [];
    for (let j = 0; j < b.length; j++) {
      arr[i].push({
        length: 0,
        previous: [-1, -1],
        character: null,
      });
    }
  }
  const steps = [
    [-1, 0],
    [0, -1],
  ];
  function inBoundary(i: number, j: number): boolean {
    return i >= 0 && i < a.length && j >= 0 && j < b.length;
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const currentObject: {
        length: number;
        previous: number[];
        character: string | null;
      } = {
        length: 0,
        previous: [-1, -1],
        character: null,
      };
      // @ts-ignore: <steps does have an iterator>
      for (const step of steps) {
        const h = i + step[0];
        const w = j + step[1];
        if (inBoundary(h, w)) {
          const previousObject = arr[h][w];
          if (previousObject.length > currentObject.length) {
            currentObject.length = previousObject.length;
            currentObject.previous = [h, w];
          }
        }
      }
      if (a[i] === b[j]) {
        if (
          i > 0 &&
          j > 0 &&
          arr[i - 1][j - 1].length + 1 > currentObject.length
        ) {
          currentObject.length = arr[i - 1][j - 1].length + 1;
          currentObject.previous = [i - 1, j - 1];
          currentObject.character = a[i];
        } else if (i == 0 || j == 0) {
          currentObject.character = a[i];
          currentObject.length = 1;
          currentObject.previous = [-1, -1];
        }
      }
      arr[i][j] = currentObject;
    }
  }
  let currentObject = arr[a.length - 1][b.length - 1];
  let result = "";
  while (currentObject.length !== 0) {
    if (currentObject.character !== null) {
      result = currentObject.character + result;
    }
    if (currentObject.previous[0] == -1) break;
    currentObject = arr[currentObject.previous[0]][currentObject.previous[1]];
  }
  return result;
}

export function diffCharacters(oldString: string, newString: string): IDiffCharacter[] {
  const commonSubsequence = longestCommonSubsequence(oldString, newString);
  const result: IDiffCharacter[] = [];
  let oldStringPointer = 0;
  let newStringPointer = 0;
  let commonSubsequencePointer = 0;
  while (
    oldStringPointer < oldString.length ||
    newStringPointer < newString.length ||
    commonSubsequencePointer < commonSubsequence.length
  ) {
    if (
      oldStringPointer < oldString.length &&
      oldString[oldStringPointer] !==
        commonSubsequence[commonSubsequencePointer]
    ) {
      result.push({
        character: oldString[oldStringPointer],
        wasAdded: false,
        wasRemoved: true,
      });
      oldStringPointer++;
    } else if (
      newStringPointer < newString.length &&
      newString[newStringPointer] !==
        commonSubsequence[commonSubsequencePointer]
    ) {
      result.push({
        character: newString[newStringPointer],
        wasAdded: true,
        wasRemoved: false,
      });
      newStringPointer++;
    } else if (
      oldStringPointer < oldString.length &&
      newStringPointer < newString.length &&
      oldString[oldStringPointer] ===
        commonSubsequence[commonSubsequencePointer] &&
      newString[newStringPointer] ===
        commonSubsequence[commonSubsequencePointer]
    ) {
      result.push({
        character: commonSubsequence[commonSubsequencePointer],
        wasAdded: false,
        wasRemoved: false,
      });
      oldStringPointer++;
      newStringPointer++;
      commonSubsequencePointer++;
    }
  }
  return result;
}


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