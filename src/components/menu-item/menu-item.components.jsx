import { withRouter } from 'react-router-dom';

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, linkUrl, match, history }) => (
    <div className={`menu-item menu-item--${title}`} onClick={() => history.push(`${match.url}${linkUrl}`)} >
        <div className='menu-item__background-image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        ></div>
        <div className='menu-item__content'>
            <h2 className='menu-item__title'>{title}</h2>
            <span className='menu-item__subtitle'>Shop Now</span>
        </div>
    </div>
);

export default withRouter(MenuItem);