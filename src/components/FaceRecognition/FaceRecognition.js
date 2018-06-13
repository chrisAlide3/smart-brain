import React from 'react';
import './FaceRecognition.css';

const FaceRecogition = ( {imageUrl, box} ) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' className='mt3 mb' alt='' width='500px' height='auto' src={imageUrl}/>

                {box.map((faces, i) => {
                    return(
                    <div key={i} className='bounding-box' 
                    style={{top: faces.top, right: faces.right, bottom: faces.bottom, left: faces.left}}>
                    </div>
                    );
                })}
                
            </div>
        </div>
    );
}

export default FaceRecogition;
