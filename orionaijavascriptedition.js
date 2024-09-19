const chatbotToggler = document.querySelector('.chatbot-toggler');
const chatbot = document.querySelector('.chatbot');
const chatbox = document.getElementById('chatbox');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');

// Function to toggle the chatbot UI
chatbotToggler.addEventListener('click', () => {
    document.body.classList.toggle('show-chatbot');
});

// Close button functionality
document.querySelector('.close-btn').addEventListener('click', () => {
    document.body.classList.remove('show-chatbot');
});

// Function to add a message to the chatbox
function addMessage(content, sender = 'user') {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat');
    chatMessage.classList.add(sender === 'user' ? 'outgoing' : 'incoming');

    const messageContent = `
        <span> <img src="orionai.png" class="incominggg"></span>
        <p>${content}</p>
    `;

    chatMessage.innerHTML = messageContent;
    chatbox.appendChild(chatMessage);

    // Scroll to the latest message
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Simple AI Bot logic (Predefined responses)
// AI Bot logic focusing on keywords and generating detailed responses
function getAIResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // List of offensive or abusive words
    const offensiveKeywords = ['nigga', 'bitch', 'asshole', 'idiot', 'stupid', 'dumb', 'fuck', 'motherfucker', 'fucking bitch'];

    const keywords = [
    // Greeting
    {
        keyword: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! It’s great to see you here. How can I assist you today? Whether you need help or just have a question, feel free to ask!'
    },
    // Asking About the AI
    {
        keyword: ['how are you', 'how do you do'],
        response: 'Thank you for asking! I’m just a chatbot, so I don’t have feelings, but I’m here to help you with anything you need. How about you? How are you doing today?'
    },
    {
        keyword: ['what can you do', 'your abilities', 'your functions', 'what services'],
        response: 'I am capable of assisting you with a wide range of tasks! I can answer questions, help with information lookup, provide recommendations, guide you through different services, and much more. Just tell me what you need!'
    },
    {
        keyword: ['tell me about yourself', 'who are you', 'what are you'],
        response: 'I’m a virtual assistant powered by AI, designed to make your life easier by providing useful information, answering questions, and helping with various tasks. My goal is to offer support whenever you need it!'
    },
    {
        keyword: ['what is your name'],
        response: 'Iam Orion Ai made by VertexVolts.'
    },
    // Help and Support
    {
        keyword: ['help', 'support', 'assist', 'assistance'],
        response: 'I am here to offer help in any way I can. If you’re facing a challenge, need support with a task, or have questions, just let me know. What do you need assistance with right now?'
    },
    {
        keyword: ['tutorial', 'guide', 'how to'],
        response: 'Looking for a tutorial or guide? I can help with step-by-step instructions on various topics. Just let me know what you need a tutorial on!'
    },
    {
        keyword: ['contact support', 'report an issue', 'technical support'],
        response: 'If you’re having technical issues or need support, please provide more details about the problem, and I’ll do my best to assist you or direct you to the appropriate support channel.'
    },
    // Information
    {
        keyword: ['weather', 'forecast', 'outside', 'temperature'],
        response: 'I can help you find the current weather or forecast for your location. Just let me know where you are or where you’re heading, and I’ll give you the latest weather update!'
    },
    {
        keyword: ['news', 'headlines', 'latest news', 'current events'],
        response: 'If you’re looking for the latest news or headlines, I can help you stay updated with real-time information. Would you like to hear about world news, sports, technology, or something else?'
    },
    {
        keyword: ['sports', 'score', 'game', 'team'],
        response: 'Interested in sports updates? Let me know which sport or team you follow, and I can provide the latest scores, news, or upcoming games!'
    },
    {
        keyword: ['events', 'happenings', 'what’s on'],
        response: 'Looking for upcoming events or things to do? I can provide information on local events, concerts, and activities happening near you or in a specific location.'
    },
    // Appreciation and Farewell
    {
        keyword: ['thank you', 'thanks', 'appreciate'],
        response: 'You’re very welcome! I’m glad I could assist you. If you need anything else, feel free to ask.'
    },
    {
        keyword: ['goodbye', 'bye', 'see you later', 'talk to you later'],
        response: 'Goodbye! It was a pleasure assisting you today. Feel free to reach out anytime you need help. Have a great day ahead!'
    },
    // Fun and Entertainment
    {
        keyword: ['joke', 'funny', 'make me laugh'],
        response: 'Sure! Here’s a joke for you: Why don’t skeletons fight each other? Because they don’t have the guts! I hope that made you smile. If you want to hear another one, just ask!'
    },
    {
        keyword: ['quote', 'inspirational', 'motivation'],
        response: 'Here’s an inspirational quote for you: "The only way to do great work is to love what you do." – Steve Jobs. I hope that gives you a boost! If you’d like another quote, just let me know.'
    },
    {
        keyword: ['trivia', 'fun fact', 'did you know'],
        response: 'Here’s a fun fact: Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!'
    },
    // Learning and Knowledge
    {
        keyword: ['coding', 'programming', 'software development'],
        response: 'Coding is the process of writing instructions that a computer can understand to perform specific tasks. It involves using programming languages such as Python, JavaScript, or C++ to create software, websites, and even AI! Coding teaches problem-solving, logical thinking, and creativity. It’s the foundation of modern technology!'
    },
    {
        keyword: ['history', 'historical events', 'ancient civilizations'],
        response: 'History is the study of past events and civilizations, helping us understand how societies have evolved over time. By analyzing historical events, we learn about the successes and failures of our ancestors, allowing us to make informed decisions about the future. History provides context for modern cultures, politics, and technological advancements.'
    },
    {
        keyword: ['technology', 'innovations', 'tech news'],
        response: 'Technology is constantly evolving and reshaping our world. From smartphones to artificial intelligence, advancements in tech are improving the way we live, communicate, and work. With innovations like 5G, blockchain, and the Internet of Things (IoT), technology continues to connect the global community in unprecedented ways.'
    },
    {
        keyword: ['science', 'research', 'discoveries'],
        response: 'Science drives our understanding of the natural world through research and experimentation. From groundbreaking discoveries in physics to advances in medical research, science helps us solve complex problems and improve our quality of life. Is there a particular scientific topic you’re curious about?'
    },
    {
        keyword: ['health', 'wellness', 'fitness'],
        response: 'Maintaining good health involves a balanced diet, regular exercise, adequate sleep, and stress management. Advances in healthcare technology are revolutionizing the medical field, making it easier to diagnose, treat, and prevent diseases. Public health initiatives, such as vaccinations, and global cooperation are key to fighting pandemics and improving the quality of life for people worldwide.'
    },
    {
        keyword: ['space', 'astronomy', 'exploration'],
        response: 'Space exploration has always fascinated humanity, pushing the boundaries of what is possible and unlocking mysteries of the universe. From landing on the moon to exploring Mars, space agencies like NASA and private companies like SpaceX are leading efforts to explore beyond our planet.'
    },
    {
        keyword: ['education', 'learning', 'school'],
        response: 'Education is the foundation of personal and societal growth. It empowers individuals with the knowledge and skills they need to contribute meaningfully to the world. Education takes various forms, from traditional classroom settings to online learning and vocational training. Lifelong learning is increasingly important in today’s dynamic and evolving world.'
    },
    // General Knowledge
{
    keyword: ['geography', 'countries', 'capitals'],
    response: 'Geography is the study of the Earth’s landscapes, environments, and the relationships between people and their environments. It covers a variety of topics including countries, capitals, and physical features. If you need information about a specific country or capital, just ask!'
},
{
    keyword: ['art', 'famous artists', 'art movements'],
    response: 'Art is a diverse range of human activities that involve the creation of visual, auditory, or performance artifacts that express the creator’s imagination, conceptual ideas, or technical skill. Famous artists include Leonardo da Vinci, Vincent van Gogh, and Frida Kahlo. Art movements such as Impressionism, Cubism, and Surrealism have significantly influenced the course of art history. If you have any specific questions about art, feel free to ask!'
},
{
    keyword: ['literature', 'famous books', 'authors'],
    response: 'Literature encompasses written works, especially those considered to have artistic or intellectual value. Famous books include "To Kill a Mockingbird" by Harper Lee, "1984" by George Orwell, and "Pride and Prejudice" by Jane Austen. Renowned authors include William Shakespeare, J.K. Rowling, and Mark Twain. If you’re interested in a particular genre or author, let me know!'
},
{
    keyword: ['economics', 'markets', 'economic theories'],
    response: 'Economics is the social science that studies the production, distribution, and consumption of goods and services. It includes various theories and concepts like supply and demand, market equilibrium, and economic growth. If you’re curious about economic theories or current market trends, just ask!'
},
{
    keyword: ['philosophy', 'philosophers', 'philosophical concepts'],
    response: 'Philosophy involves the study of fundamental questions about existence, knowledge, values, reason, and mind. Prominent philosophers include Socrates, Plato, and Immanuel Kant. Philosophical concepts such as ethics, logic, and metaphysics explore different aspects of human thought and understanding. If you’re interested in a particular philosopher or concept, I’d be happy to provide more information!'
},
{
    keyword: ['psychology', 'mental health', 'behavior'],
    response: 'Psychology is the scientific study of the mind and behavior. It includes topics such as mental health, cognitive processes, and emotional regulation. Understanding psychology can help us better comprehend how individuals think, feel, and act. If you have questions about mental health or psychological theories, feel free to ask!'
},
{
    keyword: ['environmental science', 'climate change', 'sustainability'],
    response: 'Environmental science examines the interactions between physical, chemical, and biological components of the environment. It focuses on issues like climate change, sustainability, and conservation efforts. Understanding environmental science is crucial for addressing global challenges related to the health of our planet. If you want to learn more about a specific environmental issue, just let me know!'
},
{
    keyword: ['politics', 'governments', 'political systems'],
    response: 'Politics is the process by which groups of people make decisions. It involves various forms of government, such as democracies, monarchies, and autocracies. Political systems determine how power is distributed and exercised within a society. If you’re curious about a particular government or political system, I can provide more details!'
},
{
    keyword: ['economics', 'markets', 'economic theories'],
    response: 'Economics is the study of how societies use resources to produce goods and services and distribute them among people. It involves understanding market structures, economic policies, and theories like capitalism and socialism. If you have specific questions about economics or markets, feel free to ask!'
},
{
    keyword: ['inventions', 'inventors', 'technology advancements'],
    response: 'Inventions have shaped human history and progress. Notable inventions include the wheel, the telephone, and the internet. Inventors like Alexander Graham Bell, Nikola Tesla, and Steve Jobs have made significant contributions to technology and society. If you’re interested in learning about specific inventions or inventors, just let me know!'
},
// Diverse General Knowledge
{
    keyword: ['mythology', 'myths', 'legends'],
    response: 'Mythology refers to the collection of myths and legends belonging to a particular cultural or religious tradition. These stories often explain natural phenomena, historical events, or cultural practices. Examples include Greek mythology with gods like Zeus and Athena, or Norse mythology with figures like Odin and Thor. If you’re interested in a specific myth or legend, let me know!'
},
{
    keyword: ['cuisine', 'world food', 'recipes'],
    response: 'Cuisine refers to the style of cooking associated with a particular region or culture. World cuisines include Italian, Chinese, Mexican, and many more, each with its unique flavors and dishes. If you’re looking for recipes or want to learn more about a particular cuisine, just ask!'
},
{
    keyword: ['architecture', 'famous buildings', 'architects'],
    response: 'Architecture involves the design and construction of buildings and other physical structures. Famous buildings include the Eiffel Tower, the Great Wall of China, and the Sydney Opera House. Renowned architects such as Frank Lloyd Wright and Zaha Hadid have significantly influenced the field. If you have a specific building or architect in mind, feel free to ask!'
},
{
    keyword: ['music', 'genres', 'artists'],
    response: 'Music is an art form that involves organized sound and rhythm. It spans a wide range of genres, from classical and jazz to rock and hip-hop. Influential artists include Beethoven, Bob Dylan, and Beyoncé. If you want to explore different music genres or learn about specific artists, let me know!'
},
{
    keyword: ['language', 'linguistics', 'language learning'],
    response: 'Language is a system of communication used by a particular community or country. Linguistics is the scientific study of language and its structure. Learning new languages can open doors to understanding different cultures and people. If you’re curious about a specific language or want tips on language learning, just ask!'
},
{
    keyword: ['economics', 'market trends', 'financial literacy'],
    response: 'Economics explores how societies manage resources and wealth. Market trends and financial literacy are crucial for making informed decisions about investments, savings, and spending. Understanding concepts like inflation, stock markets, and personal finance can be very beneficial. If you have specific questions about economics or financial topics, feel free to ask!'
},
{
    keyword: ['ecology', 'ecosystems', 'biodiversity'],
    response: 'Ecology is the study of interactions between organisms and their environment. It involves understanding ecosystems, which are communities of living organisms interacting with each other and their surroundings. Biodiversity refers to the variety of life forms within an ecosystem. If you want to know more about a specific ecosystem or environmental issue, just let me know!'
},
{
    keyword: ['philanthropy', 'charity', 'volunteering'],
    response: 'Philanthropy involves donating time, money, or resources to help others and support causes. Charitable organizations work to address social issues, while volunteering offers hands-on support to those in need. If you’re interested in finding ways to contribute or learn about impactful charities, feel free to ask!'
},
{
    keyword: ['sociology', 'societies', 'social issues'],
    response: 'Sociology studies the development, structure, and functioning of human society. It examines social relationships, institutions, and issues such as inequality and cultural change. Understanding sociology can provide insights into how societies operate and evolve. If you have specific questions about social issues or sociological concepts, just let me know!'
},
{
    keyword: ['environmental activism', 'conservation', 'sustainability'],
    response: 'Environmental activism focuses on advocating for and implementing practices that protect and preserve the environment. Conservation efforts aim to protect natural resources and wildlife, while sustainability seeks to balance human needs with environmental health. If you’re interested in learning more about these topics or how to get involved, feel free to ask!'
}



];



    // Check for offensive language
    for (const offensiveWord of offensiveKeywords) {
        if (lowerCaseMessage.includes(offensiveWord)) {
            return 'I kindly ask you to refrain from using offensive or inappropriate language. Let’s keep the conversation respectful and positive!';
        }
    }

    // Normalize and handle typos
    const normalizedMessage = normalizeText(lowerCaseMessage);

    // Match keywords
    const matchedResponse = findBestMatch(normalizedMessage, keywords);
    if (matchedResponse) {
        return matchedResponse;
    }

    // Custom logic for generating more thoughtful responses on certain topics
    if (normalizedMessage.includes('coding') || normalizedMessage.includes('programming')) {
        return 'Coding is the process of writing instructions that a computer can understand to perform specific tasks. It involves using programming languages such as Python, JavaScript, or C++ to create software, websites, and even AI! Coding teaches problem-solving, logical thinking, and creativity. It’s the foundation of modern technology!';
    }

    if (normalizedMessage.includes('write a paragraph on')) {
        const topic = lowerCaseMessage.slice(lowerCaseMessage.indexOf('on') + 3).trim();
        return `Here's a paragraph on ${topic}: \n ${generateParagraph(topic)}`;
    }

    // Default response if no keyword matches
    return 'I appreciate your message! However, I’m not entirely sure how to respond to that. Could you provide more details or ask something else? I’m here to help!';
}

