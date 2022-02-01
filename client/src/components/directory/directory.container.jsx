import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import Directory from './directory.component';

const DirectoryContainer = ({ sections }) => (
    <Directory sections={sections} />
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(DirectoryContainer);