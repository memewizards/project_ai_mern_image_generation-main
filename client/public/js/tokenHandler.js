document.addEventListener("DOMContentLoaded", () => {
  const useTokensBtn = document.getElementById("use-tokens-btn");
  const addTokensButton = document.getElementById('add-tokens-btn');
const userEmail = document.body.dataset.userEmail;
  useTokensBtn.addEventListener("click", async () => {
    
    console.log("User email:", userEmail); // Debug line to check the userEmail value

    const tokensToUse = 10; // replace with the actual amount of tokens to be used

    try {
      const response = await fetch("/subtract-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          tokensToSubtract: tokensToUse,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(`Successfully subtracted ${tokensToUse} tokens.`);
      } else {
        console.log("Not enough tokens available.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  addTokensButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/add-tokens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            tokensToAdd: 25,
        }),
    });
      const data = await response.json();
      if (data.success) {
      console.log('Tokens added successfully!');
      console.log(`New token count: ${data.tokenCount}`);
      }
    } catch (error) {
      console.error('Error adding tokens:', error);
    }
  });
});