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

// random int from 0 to max-1
function randInt(max) {
  return Math.floor(Math.random()*max);
}

function getRandom(arr) {
  return arr[randInt(arr.length)]; 
}


//**** Evolutionary Algorithms ****//

// Starting population
var source = ["abcbabc", "bcaaa", "cabaab", "cccbacbabab", "aba", "cbccc"]
var bound = 10 // the number of generations to evolve by default

var alphabet = ["a", "b", "c"]
var mutate_prob = 0.4
var lambda = Math.floor(source.length/2)
var threshold = 4

// Input: an individual (string)
// Output: a number representing individual's fitness
//
// This function should take into account:
// (a) the "palindrominess" of a string
// (b) its length
function evaluate(individual) {
} 

// Input: an individual (string)
// Output: an individual (string) with some characters modified at random 
//
// Hint: For a string s, s.split("") will give you an array of its
// characters, and for an array a of strings, a.join("") will turn them
// back into a single string
//
// Hint: Math.random() returns a pseudorandom decimal num btwn 0 and 1
function mutate(individual) {
}

// Input: an array of individuals
// Output: an array of individuals of the same size as input where each
// individual is mutated
//
// Useful JS thing: [] is a new empty array; an array a has a method
// a.push(value) which adds a new value to the end
function reproduce(individuals) { 
}

// A datatype for representing individuals with eval scores:
// {candidate: individual, score: int}
// 
// The below two functions operate on this data

// Input: 2 scored individuals (objects w/score field), c1 and c2
// Output: the difference between c1 and c2's scores
function compareScores(c1, c2) {
  return (c1.score - c2.score);
}

// dropScores takes an array of candidate,score pairs and drops the score
//  component.
// Input: an array of scored individuals (objects w/fields score and
//  individual)
// Output: an array of individuals matching the "candidate" fields of input array
function dropScores(scores) {
  var candidates = [];
  for(var i = 0; i < scores.length; i++) {
    candidates.push(scores[i].candidate);
  }
  return candidates;
}

// Input: array of candidates
// Output: a solution if there is one above the threshold, undefined if not
// Side effect: update global variable "source" to newly evolved set of
//  candidates
function step(candidates) {
  // compute scores
  // drop lowest lambda elements
  // create new mutated elements (offspring)
  // add offspring to the gene pool
  // update the source for the next iteration
  // return solution
}

// Input: a source population (string array) and a bound (number)
// Output: evolved population for bound iterations
// Side effects: update source; print new populations at each step
//
// Useful JavaScript things:
//  For an array a, a.sort(compFn) will sort according to a comparison
//  function compFn, which takes two arguments from the array and returns a
//  number representing whether the 1st is > the 2nd. 
//  See the function defined above for an example.
//
// console.log(someString) displays it to the JS console
function evolve(source, bound) {
  if(bound > 0) {
    var answer = step(source);
    if(answer) {
      var victoryString = "An awesome string was found! It's: " + answer;
      document.getElementById("evolved").innerHTML += "<pre>"+victoryString+"</pre>";
    }
    else {
      // XXX the below line doesn't seem to be working
      document.getElementById("evolved").innerHTML += "<pre>"+source.toString()+"</pre>";
      console.log("iteration bound is now "+bound);
      evolve(source, bound-1);
    }
  } else {
    console.log("Bound reached; use Step to continue");
  }
  return source;
}






