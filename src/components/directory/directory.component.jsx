import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.components';

import "./directory.styles.scss";

const Directory = ({ sections }) => (
    <div className='directory-menu'>
        {
            sections.map(({ title, imageUrl, id }) => (
                <MenuItem key={id} title={title} imageUrl={imageUrl} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);