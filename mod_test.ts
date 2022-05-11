import { assertEquals } from "./test_deps.ts";
import { longestCommonSubsequence } from "./mod.ts";

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
});
