import { connect } from 'react-redux';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import './collection-page.styles.scss';

const CollectionPage = ({ collection }) => {
    console.log('CollectionPage');
    return (
        <div className='collection-page'>

        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    const { collectionId } = ownProps.match.params;
    return ({
        collection: selectShopCollection(collectionId)(state)
    })
};

export default connect(mapStateToProps)(CollectionPage);