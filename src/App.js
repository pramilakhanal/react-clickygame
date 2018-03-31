import React, { Component } from 'react';
import Title from "./Components/Title";
import Wrapper from "./Components/Wrapper";
import MatchCard from "./Components/MatchCard";
import characters from "./charactercards.json";
import './App.css';

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on any of them more than once!";


class App extends Component {

  // Setting the .state.matches to the matches json array
  state = {
    characters,
    correctGuesses,
    bestScore,
    clickMessage
  };

   setClicked = id => {

        // Make a copy of the state matches array to work with
        const characters = this.state.characters;

        // Filter for the clicked match
        const clickedMatch = characters.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Dang! You already clicked on that one! Now you have to start over!"

            for (let i = 0 ; i < characters.length ; i++){
                characters[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({characters});

        // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;
            
            clickMessage = "Great! You haven't click on that one yet! Keep going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            characters.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ characters });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            correctGuesses = 0;

            //  user to play again
            clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < characters.length ; i++){
                characters[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            characters.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ characters });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };


  render() {
    return (
          <Wrapper>
                <Title>Star Wars Clicky Game!</Title>
        
                <h3 className="scoreMessage">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>
                <div className="image-container">

                {this.state.characters.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />

                ))}
                </div>
            </Wrapper>
        );
     }
}

export default App;
