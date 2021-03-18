import CollectionItem from '../collection-item/collection-item.component';

import { CollectionPreviewContainer, CollectionPreviewTitle, CollectionPreviewItems } from './collection-preview.styles';

const CollectionPreview = ({ title, items }) => (
    <CollectionPreviewContainer>
        <CollectionPreviewTitle>{title}</CollectionPreviewTitle>
        <CollectionPreviewItems>
            {items.filter((item, index) => index < 4)
                .map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
        </CollectionPreviewItems>
    </CollectionPreviewContainer>
);

export default CollectionPreview;