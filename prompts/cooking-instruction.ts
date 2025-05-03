export function getCookingInstuction(dish_name: string, ingredients: string[]) {
  return `
          Generate a step-by-step cooking guide for making ${dish_name} using only the specified ingredients.  
          Each step should include an estimated time in minutes.  
  
          ### Ingredients (Only Use These):
          ${ingredients.map((ing) => `- ${ing}`).join("\n")}  
  
          ### Output Format:
          Return a valid JSON object with the following structure:
          {
            "instructions": [
              {
                "step": "Step title here...", <-- without time minutes
                "description": "Step description here...",
                "time": 2 <-- in single numbers without range (e.g. 2, not 2-3)
              }
            ]
          }
  
          - Ensure the JSON is properly formatted.
          - Do **not** add extra ingredients or modify the cooking process.
          - Use a natural cooking sequence from preparation to serving.  
        `;
}
