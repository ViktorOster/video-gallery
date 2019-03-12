import React, { Component } from 'react';

class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li class="nav-logo">
                        VID GALLERY
                    </li>
                    <li>
                        Link
                    </li>
                    <li>
                        Link
                    </li>
                    <li>
                        Link
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;