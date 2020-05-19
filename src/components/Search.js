import React from 'react';
import PropTypes from 'prop-types';

/**
 * Define a Search const where you can search location
 */

const Search = ({press, searchEvent}) => {
    
    return (
        <div className = "center">
            <input name = "text" type = "text" placeholder = "Search" onKeyDown = {press} onChange = {searchEvent} />
        </div>
    )
}
export default Search; 
