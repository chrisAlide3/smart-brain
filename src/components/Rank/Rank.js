import React from 'react';

// const Rank = ( {id, name, entries} ) => {
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            rank: 1
        }
    }

calculateRank = () => {
    fetch('https://guarded-ridge-12145.herokuapp.com/userRank/'+this.props.id, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(rank => {
            this.setState({rank: rank.rank});
        })
        .catch(err => {
            console.log('get rank failed');
            
        })
}

componentDidMount = () => {
    this.calculateRank();
}

componentDidUpdate = () => {
    this.calculateRank();
}
    
    render() {
        const { name, entries } = this.props;
        return (
            <div>
                <div className='white f3'>
                    {name + ' you detected ' + entries + ' images'}
                </div>
                <div className='white f3 mt3'>
                    {'Your current rank is:'}
                </div>
                <div className='white f1'>
                    {this.state.rank}
                </div>
            </div>
        );
    }
}

export default Rank;