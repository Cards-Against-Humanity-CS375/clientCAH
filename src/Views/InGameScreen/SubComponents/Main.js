import React, { Component } from "react"
import ShowPrompt from "./ShowPrompt"
import CardDeck from "./CardDeck"
import Button from 'react-bootstrap/Button';
import JudgeDeck from "./JudgeDeck"
import Loading from "./Loading"
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        // This binding is necessary to make `this` work in the callback
        this.btnStartGame = this.btnStartGame.bind(this);
        this.provokeParentParentChangeIsCardChosenState = this.provokeParentParentChangeIsCardChosenState.bind(this)
        this.provokeParentParentRemoveChosenWhiteCard = this.provokeParentParentRemoveChosenWhiteCard.bind(this)
    }

    btnStartGame() {
        this.props.socket.emit('message', {
            type: 'GAME_START',
            content: "Hey Mr. Server! Please start the game!"
        })
    }

    provokeParentParentChangeIsCardChosenState() {
        this.props.provokeChangeIsCardChosenState()
    }

    provokeParentParentRemoveChosenWhiteCard(chosenCard) {
        this.props.provokeRemoveChosenWhiteCard(chosenCard)
    }

    render() { // TODO: Need to check 2 bool values : Is it the judge's turn, and is it time for the judge to pick yet. 2 states.
        // TODO: Make separate component <JudgeChooseDeck>
        if (this.props.gameOn) {
            return (
                <div className="d-flex flex-column align-items-center">
                    <ShowPrompt blackCard={this.props.blackCard} />
                    {this.props.isJudgePicking ? <JudgeDeck isJudge={this.props.isJudge} playedCards={this.props.playedCards} socket={this.props.socket} /> : null}
                    {this.props.isJudge ?
                        this.props.isJudgePicking ? <></> : <Loading message="You are the Judge! Wait for everyone to pick a card first..." /> :
                        <CardDeck provokeParentRemoveChosenWhiteCard={this.provokeParentParentRemoveChosenWhiteCard} provokeParentChangeIsCardChosenState={this.provokeParentParentChangeIsCardChosenState} is_card_chosen={this.props.is_card_chosen} isJudge={this.props.isJudge} isJudgePicking={this.props.isJudgePicking} cardChosen={this.props.cardChosen} whiteCards={this.props.whiteCards} socket={this.props.socket} />}
                    {/* {this.props.isJudge ? <Loading message="You are the Judge! Wait for everyone to pick a card first..." /> : <CardDeck whiteCards={this.props.whiteCards} socket={this.props.socket}/>} */}
                </div>
            )
        }
        else {
            if (this.props.isFirstPlayer) {
                return (
                    <div className="d-flex flex-column">
                        <Button variant="primary" onClick={this.btnStartGame}>Start Game</Button>
                    </div>
                )
            }
            else {
                return (
                    <Loading message="Waiting for host to start the game..." />
                )
            }
        }
    }
}

export default Main