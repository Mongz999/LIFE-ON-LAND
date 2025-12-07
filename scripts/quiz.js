// Quiz Questions Database
const quizData = {
  beginner: [
    {
      question: "What does SDG 15 stand for?",
      answers: ["Save Deserts Globally", "Sustainable Development Goal 15: Life on Land", "Species Defense Group 15", "Soil Development Goal 15"],
      correct: 1
    },
    {
      question: "Approximately how many species face extinction?",
      answers: ["100,000", "500,000", "1 million", "10 million"],
      correct: 2
    },
    {
      question: "What percentage of global land is covered by forests?",
      answers: ["15%", "31%", "50%", "70%"],
      correct: 1
    },
    {
      question: "Which of these is NOT a target of SDG 15?",
      answers: ["Protect forests", "Combat desertification", "Increase plastic production", "Halt biodiversity loss"],
      correct: 2
    },
    {
      question: "How many hectares of forest are lost annually?",
      answers: ["1 million", "5 million", "10 million", "50 million"],
      correct: 2
    },
    {
      question: "What is the primary cause of biodiversity loss?",
      answers: ["Climate change only", "Habitat loss", "Hunting only", "Disease only"],
      correct: 1
    },
    {
      question: "Which ecosystem stores the most carbon?",
      answers: ["Grasslands", "Forests", "Deserts", "Urban areas"],
      correct: 1
    },
    {
      question: "How many people depend on forests for livelihoods?",
      answers: ["500 million", "1 billion", "1.6 billion", "2.5 billion"],
      correct: 2
    },
    {
      question: "What is desertification?",
      answers: ["Natural desert formation", "Land degradation in dry areas", "Desert conservation", "Sand mining"],
      correct: 1
    },
    {
      question: "Which is an example of a protected area?",
      answers: ["Shopping mall", "National Park", "City center", "Highway"],
      correct: 1
    }
  ],
  intermediate: [
    {
      question: "What percentage of forests have been lost since pre-industrial times?",
      answers: ["25%", "40%", "50%", "70%"],
      correct: 2
    },
    {
      question: "Which continent has the largest tropical rainforest?",
      answers: ["Africa", "South America", "Asia", "Australia"],
      correct: 1
    },
    {
      question: "What is the primary driver of deforestation in the Amazon?",
      answers: ["Climate change", "Cattle ranching and agriculture", "Tourism", "Infrastructure"],
      correct: 1
    },
    {
      question: "How many bird species are estimated to exist globally?",
      answers: ["5,000", "10,000", "15,000", "20,000"],
      correct: 2
    },
    {
      question: "What is CITES?",
      answers: ["A conservation charity", "Convention on International Trade in Endangered Species", "A forest protection agency", "A wildlife documentary series"],
      correct: 1
    },
    {
      question: "Which forest type is most biodiverse?",
      answers: ["Boreal forests", "Temperate forests", "Tropical rainforests", "Deciduous forests"],
      correct: 2
    },
    {
      question: "What percentage of species live in rainforests despite covering only 6% of land?",
      answers: ["30%", "50%", "70%", "90%"],
      correct: 2
    },
    {
      question: "Which organization runs the Red List of Threatened Species?",
      answers: ["WWF", "IUCN", "UN Environment Programme", "The Nature Conservancy"],
      correct: 1
    },
    {
      question: "What is a keystone species?",
      answers: ["The largest species in an ecosystem", "A species critical to ecosystem function", "A species found only in one location", "An invasive species"],
      correct: 1
    },
    {
      question: "How much of Earth's oxygen is produced by forests?",
      answers: ["10%", "28%", "50%", "75%"],
      correct: 1
    },
    {
      question: "What is habitat fragmentation?",
      answers: ["Breaking down large habitats into smaller isolated pieces", "Natural seasonal changes", "Species migration patterns", "Climate zone shifting"],
      correct: 0
    },
    {
      question: "Which SDG 15 target focuses on preventing extinction?",
      answers: ["Target 5", "Target 6", "Target 7", "Target 8"],
      correct: 1
    },
    {
      question: "What percentage of amphibians are threatened with extinction?",
      answers: ["20%", "31%", "50%", "75%"],
      correct: 1
    },
    {
      question: "What is the Bonn Challenge?",
      answers: ["A sports competition", "A forest restoration initiative", "A climate summit", "A biodiversity research program"],
      correct: 1
    },
    {
      question: "How many countries have national biodiversity strategies?",
      answers: ["50", "100", "150+", "200+"],
      correct: 3
    }
  ],
  advanced: [
    {
      question: "What is the carrying capacity of an ecosystem?",
      answers: ["The maximum population size it can support", "The rate of biodiversity loss", "The carbon sequestration rate", "The water cycle efficiency"],
      correct: 0
    },
    {
      question: "Which biome has the lowest biodiversity?",
      answers: ["Tropical rainforest", "Coral reef", "Arctic tundra", "Temperate grassland"],
      correct: 2
    },
    {
      question: "What is ecological succession?",
      answers: ["The extinction of species", "The gradual change in species composition", "The migration of animals", "Seasonal climate changes"],
      correct: 1
    },
    {
      question: "Which protein is essential for most enzyme functions in living organisms?",
      answers: ["Carbohydrates", "Lipids", "Proteins and amino acids", "Nucleic acids"],
      correct: 2
    },
    {
      question: "What is the primary function of mycorrhizal fungi?",
      answers: ["Decomposition of dead matter", "Nutrient exchange with plant roots", "Pollination", "Pest control"],
      correct: 1
    },
    {
      question: "How much CO2 do forests absorb annually?",
      answers: ["1 billion tons", "2.4 billion tons", "5 billion tons", "10 billion tons"],
      correct: 1
    },
    {
      question: "What is the trophic level efficiency?",
      answers: ["10%", "25%", "50%", "75%"],
      correct: 0
    },
    {
      question: "Which of these is a secondary metabolite in plants?",
      answers: ["Glucose", "Cellulose", "Alkaloids", "ATP"],
      correct: 2
    },
    {
      question: "What is the definition of endemism?",
      answers: ["Global species distribution", "Species found only in specific geographic areas", "Recently evolved species", "Extinct species"],
      correct: 1
    },
    {
      question: "How many protected areas exist globally?",
      answers: ["50,000+", "100,000+", "200,000+", "500,000+"],
      correct: 1
    },
    {
      question: "What is the primary mechanism of climate regulation by forests?",
      answers: ["Oxygen production", "Evapotranspiration and carbon sequestration", "Soil formation", "Water filtration"],
      correct: 1
    },
    {
      question: "Which species loss has the most significant impact on food security?",
      answers: ["Pollinators", "Predators", "Decomposers", "Herbivores"],
      correct: 0
    },
    {
      question: "What is the Anthropocene?",
      answers: ["The age of dinosaurs", "The current geological epoch defined by human impact", "A conservation strategy", "An ancient forest region"],
      correct: 1
    },
    {
      question: "What percentage of marine species are found in coral reefs?",
      answers: ["10%", "25%", "50%", "75%"],
      correct: 2
    },
    {
      question: "How does the Nagoya Protocol relate to SDG 15?",
      answers: ["It reduces forest fires", "It regulates access to genetic resources and benefit sharing", "It bans pesticides", "It increases agricultural output"],
      correct: 1
    },
    {
      question: "What is the main cause of species extinction in the 21st century?",
      answers: ["Asteroid impacts", "Habitat destruction", "Natural disease", "Volcanic activity"],
      correct: 1
    },
    {
      question: "Which ecosystem has the highest productivity?",
      answers: ["Desert", "Tropical rainforest", "Tundra", "Savanna"],
      correct: 1
    },
    {
      question: "What is the role of apex predators in ecosystems?",
      answers: ["Primary producers", "Population control and ecosystem balance", "Decomposition", "Pollination"],
      correct: 1
    },
    {
      question: "How many Indigenous languages are disappearing annually?",
      answers: ["10", "25", "50", "One every two weeks"],
      correct: 3
    },
    {
      question: "What is the concept of planetary boundaries?",
      answers: ["Limits on human economic growth", "Critical thresholds for Earth systems", "International trade restrictions", "Conservation funding limits"],
      correct: 1
    }
  ],
  speed: [
    {
      question: "SDG 15 focuses on?",
      answers: ["Oceans", "Land & Forests", "Energy", "Industry"],
      correct: 1
    },
    {
      question: "Forest loss annually (hectares)?",
      answers: ["1M", "5M", "10M", "20M"],
      correct: 2
    },
    {
      question: "Species facing extinction?",
      answers: ["100K", "500K", "1M", "5M"],
      correct: 2
    },
    {
      question: "Forests cover what % of land?",
      answers: ["15%", "31%", "50%", "70%"],
      correct: 1
    },
    {
      question: "People depending on forests?",
      answers: ["500M", "1B", "1.6B", "2B"],
      correct: 2
    },
    {
      question: "Primary cause of biodiversity loss?",
      answers: ["Climate", "Habitat loss", "Hunting", "Disease"],
      correct: 1
    },
    {
      question: "Most biodiverse ecosystem?",
      answers: ["Savanna", "Desert", "Rainforest", "Tundra"],
      correct: 2
    },
    {
      question: "IUCN means?",
      answers: ["International Union for Conservation of Nature", "International Urban Community Network", "International Union for Carbon Neutrality", "International Union for Crop Nutrition"],
      correct: 0
    },
    {
      question: "What % of species in rainforests?",
      answers: ["30%", "50%", "70%", "90%"],
      correct: 2
    },
    {
      question: "Tropical rainforests are mainly in?",
      answers: ["Africa", "South America", "Asia", "Australia"],
      correct: 1
    },
    {
      question: "Protected areas globally?",
      answers: ["50K", "100K+", "200K+", "500K+"],
      correct: 2
    },
    {
      question: "Desertification affects how many people?",
      answers: ["500M", "1B", "1.5B", "2B"],
      correct: 2
    },
    {
      question: "What is habitat fragmentation?",
      answers: ["Species diversity", "Breaking large habitats into pieces", "Forest regeneration", "Climate change"],
      correct: 1
    },
    {
      question: "Oxygen from forests (%)?",
      answers: ["10%", "28%", "50%", "75%"],
      correct: 1
    },
    {
      question: "Main forest type by area?",
      answers: ["Tropical", "Boreal", "Temperate", "Mangrove"],
      correct: 1
    },
    {
      question: "Endangered primates (%)?",
      answers: ["25%", "50%", "75%", "90%"],
      correct: 2
    },
    {
      question: "Carbon forests absorb annually?",
      answers: ["1B tons", "2.4B tons", "5B tons", "10B tons"],
      correct: 1
    },
    {
      question: "Land degradation affects (%)?",
      answers: ["10%", "25%", "33%", "50%"],
      correct: 2
    },
    {
      question: "Invasive species impact?",
      answers: ["Minor", "Major threat to biodiversity", "Beneficial", "Neutral"],
      correct: 1
    },
    {
      question: "SDG 15 has how many targets?",
      answers: ["5", "8", "12", "15"],
      correct: 2
    }
  ]
};

