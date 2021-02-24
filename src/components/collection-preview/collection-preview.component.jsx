import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h2 className='collection-preview__title'>{title}</h2>
        <div className='collection-preview__items'>
            {items.filter((item, index) => index < 4)
                .map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default CollectionPreview;