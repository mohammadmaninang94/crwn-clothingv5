import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl }) => (
    <div className={`menu-item menu-item--${title}`} >
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

export default MenuItem;