// Leaderboard Management
const LEADERBOARD_KEY = 'lifeonland_leaderboard';
const MAX_LEADERBOARD_ENTRIES = 50;

function saveScore(playerName, quizType, score, totalQuestions) {
  let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
  
  const accuracy = Math.round((score / totalQuestions) * 100);
  const entry = {
    playerName: playerName || 'Anonymous',
    quizType: quizType,
    score: score,
    totalQuestions: totalQuestions,
    accuracy: accuracy,
    timestamp: new Date().toISOString(),
    id: Date.now()
  };
  
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.accuracy - a.accuracy);
  leaderboard = leaderboard.slice(0, MAX_LEADERBOARD_ENTRIES);
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  return leaderboard;
}

function getLeaderboard() {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
}

function displayLeaderboard() {
  const leaderboard = getLeaderboard();
  const tbody = document.querySelector('.leaderboard-table tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (leaderboard.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #9ca3af;">No scores yet. Be the first to take a quiz!</td></tr>';
    return;
  }
  
  leaderboard.slice(0, 10).forEach((entry, index) => {
    const row = document.createElement('tr');
    row.className = 'leaderboard-row';
    
    let medal = '';
    if (index === 0) medal = '🥇';
    else if (index === 1) medal = '🥈';
    else if (index === 2) medal = '🥉';
    
    const displayName = entry.playerName.substring(0, 15);
    const date = new Date(entry.timestamp).toLocaleDateString();
    
    row.innerHTML = `
      <td class="rank">${medal ? medal + ' ' : ''}${index + 1}</td>
      <td class="name">${displayName}</td>
      <td class="score">${entry.accuracy}%</td>
      <td class="completed">${entry.quizType}</td>
      <td class="accuracy">${entry.score}/${entry.totalQuestions}</td>
    `;
    tbody.appendChild(row);
  });
}

