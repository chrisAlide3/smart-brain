import React from 'react';
import './ImageLinkForm.css'

// The parameter is destructured. Could be props.onInputChange
const ImageLinkForm = ( {onInputChange, onButtonDetect, onButtonClear, inputSelectAll} ) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input  
                        type='text'
                        id='input'
                        className='f4 pa2 w-70 center'
                        autoFocus
                        onKeyUp={onInputChange}
                        onClick={inputSelectAll}
                    />
                    <button 
                        className='w-5 p0 bn bl bl-2 grow f4 link ph3 pv2 dib black bg-light-grey'
                        onClick={onButtonClear}
                    >X
                    </button>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonDetect}
                    >Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
