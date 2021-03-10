import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionPage from '../collection-page/collection-page.component';
import CollectionOveriew from '../../components/collection-overview/collection-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const CollectionOveriewWithSpinner = WithSpinner(CollectionOveriew);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionsSnapshot = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionsSnapshot.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <Fragment>
                <Route exact path={match.path} render={() => {
                    return (
                        <div className='shop-page'>
                            <CollectionOveriewWithSpinner isLoading={loading} />
                        </div>
                    )
                }} />
                <Route path={`${match.path}/:collectionId`} render={routerProps => <CollectionPageWithSpinner isLoading={loading} {...routerProps} />} />
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);