import React, { Component } from 'react'
import VideosSidebarCategories from './VideosSidebarCategories';

const categories = ["Animals/Nature", "Science", "People"];
let myTimeout;

class CategoriesSidebar extends Component {
    constructor() {
        super();

        this.state = {
            selectedCategory: categories[0],
            isVideoSidebarTriggered: false,
            isCategorySidebarShowing: true,
            isMouseOver: false
        }

        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleShowCategorySidebar = this.handleShowCategorySidebar.bind(this);
        this.getSelectedClass = this.getSelectedClass.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        let sidebarDisplayClass = this.state.isCategorySidebarShowing ? " categories-sidebar-show" : " categories-sidebar-hidden";
        let buttonDisplayClass = this.state.isCategorySidebarShowing ? " button-hide" : "";

        return (
            <div >

                <VideosSidebarCategories
                    category={this.state.selectedCategory}
                    isVideoSidebarTriggered={this.state.isVideoSidebarTriggered}
                />
                <ul className={"categories-sidebar" + sidebarDisplayClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {categories.map((item, i) => {
                        return (<li className={"categories-sidebar-item" + this.getSelectedClass(i)} onClick={() => this.handleChangeCategory(i)} >
                            <div className="categories-sidebar-item-logo">
                                <p>{categories[i]}</p>
                            </div>
                        </li>)
                    })}

                </ul>
                <button className={"categories-sidebar-show-button" + sidebarDisplayClass} onClick={this.handleShowCategorySidebar} onMouseEnter={this.handleShowCategorySidebar}>
                    <img className={"arrow-img arrow-img-right" + buttonDisplayClass} src="https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png" />

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
            this.handleShowCategorySidebar();
        }, 3000);
    }
    getSelectedClass(i) {
        if (categories[i] === this.state.selectedCategory) return " video-selected";
        else return "";
    }

    handleShowCategorySidebar() {
        if (this.state.isCategorySidebarShowing == true && this.state.isMouseOver === false) this.setState({ isCategorySidebarShowing: false });
        else {
            this.setState({ isCategorySidebarShowing: true });
            if (!this.state.isMouseOver) {
                myTimeout = setTimeout(() => {
                    this.handleShowCategorySidebar();
                }, 3000);
            }
        }
    }
    handleChangeCategory(i) {

        clearTimeout(myTimeout);
        if (this.state.isCategorySidebarShowing === false) {
            this.handleShowCategorySidebar();
        }
        this.setState({ selectedCategory: categories[i] });
        this.setState({ isVideoSidebarTriggered: true });
        setTimeout(() => {
            this.setState({ isVideoSidebarTriggered: false });
        }, 3000);
        if (!this.state.isMouseOver) {
            myTimeout = setTimeout(() => {
                this.handleShowCategorySidebar();
            }, 3000);
        }
    }
    componentDidMount() {
        myTimeout = setTimeout(() => {
            this.handleShowCategorySidebar();
        }, 3000);
    }

}

export default CategoriesSidebar;