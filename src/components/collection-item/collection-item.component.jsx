import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../component.utils';

import {
    CollectionItemContainer, CollectionItemImg,
    CollectionItemFigCaption, CollectionItemTitle,
    CollectionItemPrice, CollectionItemButton
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <CollectionItemContainer>
            <CollectionItemImg src={imageUrl} alt={name} />
            <CollectionItemFigCaption>
                <CollectionItemTitle>{name}</CollectionItemTitle>
                <CollectionItemPrice>{convertToPHPCurrency(price)}</CollectionItemPrice>
            </CollectionItemFigCaption>
            <CollectionItemButton
                isInverted onClick={() => addItem(item)}
            >add to cart</CollectionItemButton>
        </CollectionItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);