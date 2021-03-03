import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import CollectionOveriew from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection-page/collection-page.component';

import './shop-page.styles.scss';

const ShopPage = ({ match }) => (
    <Fragment>
        <Route exact path={match.path} render={() => {
            return (
                <div className='shop-page'>
                    <CollectionOveriew />
                </div>
            )
        }} />
        <Route path={`${match.path}/:collectionId`} render={routerProps => <CollectionPage {...routerProps} />} />
    </Fragment>
);


export default ShopPage;