import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionOveriew from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection-page/collection-page.component';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionsSnapshot = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionsSnapshot.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }

    render() {
        const { match } = this.props;
        return (
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
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);