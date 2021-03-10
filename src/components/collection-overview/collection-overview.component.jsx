import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShopCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const CollectionOveriew = ({ collections }) => (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...otherProps }) => (
                <CollectionPreview key={id} {...otherProps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOveriew);