import { useHistory, useLocation } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import { CollectionPreviewContainer, CollectionPreviewTitle, CollectionPreviewItems } from './collection-preview.styles';

const CollectionPreview = ({ title, routeName, items }) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <CollectionPreviewContainer>
            <CollectionPreviewTitle
                onClick={() => history.push(`${location.pathname}/${routeName}`)}>
                {title}
            </CollectionPreviewTitle>
            <CollectionPreviewItems>
                {items.filter((item, index) => index < 4)
                    .map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))}
            </CollectionPreviewItems>
        </CollectionPreviewContainer>
    )
};

export default CollectionPreview;