import _ from 'lodash'
import React, {useCallback} from 'react';
import {Search, Label} from "semantic-ui-react";

import {useSelector} from 'react-redux';
import {getAllPodcasts, getFilteredPodcasts} from '../../redux/selectors';

import store from '../../redux/store';

const SearchComponent = () => {
  const allPodcasts = useSelector(getAllPodcasts);
  const filteredPodcasts = useSelector(getFilteredPodcasts);

  const handleSearchChange = useCallback((_e, data) => {
    const re = new RegExp(_.escapeRegExp(data.value), 'i')
    const isMatch = (result) => re.test(result.song || result.author)
    store.dispatch({type: 'SET_FILTERED_PODCASTS', payload: _.filter(allPodcasts, isMatch)})
  }, [allPodcasts])

  return (
    <>
      <Label color="blue" style={{fontSize: 18}}>{filteredPodcasts?.length}</Label>
      <Search
        loading={!allPodcasts}
        showNoResults={false}
        onSearchChange={handleSearchChange}
        placeholder='Filter podcast...'
      />
    </>
  );
};

export default SearchComponent;
