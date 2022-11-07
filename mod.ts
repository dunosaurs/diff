/**
 * Object representing a single character in a difference between strings
 */
export type DiffCharacter = {
  character: string;
  wasAdded: boolean;
  wasRemoved: boolean;
};

/**
 * Return the longest common subsequence of two strings
 * @example
 * longestCommonSubsequence("ABCBDAB", "BDCABA") // "BCBA"
 * longestCommonSubsequence("abCd", "AbCD", true) // "AbCD"
 */
export function longestCommonSubsequence(
  a: string,
  b: string,
  ignoreCase = false,
): string {
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
      if (
        a[i] === b[j] ||
        (ignoreCase && a[i].toLowerCase() === b[j].toLowerCase())
      ) {
        if (
          i > 0 &&
          j > 0 &&
          arr[i - 1][j - 1].length + 1 > currentObject.length
        ) {
          currentObject.length = arr[i - 1][j - 1].length + 1;
          currentObject.previous = [i - 1, j - 1];
          currentObject.character = b[j];
        } else if (i == 0 || j == 0) {
          currentObject.character = b[j];
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

/**
 * Returns an array representing how the strings are different
 */
export function diffCharacters(
  oldString: string,
  newString: string,
  ignoreCase = false,
): DiffCharacter[] {
  const commonSubsequence = longestCommonSubsequence(
    oldString,
    newString,
    ignoreCase,
  );
  const result: DiffCharacter[] = [];
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
      (!ignoreCase && oldString[oldStringPointer] !==
            commonSubsequence[commonSubsequencePointer] ||
        (ignoreCase &&
          oldString[oldStringPointer].toLowerCase() !==
            commonSubsequence[commonSubsequencePointer].toLowerCase()))
    ) {
      result.push({
        character: oldString[oldStringPointer],
        wasAdded: false,
        wasRemoved: true,
      });
      oldStringPointer++;
    } else if (
      newStringPointer < newString.length &&
      (!ignoreCase && newString[newStringPointer] !==
            commonSubsequence[commonSubsequencePointer] ||
        (ignoreCase &&
          newString[newStringPointer].toLowerCase() !==
            commonSubsequence[commonSubsequencePointer].toLowerCase()))
    ) {
      result.push({
        character: newString[newStringPointer],
        wasAdded: true,
        wasRemoved: false,
      });
      newStringPointer++;
    } else {
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
