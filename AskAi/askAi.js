const apiKey = "AIzaSyCW2Mb8vVufaLQ4C_jehsuTkZdU2Emjf3o"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const send = document.getElementById('send');
const chatBox = document.querySelector('.chat-box');
const input = document.getElementById('inputValue');
const suggestions = document.querySelectorAll('.suggestions span');

function addMessage(text, sender, isLoading = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

    if (isLoading) {
        messageDiv.classList.add('loading');
        messageDiv.innerHTML = `<span class="dots">...</span>`;
    } else {
        messageDiv.innerHTML = text.replace(/\n/g, "<br>");
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv;
}

async function generateAns() {
    try {
        let ques = input.value.trim();
        if (!ques) {
            return;
        }

        addMessage(ques, 'user');
        input.value = ''; 

        const loaderMessage = addMessage('', 'bot', true);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: ques }]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        loaderMessage.remove();

        addMessage(aiResponse, 'bot');

    } catch (error) {
        console.error("Error fetching data:", error);
        addMessage("Error fetching AI response. Please try again.", 'bot');
    }
}

send.addEventListener('click', generateAns);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateAns();
    }
});

suggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
        input.value = suggestion.textContent;
    });
});