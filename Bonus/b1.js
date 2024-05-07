function spellingWord(word) {
  let ans = "";
  const dictionary = ["pro", "gram", "merit", "program", "it", "programmer"],
    length = word.length,
    spell = (length, dictionary, word, ans) => {
      for (let i = 1; i <= length; i++) {
        let str = word.substring(0, i);
        if (dictionary.includes(str)) {
          if (i === length) {
            ans += str;
            console.log(ans);
          }
          spell(
            length - 1,
            dictionary,
            word.substring(i, length),
            ans + str + ","
          );
        }
      }
    },
    wordBreak = (dict, str) => {
      if (!str) {
        return true;
      }

      for (const word of dict) {
        if (str.startsWith(word)) {
          return wordBreak(dict, str.substring(word.length, str.length));
        }
      }

      return false;
    };
    if (wordBreak(dictionary, word)) {
      console.log("===================================");
      spell(length, dictionary, word, ans);
    } else {
      console.log("===================================");
      console.log("no way")
    }
}

spellingWord("program");
spellingWord("programit");
spellingWord("programmerit");
spellingWord("programlala");
spellingWord("proletarian");