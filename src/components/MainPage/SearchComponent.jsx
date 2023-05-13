import _ from 'lodash'
import React, {useCallback} from 'react';
import {Search} from "semantic-ui-react";

import {useSelector} from 'react-redux';
import {getAllPodcasts} from '../../redux/selectors';

import store from '../../redux/store';

const SearchComponent = () => {
  const allPodcasts = useSelector(getAllPodcasts);

  const handleSearchChange = useCallback((_e, data) => {
    const re = new RegExp(_.escapeRegExp(data.value), 'i')
    const isMatch = (result) => re.test(result.song || result.author)
    store.dispatch({type: 'SET_FILTERED_PODCASTS', payload: _.filter(allPodcasts, isMatch)})
  }, [allPodcasts])

  return (
    <Search
      loading={!allPodcasts}
      showNoResults={false}
      onSearchChange={handleSearchChange}
    />
  );
};

export default SearchComponent;
