import React, { Component } from 'react'
import CustomMedia from './CustomMedia';

const categoryNames = ["category1", "category2", "category3"];
const channelNames = ["channel 1", "channel 2", "channel 3", "channel 4", "channel 5", "channel 6"];
let myTimeout;

class VideosSidebar extends Component {
    constructor() {
        super();

        this.state = {
            videos: [
                {
                    isHidden: true,
                    source: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                    title: "Rabbit",
                    description: "A fat rabbit wakes up",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://www.rapconverter.com/SampleDownload/Sample1280.mp4",
                    title: "Cartoon",
                    description: "Unkown cartoon",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "https://doc-14-50-docs.googleusercontent.com/docs/securesc/gmnl39h2vj0t48kc6hiofu0duj85dloa/uqqsj648c8t3ro1delmrp7is8v4jgim5/1552413600000/09767907814616499229/18179570154804338991/10sIcsw7geojz9zvcNlu3p3r2dqg55y7g",
                    title: "Animated movie",
                    description: "Unkown animated movie",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4",
                    title: "Jellyfish",
                    description: "Jellyfish swimming in the ocean",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/lion-sample.m4v",
                    title: "Talking Lion",
                    description: "A lion ranting",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.mp4",
                    title: "Dolby Digital",
                    description: "Dolby digital 3D rendered video",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/Panasonic_HDC_TM_700_P_50i.m4v",
                    title: "Grassy Set",
                    description: "Doll on a grassy set in a studio",
                    category: "Animals/Nature"
                },
                {
                    isHidden: true,
                    source: "http://techslides.com/demos/sample-videos/small.mp4",
                    title: "Lego thing",
                    description: "A motorized lego helicopter",
                    category: "Science"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/video-sample.m4v",
                    title: "Android",
                    description: "Android countdown",
                    category: "Science"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/page18-movie-4.m4v",
                    title: "Jones Eye Center",
                    description: "Dr Jones' laser vision correction",
                    category: "Science"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/star_trails.webm",
                    title: "Star Trails",
                    description: "Some star trails",
                    category: "Science"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/metaxas-keller-Bell.mp4",
                    title: "Interview",
                    description: "Interview with some guy",
                    category: "People"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_768k.m4v",
                    title: "Program Foundation",
                    description: "Training description of something",
                    category: "People"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/TRA3106.mp4",
                    title: "Radio Taxi",
                    description: "Radio Taxi?",
                    category: "People"
                },
                {
                    isHidden: true,
                    source: "http://mirrors.standaloneinstaller.com/video-sample/P6090053.m4v",
                    title: "Guy with fake horse",
                    description: "People cheering man riding fake horse",
                    category: "People"
                }
            ],
            isSidebarShowing: true,
            isMouseOver: false
        }
        this.handleShowVideo = this.handleShowVideo.bind(this);
        this.handleShowSidebar = this.handleShowSidebar.bind(this);
        this.getSelectedClass = this.getSelectedClass.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        let sidebarDisplayClass = this.state.isSidebarShowing ? " sidebar-show" : " sidebar-hidden";
        let buttonDisplayClass = this.state.isSidebarShowing ? " button-hide" : "";
        return (
            <div >

                {this.renderVideoComponents()}
                <ul className={"videos-sidebar" + sidebarDisplayClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {this.renderVideoList()}

                </ul>
                <button className={"videos-sidebar-show-button" + sidebarDisplayClass} onClick={this.handleShowSidebar} onMouseEnter={this.handleShowSidebar}>
                    <img className={"arrow-img arrow-img-left" + buttonDisplayClass} src="https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png" />
                </button>
            </div>
        )
    }
    handleMouseEnter() {
        this.setState({ isMouseOver: true });
        clearTimeout(myTimeout);
    }
    handleMouseLeave() {
        this.setState({ isMouseOver: false });
        myTimeout = setTimeout(() => {
            this.handleShowSidebar();
        }, 3000);
    }

    renderVideoComponents() {
        let elements = [];

        for (let i in this.state.videos) {
            elements.push(
                <CustomMedia
                    isHidden={this.state.videos[i].isHidden}
                    source={this.state.videos[i].source}
                    title={this.state.videos[i].title}
                    description={this.state.videos[i].description}
                />
            );

        }
        return elements;
    }

    renderVideoList() {
        let elements = [];
        let count = 1;
        for (let i in this.state.videos) {
            if (this.state.videos[i].category === this.props.category) {

                elements.push(
                    <li className={"videos-sidebar-item" + this.getSelectedClass(i)} onClick={() => this.handleShowVideo(i)} >
                        <div className="videos-sidebar-item-logo">
                            <p>{"00" + count}</p>
                        </div>
                        <div className="videos-sidebar-item-info">
                            <p>{this.state.videos[i].title}</p>
                        </div>


                    </li>
                );
                count++;
            }
        }
        return elements;
    }
    handleShowSidebar() {
        if (this.state.isSidebarShowing == true) this.setState({ isSidebarShowing: false });
        else {
            this.setState({ isSidebarShowing: true });
        }
    }
    getSelectedClass(i) {
        if (this.state.videos[i].isHidden == false) return " video-selected";
        else return "";
    }

    handleShowVideo(i) {
        console.log("index", i);
        let newVideos = this.state.videos;
        //hide videos at other indexes
        for (let j in newVideos) {
            if (j !== i) newVideos[j].isHidden = true;
        }
        //show the video at this index 
        if (newVideos[i].isHidden === true) newVideos[i].isHidden = false;
        else newVideos[i].isHidden = true;
        this.setState({ videos: newVideos });

    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        const newVideos = this.state.videos;
        if (oldProps.isVideoSidebarTriggered !== newProps.isVideoSidebarTriggered) {
            if (newProps.isVideoSidebarTriggered === true) {
                if (this.state.isSidebarShowing === false) {
                    this.setState({ isSidebarShowing: true });
                    myTimeout = setTimeout(() => {
                        this.handleShowSidebar();
                    }, 3000);
                }
            }
        }
        //if changing category, stop playback
        if (oldProps.category !== newProps.category) {
            for (let i in newVideos) {
                newVideos[i].isHidden = true;

            }
            for (let i in newVideos) {
                if (newVideos[i].category === newProps.category) {
                    newVideos[i].isHidden = false;
                    this.setState({ videos: newVideos });
                    return;
                }

            }
        }
    }
    componentDidMount() {
        myTimeout = setTimeout(() => {
            this.handleShowSidebar();
        }, 3000);
    }

}

export default VideosSidebar;