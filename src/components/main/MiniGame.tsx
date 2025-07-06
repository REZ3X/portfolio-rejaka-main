"use client";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";

interface DifficultyLevel {
  name: string;
  commands: string[];
  timeLimit: number;
  color: string;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    name: "Beginner",
    timeLimit: 8000,
    color: "#00ff00",
    commands: [
      "npm install",
      "git commit",
      "console.log",
      "npm start",
      "git push",
      "cd ..",
      "ls -la",
      "mkdir app",
    ],
  },
  {
    name: "Intermediate",
    timeLimit: 6000,
    color: "#ffff00",
    commands: [
      "git checkout -b feature/new-branch",
      "docker run -p 3000:3000 app",
      "find . -name '*.js' -delete",
      "grep -r 'TODO' src/",
      "sed -i 's/old/new/g' file.txt",
      "awk '{print $1}' file.txt",
      "curl -X POST -H 'Content-Type: application/json'",
      "ssh user@server.com -p 2222",
    ],
  },
  {
    name: "Advanced",
    timeLimit: 4500,
    color: "#ff8800",
    commands: [
      "kubectl apply -f deployment.yaml",
      "terraform apply -var='env=prod'",
      "ansible-playbook -i inventory site.yml",
      "docker-compose up -d --scale web=3",
      "git rebase -i HEAD~3",
      "openssl req -x509 -newkey rsa:4096",
      "ffmpeg -i input.mp4 -vcodec h264",
      "rsync -avz --progress src/ dest/",
    ],
  },
  {
    name: "Expert",
    timeLimit: 3500,
    color: "#ff4400",
    commands: [
      "systemctl --user enable --now podman.socket",
      "iptables -A INPUT -p tcp --dport 80 -j ACCEPT",
      "tcpdump -i eth0 -w capture.pcap host 192.168.1.1",
      "strace -e trace=file -o output.txt ./program",
      "perf record -g ./binary && perf report",
      "gdb --batch --ex run --ex bt --args ./app",
      "valgrind --tool=memcheck --leak-check=full ./app",
      "nmap -sS -O -p 1-65535 target.com",
    ],
  },
  {
    name: "Insane",
    timeLimit: 2500,
    color: "#ff0000",
    commands: [
      'awk \'BEGIN{FS=","} {sum+=$3} END{print "Total:",sum}\' data.csv',
      "sed -n '/pattern1/,/pattern2/p' file | grep -v '^#' | sort -u",
      "find /proc -name 'stat' -exec awk '{print $1,$2,$14}' {} + 2>/dev/null",
      "ps aux | awk '$3>10{print $2,$11}' | xargs -I {} kill -9 {}",
      "netstat -tulpn | grep :80 | awk '{print $7}' | cut -d'/' -f1",
      "lsof +D /var/log | awk 'NR>1{print $2}' | sort -u | xargs kill",
      "ss -tuln | awk '/LISTEN.*:22/{gsub(/.*:/,\"\",$5); print $5}'",
      "journalctl -u nginx --since '1 hour ago' | grep ERROR | wc -l",
    ],
  },
];

