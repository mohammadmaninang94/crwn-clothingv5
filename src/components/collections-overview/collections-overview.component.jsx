import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShopCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionsOveriew = ({ collections }) => (
    <div className='collection-overview'>
        { collections.map(({ id, ...otherProps }) => (
            <CollectionPreview key={id} {...otherProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOveriew);