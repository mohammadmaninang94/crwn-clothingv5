import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import './collection-page.styles.scss';

const CollectionPage = ({ collection: { title, items } }) => (
    <div className='collection-page'>
        <h1 className='collection-page__title'>{title}</h1>
        <div className='collection-page__items'>
            {items.map(item => (<CollectionItem key={item.id} item={item} />))}
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    const { collectionId } = ownProps.match.params;
    return ({
        collection: selectShopCollection(collectionId)(state)
    })
};

export default connect(mapStateToProps)(CollectionPage);