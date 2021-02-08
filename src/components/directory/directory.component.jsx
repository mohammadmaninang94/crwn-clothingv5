import React from 'react';

import MenuItem from '../menu-item/menu-item.components';

import SECTIONS_DATA from '../../assests/data/sections.data';

import "./directory.styles.scss";

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: SECTIONS_DATA
        }
    }

    render() {
        return (
            <div className='directory-menu'>
                {
                    this.state.sections.map(({ title, imageUrl, id }) => (
                        <MenuItem key={id} title={title} imageUrl={imageUrl} />
                    ))
                }
            </div>
        )
    }
}

export default Directory;