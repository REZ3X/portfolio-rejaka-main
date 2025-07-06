const getBannedWordsFromEnv = (): string[] => {
  const bannedWords: string[] = [];

  const categories = [
    process.env.NEXT_PUBLIC_BANNED_WORDS_ENGLISH,
    process.env.NEXT_PUBLIC_BANNED_WORDS_INDONESIAN,
    process.env.NEXT_PUBLIC_BANNED_WORDS_VARIATIONS,
    process.env.NEXT_PUBLIC_BANNED_WORDS_SPACES,
    process.env.NEXT_PUBLIC_BANNED_WORDS_MISSPELLINGS,
    process.env.NEXT_PUBLIC_BANNED_WORDS_SEXUAL,
    process.env.NEXT_PUBLIC_BANNED_WORDS_VIOLENCE,
    process.env.NEXT_PUBLIC_BANNED_WORDS_DRUGS,
    process.env.NEXT_PUBLIC_BANNED_WORDS_INSULTS,
  ];

  categories.forEach((category) => {
    if (category) {
      const words = category
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word.length > 0);
      bannedWords.push(...words);
    }
  });

  return bannedWords;
};

const FALLBACK_BANNED_WORDS = [
  "fuck",
  "shit",
  "damn",
  "bitch",
  "ass",
  "hell",
  "anjing",
  "bangsat",
  "babi",
  "kontol",
  "memek",
  "tolol",
  "porn",
  "sex",
  "nude",
  "kill",
  "die",
  "hate",
];

const BANNED_WORDS =
  getBannedWordsFromEnv().length > 0
    ? getBannedWordsFromEnv()
    : FALLBACK_BANNED_WORDS;

export const censorWord = (word: string): string => {
  if (word.length <= 1) return "*";
  if (word.length <= 2) return "*".repeat(word.length);
  if (word.length <= 3) return word[0] + "*" + word[word.length - 1];
  return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
};

export const filterMessage = (
  message: string
): {
  filteredMessage: string;
  hasBannedWords: boolean;
  bannedWords: string[];
} => {
  let filteredMessage = message;
  const bannedWordsFound: string[] = [];
  let hasBannedWords = false;

  BANNED_WORDS.forEach((bannedWord) => {
    const escapedWord = bannedWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regexStrict = new RegExp(`\\b${escapedWord}\\b`, "gi");
    const regexLoose = new RegExp(escapedWord, "gi");

    if (regexStrict.test(message) || regexLoose.test(message)) {
      hasBannedWords = true;
      if (!bannedWordsFound.includes(bannedWord)) {
        bannedWordsFound.push(bannedWord);
      }
      filteredMessage = filteredMessage.replace(
        regexStrict,
        censorWord(bannedWord)
      );
      filteredMessage = filteredMessage.replace(
        regexLoose,
        censorWord(bannedWord)
      );
    }
  });

  return {
    filteredMessage,
    hasBannedWords,
    bannedWords: bannedWordsFound,
  };
};

export const containsBannedWords = (message: string): boolean => {
  return BANNED_WORDS.some((bannedWord) => {
    const escapedWord = bannedWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regexStrict = new RegExp(`\\b${escapedWord}\\b`, "gi");
    const regexLoose = new RegExp(escapedWord, "gi");
    return regexStrict.test(message) || regexLoose.test(message);
  });
};

export const getBannedWordsCount = (): number => {
  return BANNED_WORDS.length;
};

export const isEnvConfigured = (): boolean => {
  return getBannedWordsFromEnv().length > 0;
};

export const getLoadedWords = (): string[] => {
  return BANNED_WORDS;
};