const MiniGame: React.FC = () => {
  const { themeStyle } = useUser();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [targetCommand, setTargetCommand] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [totalScore, setTotalScore] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBestScore = localStorage.getItem("terminalHellBestScore");
      if (savedBestScore) {
        setBestScore(parseInt(savedBestScore));
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key === "c" || e.key === "v" || e.key === "a" || e.key === "x")
      ) {
        e.preventDefault();
        setGameHistory((prev) => [
          ...prev,
          "🚫 No cheating! Type it yourself!",
        ]);
      }
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  const updateBestScore = (newScore: number) => {
    if (newScore > bestScore) {
      setBestScore(newScore);
      if (typeof window !== "undefined") {
        localStorage.setItem("terminalHellBestScore", newScore.toString());
      }
      return true;
    }
    return false;
  };

  const getCurrentDifficulty = () =>
    difficultyLevels[Math.min(level, difficultyLevels.length - 1)];

  const startTimer = () => {
    const difficulty = getCurrentDifficulty();
    setTimeLeft(difficulty.timeLimit);
    setIsTimeUp(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          setIsTimeUp(true);
          handleTimeUp();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  };

  const loseLife = (reason: string) => {
    const newLives = lives - 1;
    setLives(newLives);
    setStreak(0);
    setCombo(0);

    setGameHistory((prev) => [...prev, `💔 ${reason}`]);

    if (newLives <= 0) {
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);
      setGameHistory((prev) => [...prev, `💀 GAME OVER! All lives lost!`]);

      const isNewBest = updateBestScore(totalScore);
      if (isNewBest) {
        setGameHistory((prev) => [
          ...prev,
          `🏆 NEW BEST SCORE: ${totalScore}!`,
        ]);
      }
    } else {
      setGameHistory((prev) => [...prev, `❤️ Lives remaining: ${newLives}`]);
      setTimeout(() => {
        generateNewCommand();
      }, 1500);
    }
  };

  const handleTimeUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    loseLife(`Time's up! Expected: "${targetCommand}"`);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTotalScore(0);
    setLevel(0);
    setStreak(0);
    setCombo(0);
    setLives(3);
    setGameHistory([
      "💀 Welcome to Terminal Hell!",
      "You have 3 lives. Type fast or die!",
      "🚫 Copy/paste disabled!",
    ]);
    generateNewCommand();
  };

  const generateNewCommand = () => {
    const difficulty = getCurrentDifficulty();
    const randomCmd =
      difficulty.commands[
        Math.floor(Math.random() * difficulty.commands.length)
      ];
    setTargetCommand(randomCmd);
    setCurrentCommand("");
    startTimer();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearInterval(timerRef.current);

    if (currentCommand.trim() === targetCommand) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      const newCombo = combo + 1;

      const speedBonus = Math.floor(timeLeft / 200);
      const comboBonus = newCombo > 5 ? Math.floor(newCombo / 3) : 0;
      const levelBonus = level * 2;
      const totalBonusPoints = speedBonus + comboBonus + levelBonus;

      const newTotalScore = totalScore + 1 + totalBonusPoints;

      setScore(newScore);
      setTotalScore(newTotalScore);
      setStreak(newStreak);
      setCombo(newCombo);

      if (newScore % 5 === 0 && level < difficultyLevels.length - 1) {
        setLevel(level + 1);
        setGameHistory((prev) => [
          ...prev,
          `🆙 LEVEL UP! Welcome to ${difficultyLevels[level + 1].name}!`,
        ]);
      }

      const bonusText =
        totalBonusPoints > 0 ? ` (+${totalBonusPoints} bonus)` : "";
      const comboText = newCombo > 3 ? ` | ${newCombo}x COMBO!` : "";

      setGameHistory((prev) => [
        ...prev,
        `✅ Correct! +${1 + totalBonusPoints} points${bonusText}${comboText}`,
      ]);

      generateNewCommand();
    } else {
      loseLife(`Wrong answer! Expected: "${targetCommand}"`);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const difficulty = getCurrentDifficulty();
  const progressPercent = (timeLeft / difficulty.timeLimit) * 100;

  const renderLives = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      if (i < lives) {
        hearts.push(
          <span key={i} className="text-red-500">
            ❤️
          </span>
        );
      } else {
        hearts.push(
          <span key={i} className="text-gray-500 opacity-30">
            💔
          </span>
        );
      }
    }
    return hearts;
  };

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] h-full flex flex-col">
        <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <span className="text-[#00adb4] font-bold text-sm">
              terminal_hell.exe
            </span>
          </div>
          <div className="text-[10px] text-[#8b9cbe]">Best: {bestScore}</div>
        </div>

        <div className="flex-1 p-3 flex flex-col">
          {!gameStarted ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-2xl mb-3">💀</div>
              <div className="text-[#ff4444] text-sm mb-2 font-bold">
                TERMINAL HELL
              </div>
              <div className="text-xs text-[#8b9cbe] mb-4 text-center leading-relaxed">
                Advanced terminal commands
                <br />
                3 lives • Time pressure increases
                <br />
                Copy/paste disabled • Pure typing skills
              </div>
              <button
                onClick={startGame}
                className="border border-[#ff4444] px-4 py-2 text-[#ff4444] hover:bg-[#ff4444] hover:text-[#060a10] transition-all"
              >
                ./enter_hell
              </button>
            </div>
          ) : gameOver ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-2xl mb-3">☠️</div>
              <div className="text-[#ff4444] text-sm mb-2">GAME OVER</div>
              <div className="text-xs text-[#8b9cbe] mb-4 text-center">
                Commands Typed: {score}
                <br />
                Total Points: {totalScore}
                <br />
                Level Reached: {difficulty.name}
                <br />
                {totalScore > bestScore
                  ? "NEW BEST SCORE!"
                  : `Best Score: ${bestScore}`}
              </div>
              <button
                onClick={resetGame}
                className="border border-[#00adb4] px-4 py-2 text-[#00adb4] hover:bg-[#00adb4] hover:text-[#060a10] transition-all"
              >
                ./restart
              </button>
            </div>
          ) : (
            <>
              <div className="mb-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8b9cbe]">
                    Score: {score} | Points: {totalScore}
                  </span>
                  <span style={{ color: difficulty.color }}>
                    {difficulty.name}
                  </span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-[#8b9cbe]">Streak: {streak}</span>
                  <div className="flex space-x-1">{renderLives()}</div>
                </div>
                {combo > 3 && (
                  <div className="text-[#ffff00] text-xs">COMBO x{combo}</div>
                )}
                <div className="w-full bg-[#393d46] h-1">
                  <div
                    className="h-full transition-all duration-100"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor:
                        progressPercent > 30 ? difficulty.color : "#ff4444",
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-[#00adb4] text-xs">Type this command:</div>
                <div
                  className="text-white text-sm font-bold break-all bg-[#0a1017] p-2 border border-[#393d46] select-none"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                  }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {targetCommand}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mb-2">
                <div className="flex">
                  <span className="text-[#00adb4] mr-2">$</span>
                  <input
                    ref={inputRef}
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onPaste={(e) => {
                      e.preventDefault();
                      setGameHistory((prev) => [
                        ...prev,
                        "🚫 Pasting disabled! Type it!",
                      ]);
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    className="flex-1 bg-transparent border-none outline-none text-white"
                    autoFocus
                    disabled={isTimeUp || gameOver}
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </form>

              <div className="flex-1 overflow-auto text-xs space-y-1">
                {gameHistory.slice(-4).map((line, i) => (
                  <div key={i} className="text-[#8b9cbe] leading-tight">
                    {line}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary border theme-border rounded-2xl h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b theme-border">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="theme-accent-primary text-xl font-bold">
              💀 Terminal Hell
            </h2>
            <p className="text-sm theme-text-secondary mt-1">
              3 lives • No copy/paste!
            </p>
          </div>
          <div className="text-xs theme-text-secondary">Best: {bestScore}</div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {!gameStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">💀</div>
            <h3 className="theme-accent-primary text-lg mb-2 font-bold">
              Terminal Hell
            </h3>
            <p className="text-sm theme-text-secondary mb-6 text-center leading-relaxed">
              Progressive difficulty from basic commands
              <br />
              to advanced bash wizardry.
              <br />
              <span className="text-[#e39fc2] font-medium">
                3 lives • Pure typing • No cheating!
              </span>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-[#e39fc2] text-[#2a1e29] rounded-xl hover:bg-[#c678a4] transition-colors font-medium"
            >
              Enter Hell
            </button>
          </div>
        ) : gameOver ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">☠️</div>
            <h3 className="theme-accent-primary text-lg mb-2">Game Over!</h3>
            <div className="text-center theme-text-secondary mb-6 space-y-1">
              <div>
                Commands Typed:{" "}
                <span className="theme-accent-primary font-bold">{score}</span>
              </div>
              <div>
                Total Points:{" "}
                <span className="theme-accent-primary font-bold">
                  {totalScore}
                </span>
              </div>
              <div>
                Level Reached:{" "}
                <span style={{ color: difficulty.color }}>
                  {difficulty.name}
                </span>
              </div>
              {totalScore > bestScore && (
                <div className="text-[#e39fc2] font-bold">NEW BEST SCORE!</div>
              )}
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-[#e39fc2] text-[#2a1e29] rounded-xl hover:bg-[#c678a4] transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm theme-text-secondary">
                  Score:{" "}
                  <span className="theme-accent-primary font-bold">
                    {score}
                  </span>{" "}
                  | Points:{" "}
                  <span className="theme-accent-primary">{totalScore}</span>
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: difficulty.color }}
                >
                  {difficulty.name}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm theme-text-secondary">
                  Streak: <span className="theme-accent-primary">{streak}</span>
                </div>
                <div className="flex space-x-1">{renderLives()}</div>
              </div>

              {combo > 3 && (
                <div className="text-center text-[#e39fc2] font-bold">
                  COMBO x{combo}!
                </div>
              )}

              <div className="w-full bg-[#382736] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-100 rounded-full"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor:
                      progressPercent > 30 ? difficulty.color : "#ff4444",
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-4 text-center">
              <div className="text-sm theme-text-secondary mb-2">
                Type this command:
              </div>
              <div
                className="theme-accent-primary text-lg font-mono break-all bg-[#382736] p-3 rounded-lg border-2 border-dashed border-[#e39fc2] select-none"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                }}
                onDragStart={(e) => e.preventDefault()}
              >
                {targetCommand}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
              <input
                ref={inputRef}
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  setGameHistory((prev) => [
                    ...prev,
                    "🚫 No pasting allowed! Type it yourself!",
                  ]);
                }}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                className="w-full px-4 py-3 rounded-lg border theme-border theme-bg-primary theme-text-primary focus:outline-none focus:border-[#e39fc2] font-mono"
                placeholder="Type here... (no copy/paste)"
                autoFocus
                disabled={isTimeUp || gameOver}
                autoComplete="off"
                spellCheck="false"
              />
            </form>

            <div className="flex-1 overflow-auto space-y-2">
              {gameHistory.slice(-3).map((line, i) => (
                <div
                  key={i}
                  className="text-sm theme-text-secondary p-2 bg-[#382736] rounded-lg"
                >
                  {line}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
