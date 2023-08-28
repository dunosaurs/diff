import { assertEquals } from "std/testing/asserts.ts";
import { diffCharacters, longestCommonSubsequence } from "./mod.ts";

Deno.test("Longest Common Subsequence", () => {
  assertEquals(longestCommonSubsequence("abc", "abc"), "abc");
  assertEquals(longestCommonSubsequence("abgd", "adh"), "ad");
  assertEquals(longestCommonSubsequence("xabcd", "xabcf"), "xabc");
  assertEquals(longestCommonSubsequence("ABCBDAB", "BDCABA"), "BCBA");
  assertEquals(
    longestCommonSubsequence(
      "BACDCABAAAADDACADDBBDAABDCDBBBCCDACCCDBDD",
      "BDACCACCDCCBADACDDACABBDAAABCDBBAADBCCCCB",
    ),
    "BACDCBAADDACABBDAABCDBBBCCCCB",
  );
  assertEquals(
    longestCommonSubsequence(
      "abCd",
      "AbCD",
      true,
    ),
    "AbCD",
  );
});

Deno.test("DiffCharacters", () => {
  const result = [
    { character: "b", wasAdded: false, wasRemoved: false },
    { character: "o", wasAdded: false, wasRemoved: false },
    { character: "o", wasAdded: false, wasRemoved: false },
    { character: "p", wasAdded: false, wasRemoved: false },
    { character: "a", wasAdded: false, wasRemoved: true },
    { character: " ", wasAdded: true, wasRemoved: false },
    { character: "b", wasAdded: true, wasRemoved: false },
    { character: "e", wasAdded: true, wasRemoved: false },
    { character: "e", wasAdded: true, wasRemoved: false },
    { character: "p", wasAdded: true, wasRemoved: false },
    { character: " ", wasAdded: true, wasRemoved: false },
    { character: "b", wasAdded: true, wasRemoved: false },
    { character: "o", wasAdded: true, wasRemoved: false },
    { character: "p", wasAdded: true, wasRemoved: false },
    { character: "p", wasAdded: true, wasRemoved: false },
    { character: "y", wasAdded: true, wasRemoved: false },
  ];
  assertEquals(diffCharacters("boopa", "boop beep boppy"), result);
});

Deno.test("DiffCharacters given empty string", () => {
  const result = [
    { character: "?", wasAdded: true, wasRemoved: false },
  ];
  assertEquals(diffCharacters("", "?"), result);
});
