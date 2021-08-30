import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import { CollectionPageTitle, CollectionPageItems } from './collection-page.styles';

const CollectionPage = () => {
    const { collectionId } = useParams();
    const { title, items } = useSelector(selectShopCollection(collectionId));

    return (
        <div className='collection-page'>
            <CollectionPageTitle>{title}</CollectionPageTitle>
            <CollectionPageItems>
                {items.map(item => (<CollectionItem key={item.id} item={item} />))}
            </CollectionPageItems>
        </div>
    )
};

export default CollectionPage;