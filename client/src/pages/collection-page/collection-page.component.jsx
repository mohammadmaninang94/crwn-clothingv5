import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import { CollectionPageTitle, CollectionPageItems } from './collection-page.styles';

const CollectionPage = ({ collection: { title, items } }) => (
    <div className='collection-page'>
        <CollectionPageTitle>{title}</CollectionPageTitle>
        <CollectionPageItems>
            {items.map(item => (<CollectionItem key={item.id} item={item} />))}
        </CollectionPageItems>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    const { collectionId } = ownProps.match.params;
    return ({
        collection: selectShopCollection(collectionId)(state)
    })
};

export default connect(mapStateToProps)(CollectionPage);