import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, ContentTitle, ContentSubtitle } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, linkUrl, match, history }) => (
    <MenuItemContainer title={title}  onClick={() => history.push(`${match.url}${linkUrl}`)} >
        <BackgroundImageContainer imageUrl={imageUrl} />
        <ContentContainer>
            <ContentTitle>{title}</ContentTitle>
            <ContentSubtitle>Shop Now</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
);

export default withRouter(MenuItem);