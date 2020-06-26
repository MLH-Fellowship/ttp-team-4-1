import React, { Component } from "react";

const imageP = {
    jukeoff: "/crappyjuke.png",
    jukeon: "/crappyjukeon.png",
}

class Music extends Component {
    state = {
        play: false,
        open: true,
    }

    audio = new Audio("/fontcolorsea.mp3")

    toggleImage = () => {
        this.setState(state => ({ open: !state.open}));
    }

    getImageName = () => this.state.open ? 'jukeoff' : 'jukeon';

    togglePlay = () => {
        this.setState({play: !this.state.play}, () => {
            this.audio.volume = 0.1;
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    toggleBoth = () =>{
        this.toggleImage();
        this.togglePlay();
    }

    render() {
        const imageName = this.getImageName();
        return (
            <div className="musicbox">
                <form>
                    <img src={imageP[imageName]} onClick={this.toggleBoth} alt='crappyjukebox' />
                </form>
            </div>
        );
    }
}
export default Music;