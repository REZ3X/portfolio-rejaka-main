import { UserAlias } from "@/context/UserContext";

export interface CommandResult {
  success: boolean;
  message: string;
  action?: {
    type: "openModal" | "changeUser" | "clearTerminal";
    payload?: any;
  };
}

export const processCommand = (
  command: string,
  currentUser: UserAlias
): CommandResult => {
  const fullCommand = command.trim().toLowerCase();
  const [cmd, ...args] = fullCommand.split(" ");

  switch (cmd) {
    case "help":
      return {
        success: true,
        message: `Available commands:
  - help: Show this help message
  - clear: Clear terminal
  - ls: List available files
  - node <filename>: Execute a file (opens corresponding modal)
  - login <username>: Change user (rez3x or abim only)
  - whoami: Display current username
  - exit: Minimize terminal`,
      };

    case "clear":
      return {
        success: true,
        message: "",
        action: {
          type: "clearTerminal",
        },
      };

    case "ls":
      return {
        success: true,
        message: `about.js
programmer.js
academic.js
creative.js
projects.js
experience.js
contact.js`,
      };

    case "whoami":
      return {
        success: true,
        message: currentUser,
      };

    case "login":
      if (args.length === 0) {
        return {
          success: false,
          message: "Error: Missing username. Usage: login <username>",
        };
      }

      const username = args[0];

      if (username === "rez3x" || username === "abim") {
        return {
          success: true,
          message: `Logging in as ${username}...`,
          action: {
            type: "changeUser",
            payload: username as UserAlias,
          },
        };
      } else if (username === "xiannyaa") {
        return {
          success: false,
          message: "Access denied: xiannyaa profile requires GUI mode.",
        };
      } else {
        return {
          success: false,
          message: `Error: User '${username}' not found.`,
        };
      }

    case "node":
      if (args.length === 0) {
        return {
          success: false,
          message: "Error: Missing filename. Usage: node <filename>",
        };
      }

      const filename = args[0];
      const validFiles = {
        "about.js": "about",
        "programmer.js": "programmer",
        "academic.js": "academic",
        "creative.js": "creative",
        "projects.js": "projects",
        "experience.js": "experience",
        "contact.js": "contact",
      };

      if (validFiles[filename]) {
        return {
          success: true,
          message: `Executing ${filename}...`,
          action: {
            type: "openModal",
            payload: validFiles[filename],
          },
        };
      } else {
        return {
          success: false,
          message: `Error: Cannot find module '${filename}'`,
        };
      }

    default:
      return {
        success: false,
        message: `Command not found: ${cmd}. Type "help" for available commands.`,
      };
  }
};