let currentQuiz = null;
let currentQuestion = 0;
let answers = [];
let score = 0;
let timerInterval = null;
let timeLeft = 0;

function startQuiz(quizType) {
  currentQuiz = quizType;
  currentQuestion = 0;
  answers = new Array(quizData[quizType].length).fill(null);
  score = 0;

  document.querySelector('.quiz-selection').style.display = 'none';
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('results-container').classList.add('hidden');

  updateQuiz();
  startTimer();
}

function updateQuiz() {
  const quiz = quizData[currentQuiz];
  const question = quiz[currentQuestion];

  // Update progress
  const progress = ((currentQuestion + 1) / quiz.length) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  document.getElementById('current-question').textContent = currentQuestion + 1;
  document.getElementById('total-questions').textContent = quiz.length;

  // Update question
  document.getElementById('question-text').textContent = question.question;

  // Update answers
  const grid = document.getElementById('answers-grid');
  grid.innerHTML = '';
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = answer;
    if (answers[currentQuestion] === index) {
      button.classList.add('selected');
    }
    button.onclick = () => selectAnswer(index);
    grid.appendChild(button);
  });

  // Update navigation
  document.getElementById('prev-btn').disabled = currentQuestion === 0;
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  updateQuiz();
}

function nextQuestion() {
  if (currentQuestion < quizData[currentQuiz].length - 1) {
    currentQuestion++;
    updateQuiz();
  } else {
    endQuiz();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateQuiz();
  }
}

