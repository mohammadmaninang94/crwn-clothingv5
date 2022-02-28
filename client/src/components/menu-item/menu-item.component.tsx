import { useHistory, useRouteMatch } from "react-router-dom";
import { Section } from '../directory/directory.container';

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, ContentTitle, ContentSubtitle } from './menu-item.styles';

type MenuItemProps = Section;

const MenuItem = ({ title, imageUrl, imageUrlWebp, linkUrl }: MenuItemProps) => {
    const history = useHistory();
    const match = useRouteMatch();
    console.log(match);
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

export default MenuItem;