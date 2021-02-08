import './collection-item.styles.scss';



const CollectionItem = ({ name, imageUrl, price }) => (
    <figure className='collection-item'>
        <img src={imageUrl} alt={name} className='collection-item__img' />
        <figcaption className='collection-item__caption'>
            <h3 className='collection-item__title'>{name}</h3>
            <b className='collection-item__price'>{(price * 50).toLocaleString("en", { style: "currency", currency: "PHP", minimumFractionDigits: 0 })}</b>
        </figcaption>
    </figure>
);

export default CollectionItem;