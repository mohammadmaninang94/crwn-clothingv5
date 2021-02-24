import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../component.utils';

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <figure className='collection-item'>
            <img src={imageUrl} alt={name} className='collection-item__img' />
            <figcaption className='collection-item__caption'>
                <h3 className='collection-item__title'>{name}</h3>
                <b className='collection-item__price'>{convertToPHPCurrency(price)}</b>
            </figcaption>
            <CustomButton
                additionalClass='btn--inverted collection-item__btn'
                onClick={() => addItem(item)}
            >add to cart</CustomButton>
        </figure>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);