// Normalize text by removing punctuation and converting to lowercase
function normalizeText(text) {
    return text.replace(/[^\w\s]/g, '').toLowerCase();
}

// Find the best matching response based on normalized message
function findBestMatch(message, keywordPairs) {
    for (const pair of keywordPairs) {
        for (const keyword of pair.keyword) {
            if (message.includes(keyword)) {
                return pair.response;
            }
        }
    }
    return null;
}

// Simple paragraph generation logic based on topic
function generateParagraph(topic) {
    const responses = {
        coding: 'Coding is the art of translating human logic into a form that machines can execute. It involves problem-solving, debugging, and creative thinking. By mastering different programming languages like Python or JavaScript, coders can build anything from websites to AI applications. Learning to code is not just about creating software but also about developing logical thinking, attention to detail, and the ability to break down complex tasks into manageable steps.',
        
        technology: 'Technology is constantly evolving and reshaping our world. From smartphones to artificial intelligence, advancements in tech are improving the way we live, communicate, and work. With innovations like 5G, blockchain, and the Internet of Things (IoT), technology continues to connect the global community in unprecedented ways. As innovation continues, the future holds endless possibilities for growth and improvement, touching every aspect of our lives, from healthcare to education, transportation, and entertainment.',
        
        ai: 'Artificial Intelligence (AI) is a branch of computer science focused on creating intelligent machines capable of performing tasks that typically require human intelligence. AI is transforming industries by automating processes, enhancing decision-making, and providing personalized experiences. From self-driving cars to virtual assistants, AI has become integral to our daily lives. The field of AI includes machine learning, where systems can learn from data, and deep learning, a more advanced method that mimics the neural networks of the human brain.',
        
        environment: 'The environment is the natural world that surrounds us, consisting of ecosystems, climate, and natural resources like water, air, and soil. Environmental conservation is critical for sustaining life on Earth, as the degradation of ecosystems leads to biodiversity loss and climate change. Efforts to protect the environment include reducing pollution, promoting renewable energy, and supporting sustainability initiatives. Addressing environmental challenges is crucial to ensuring a healthy and sustainable planet for future generations.',
        
        space: 'Space exploration has always fascinated humanity, pushing the boundaries of what is possible and unlocking mysteries of the universe. From landing on the moon to exploring Mars, space agencies like NASA and private companies like SpaceX are leading efforts to explore beyond our planet. The study of space provides insights into the origins of the universe, the potential for life on other planets, and the future of human colonization in space. With advancements in space technology, the possibility of commercial space travel is becoming a reality.',
        
        education: 'Education is the foundation of personal and societal growth. It empowers individuals with the knowledge and skills they need to contribute meaningfully to the world. Education takes various forms, from traditional classroom settings to online learning and vocational training. With the rapid advancement of technology, education is becoming more accessible and tailored to individual learning styles, breaking barriers and creating new opportunities for students across the globe. Lifelong learning is increasingly important in today’s dynamic and evolving world.',
        
        health: 'Health is a state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity. Maintaining good health involves a balanced diet, regular exercise, adequate sleep, and stress management. Advances in healthcare technology are revolutionizing the medical field, making it easier to diagnose, treat, and prevent diseases. Public health initiatives, such as vaccinations, and global cooperation are key to fighting pandemics and improving the quality of life for people worldwide.',
        
        sports: 'Sports are a vital part of human culture, promoting physical health, teamwork, and discipline. From soccer to basketball, sports bring people together, fostering a sense of community and belonging. Athletes train for years to reach peak performance, and fans across the globe follow their favorite teams and players with passion. Beyond physical fitness, sports teach life skills such as perseverance, leadership, and strategic thinking. In recent years, esports has emerged as a competitive and rapidly growing form of digital gaming, attracting millions of players and viewers worldwide.',
        
        history: 'History is the study of past events and civilizations, helping us understand how societies have evolved over time. By analyzing historical events, we learn about the successes and failures of our ancestors, allowing us to make informed decisions about the future. History provides context for modern cultures, politics, and technological advancements. It also teaches valuable lessons about human behavior, conflict resolution, and progress. Studying history helps us recognize patterns and avoid repeating the mistakes of the past.',
        
        music: 'Music is a universal language that transcends cultures, connecting people through rhythm, melody, and harmony. It has been an integral part of human expression for centuries, evolving through different genres such as classical, jazz, rock, hip-hop, and electronic music. Music has the power to evoke emotions, tell stories, and inspire movements. With the advent of digital platforms, music has become more accessible, allowing artists from all over the world to share their creations and reach global audiences instantly.'
    };

    return responses[topic.toLowerCase()] || 'I’m unable to generate a paragraph on that topic. Please ask about something else!';
}


// Function to handle sending a message
function handleSendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;  // Don't send empty messages

    // Add user's message to the chatbox
    addMessage(userMessage, 'user');

    // Clear the textarea
    userInput.value = '';

    // Simulate AI response after a short delay
    setTimeout(() => {
        const aiResponse = getAIResponse(userMessage);
        addMessage(aiResponse, 'ai');
    }, 500);  // Delay of 500ms for a more realistic feel
}

// Event listener for the send button
sendBtn.addEventListener('click', handleSendMessage);

// Event listener for pressing "Enter" in the textarea
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent newline in the textarea
        handleSendMessage();
    }
});