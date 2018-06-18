import React from 'react';

const Rank = ( {name, entries, rank} ) => {
    return (
        <div>
            <div className='white f3'>
                {name + ' you detected ' + entries + ' images'}
            </div>
            <div className='white f3 mt3'>
                {'Your current rank is:'}
            </div>
            <div className='white f1'>
                {rank}
            </div>
        </div>
    );
}

export default Rank;