function startTimer() {
  const duration = { beginner: 300, intermediate: 600, advanced: 900, speed: 180 };
  timeLeft = duration[currentQuiz] || 300;

  timerInterval = setInterval(() => {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  calculateScore();
  displayResults();
}

function calculateScore() {
  const quiz = quizData[currentQuiz];
  score = 0;
  answers.forEach((answer, index) => {
    if (answer === quiz[index].correct) {
      score++;
    }
  });
}

function displayResults() {
  const quiz = quizData[currentQuiz];
  const percentage = Math.round((score / quiz.length) * 100);
  const incorrect = answers.filter((a, i) => a !== null && a !== quiz[i].correct).length;
  const skipped = answers.filter(a => a === null).length;

  document.getElementById('final-score').textContent = score;
  document.getElementById('max-score').textContent = quiz.length;
  document.getElementById('score-percentage').textContent = percentage + '%';
  document.getElementById('correct-count').textContent = score;
  document.getElementById('incorrect-count').textContent = incorrect;
  document.getElementById('skipped-count').textContent = skipped;

  // Feedback message
  let message = '';
  if (percentage >= 90) {
    message = '🌟 Outstanding! You\'re an SDG 15 expert!';
  } else if (percentage >= 75) {
    message = '🎉 Great job! You know SDG 15 well!';
  } else if (percentage >= 60) {
    message = '👍 Good effort! Keep learning about conservation.';
  } else {
    message = '📚 Keep exploring! There\'s more to learn about protecting life on land.';
  }
  document.getElementById('feedback-message').textContent = message;

  // Save score to leaderboard
  const playerName = prompt('Enter your name for the leaderboard:', 'Player');
  if (playerName) {
    saveScore(playerName, currentQuiz, score, quiz.length);
    displayLeaderboard();
  }

  // Display review
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  quiz.forEach((q, i) => {
    const item = document.createElement('div');
    const isCorrect = answers[i] === q.correct;
    item.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
    item.innerHTML = `
      <div class="review-question">${i + 1}. ${q.question}</div>
      <div class="review-answer">Your answer: ${answers[i] !== null ? q.answers[answers[i]] : 'Skipped'}</div>
      ${!isCorrect ? `<div class="review-answer">Correct answer: ${q.answers[q.correct]}</div>` : ''}
    `;
    reviewList.appendChild(item);
  });

  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('results-container').classList.remove('hidden');
}

function retakeQuiz() {
  startQuiz(currentQuiz);
}

function backToSelection() {
  document.querySelector('.quiz-selection').style.display = 'block';
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('results-container').classList.add('hidden');
}

function exitQuiz() {
  if (confirm('Are you sure? Your progress will be lost.')) {
    clearInterval(timerInterval);
    backToSelection();
  }
}

function startActivity(activity) {
  alert('Activity: ' + activity + ' coming soon!');
}