type Command = string | { type: "image"; content: Blob };

export function getPromptAi() {
  
  return {
    prompt: async (command: Command | Command[]) => {
      if (Array.isArray(command)) {
        //do batching
        return `testing batching`;
      }

      return `testing`;
    },
  };
}
