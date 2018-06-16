import React from 'react';

class Rank extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         rank: 1
    //     }
    // }

// calculateRank = () => {
//     fetch('https://guarded-ridge-12145.herokuapp.com/userRank/'+this.props.id, {
//         method: 'get',
//         headers: {'Content-Type': 'application/json'}
//         })
//         .then(response => response.json())
//         .then(rank => {
//             this.setState({rank: rank.rank});
//         })
//         .catch(err => {
//             console.log('get rank failed');
            
//         })
// }
    
componentDidMount = () => {
    this.props.calculateRank(this.props.id);
    // this.calculateRank();
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
                    {/* {this.state.rank} */}
                </div>
            </div>
        );
    }
}

export default Rank;