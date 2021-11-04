import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, ContentTitle, ContentSubtitle } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, imageUrlWebp, linkUrl, match, history }) => {
    const hasWebp = document.documentElement.classList.contains('webp');
    const imgSrc = hasWebp ? imageUrlWebp : imageUrl;
    return (
        <MenuItemContainer title={title} onClick={() => history.push(`${match.url}${linkUrl}`)} >
            <BackgroundImageContainer imgSrc={imgSrc} />
            <ContentContainer>
                <ContentTitle>{title}</ContentTitle>
                <ContentSubtitle>Shop Now</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    )
};

export default withRouter(MenuItem);