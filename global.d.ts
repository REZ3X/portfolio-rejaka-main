declare global {
  interface Window {
    openProjectModal?: (projectId: string) => void;
  }
}

export {};