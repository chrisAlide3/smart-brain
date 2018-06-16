import React from 'react';

class Rank extends React.Component {
    
componentDidMount = () => {
    this.props.calculateRank(this.props.id);
}

componentDidUpdate = () => {
    this.props.calculateRank(this.props.id);
}

    render() {
        const { name, entries, rank } = this.props;
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
}

export default Rank;