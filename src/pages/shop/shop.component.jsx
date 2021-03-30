import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

import { UpdateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const CollectionsOveviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
  state = {
    loading: true
  }
  
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { UpdateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      UpdateCollections(collectionsMap);
      this.setState({ loading: false });
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOveviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} /> 
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  UpdateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);