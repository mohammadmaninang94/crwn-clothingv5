import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOveriew from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionsOveriewWithSpinner = WithSpinner(CollectionsOveriew);

const CollectionsOveriewContainer = connect(mapStateToProps)(CollectionsOveriewWithSpinner);

export default CollectionsOveriewContainer;