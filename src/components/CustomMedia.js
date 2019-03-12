import React, { Component } from 'react';

let myTimeout;

class CustomMedia extends Component {
    constructor() {
        super();

        this.state = {
            isPlaying: true,
            isControlsShowing: true,
            isMouseOver: false
        }
        this.handleShowControls = this.handleShowControls.bind(this);
        this.getFileExtension = this.getFileExtension.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        let playPauseClass = this.state.isPlaying ? " playing" : " paused";
        let displayClass = this.props.isHidden ? " hidden" : "";
        let playPauseIcon = this.state.isPlaying ?
            "https://www.iconsdb.com/icons/preview/white/pause-xxl.png" :
            "https://www.iconsdb.com/icons/preview/white/play-xxl.png";
        // if (this.refs.video != null) {
        //     this.refs.video.volume = this.props.isHidden ? 0 : 0.5;
        // }
        // let controlsDisplayClass = this.state.isControlsShowing ? " controls-show" : " controls-hidden";

        return (
            <div className={"video-container" + displayClass}>
                <video ref="video" autoPlay="true" loop>
                    <source type={"video/" + this.getFileExtension()} src={this.props.source} />
                </video>

                <div className={"video-controls-bar"} ref="controls" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <button className="controls-show-button" onClick={this.handleShowControls} onMouseEnter={this.handleShowControls}>
                        <img className="arrow-img arrow-img-top button-hide" ref="controlsButton" src="https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png" />
                    </button>

                    <div className="video-info">
                        <h2>{this.props.title}</h2>
                        <p>{this.props.description}</p>
                    </div>
                    <button className={"play-pause-button" + playPauseClass} onClick={this.handlePlayPause}>
                        <img className="play-pause-icon" src={playPauseIcon} />
                    </button>


                </div>
            </div>
        );
    }
    handleMouseEnter() {
        this.setState({ isMouseOver: true });
        clearTimeout(myTimeout);
    }
    handleMouseLeave() {
        this.setState({ isMouseOver: false });
        myTimeout = setTimeout(() => {
            this.handleShowControls();
        }, 3000);
    }
    getFileExtension() {
        let sourceArr = this.props.source.split(".");
        let extension = sourceArr[sourceArr.length - 1];
        if (extension === "webm") return extension;
        else return "mp4";
    }
    showVideo() {
        this.refs.video.play();
        this.refs.video.volume = 0.5;
        this.setState({ isPlaying: true });

        this.refs.controls.className = "video-controls-bar";
        this.refs.controlsButton.className = "arrow-img arrow-img-top button-hide";
        myTimeout = setTimeout(() => {
            this.handleShowControls();
        }, 3000);

    }
    hideVideo() {
        //this.refs.video.pause();
        this.refs.video.volume = 0;
    }

    componentDidMount() {
        //mute video at start
        this.refs.video.volume = 0;
    }
    componentDidUpdate(oldProps) {
        const newProps = this.props
        //if the video is being shown by clicking on button in parent
        if (oldProps.isHidden !== newProps.isHidden) {
            if (newProps.isHidden == false) {
                this.showVideo();
            }
            if (newProps.isHidden == true) {
                this.hideVideo();
            }
        }
    }
    handleShowControls() {
        // if (this.state.isControlsShowing == true) this.setState({ isControlsShowing: false });
        // else this.setState({ isControlsShowing: true });

        if (this.refs.controlsButton.classList.contains("button-hide") && !this.state.isMouseOver) {
            this.refs.controlsButton.classList.remove("button-hide");
        } else if (!this.state.isMouseOver) {
            this.refs.controlsButton.className += " button-hide";
        }

        if (this.refs.controls.classList.contains("controls-hidden")) {
            this.refs.controls.classList.remove("controls-hidden");
            this.refs.controls.className += " controls-show";

            clearTimeout(myTimeout);
            myTimeout = setTimeout(() => {
                this.handleShowControls();
            }, 3000);
        } else if (!this.state.isMouseOver) {
            this.refs.controls.classList.remove("controls-show");
            this.refs.controls.className += " controls-hidden";
        }
    }

    handlePlayPause() {
        if (this.state.isPlaying) {
            this.refs.video.pause();
            this.setState({ isPlaying: false });
        } else {
            this.refs.video.play();
            this.setState({ isPlaying: true });
        }
    }
}

export default CustomMedia;