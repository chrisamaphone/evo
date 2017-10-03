var source = ["abcbabc", "bcaaa", "cabaab", "cccbacbabab", "aba", "cbccc"]
var bound = 10 // the number of generations to evolve by default

// UI stuff
window.onload = function() {

  // Set up evolve button
  var generateButton = document.getElementById("evolveButton");
  generateButton.addEventListener("click", function () {
  // source = document.getElementById('init').value;
  var evolved = evolve(source, bound); 
  document.getElementById("evolved").innerHTML = "<pre>"+evolved.toString()+"</pre>";
});

  // Set up step button
  var stepButton = document.getElementById("stepButton");
  stepButton.addEventListener("click", function() {
    step(source);
    document.getElementById("evolved").innerHTML += "<pre>"+source.toString()+"</pre>";
  });

  // Show the initial population
  document.getElementById('init').innerHTML = source.toString();
// document.getElementById('fileinput').addEventListener('change', readFileAndDisplay, false);
}

// Util

function howPalindromic(word) {
  var palindrominess = 0;
  for(var i=0; i < word.length/2; i++) {
    if(word[i] == word[word.length-i-1])
      palindrominess++;
  }
  var letters_checked = Math.ceil(word.length/2);
  // console.log(word +" has "+palindrominess+" out of "+letters_checked+" letters matching")
  return palindrominess/letters_checked;
}

// random int from 0 to max-1
function randInt(max) {
  return Math.floor(Math.random()*max);
}

function getRandom(arr) {
  return arr[randInt(arr.length)]; 
}

// Genetic algorithm functions
function evaluate(individual) {
  if (howPalindromic(individual) == 1)
      return individual.length;
  else
      return 0
  // Prefer long, palindromic strings
  // return howPalindromic(individual) * (individual.length/2); 
}

var alphabet = ["a", "b", "c"]
var mutate_prob = 0.4
var lambda = Math.floor(source.length/2)
var threshold = 4

function mutate(individual) {
  var components = individual.split("");
  // for each character in the word, change it to a random instance of the
  // alphabet with probability mutate_prob
  for(var i = 0; i < components.length; i++) {
    if(Math.random() <= mutate_prob) {
      var newchar = getRandom(alphabet);
      components[i] = newchar; 
    }
  }
  var mutant = components.join("");
  // sometimes also add a character
  if(Math.random() <= mutate_prob) {
    mutant += getRandom(alphabet)
  }
  return mutant;
}

// Returns an array of the same size as individuals that is each
// individual mutated
function reproduce(individuals) {
  var mutated = [];
  for(var i = 0; i < individuals.length; i++) {
    mutated.push(mutate(individuals[i]));
  }
  return mutated;
}

function compareScores(c1, c2) {
  return (c1.score - c2.score);
}

function dropScores(scores) {
  var candidates = [];
  for(var i = 0; i < scores.length; i++) {
    candidates.push(scores[i].candidate);
  }
  return candidates;
}

function step(candidates) {
  var scores = [];
  var solution = undefined;
  for(var i = 0; i < candidates.length; i++) {
    var score = evaluate(candidates[i]);
    if (score >= threshold) {
      solution = candidates[i];
      var victoryString = "An awesome string was found! It's: " + solution;
      console.log(victoryString); 
      document.getElementById("evolved").innerHTML += "<pre>"+victoryString+"</pre>";
    }
    scores.push({candidate: candidates[i], score: evaluate(candidates[i])});
  }
  var sorted = scores.sort(compareScores);
  console.log("Scored: " + JSON.stringify(sorted));

  // drop lowest lambda elements
  candidates = sorted.slice(lambda);
  console.log("Kept: " + JSON.stringify(candidates));

  // remove the score info
  candidates = dropScores(candidates);
  
  // create new mutated elements
  var offspring = reproduce(candidates);
  console.log("New offspring:" + offspring.toString());

  // Add offspring to the gene pool
  candidates = candidates.concat(offspring);

  // Update the source for the next iteration
  source = candidates;

  return solution;
}

function evolve(source, bound) {
  if(bound > 0) {
    var answer = step(source);
    if(answer) {
      var victoryString = "An awesome string was found! It's: " + answer;
      document.getElementById("evolved").innerHTML += "<pre>"+victoryString+"</pre>";
    }
    else {
      // XXX why isn't the below line working?
      document.getElementById("evolved").innerHTML += "<pre>"+source.toString()+"</pre>";
      console.log("iteration bound is now "+bound);
      evolve(source, bound-1);
    }
  } else {
    console.log("Bound reached; use Step to continue");
  }
  return source;
}






