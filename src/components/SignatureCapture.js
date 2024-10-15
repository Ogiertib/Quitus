// src/components/SignatureCapture.js

import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureCapture = ({ onSave }) => {
    const sigCanvas = useRef(null);

    const saveSignature = () => {
        const dataURL = sigCanvas.current.toDataURL('image/png');
        onSave(dataURL);
    };

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    return (
        <div>
            <h2>Signature</h2>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'signature-canvas',
                    style: { border: '2px solid #000', borderRadius: '4px', backgroundColor: '#fff' },
                }}
            />
            <button onClick={clearSignature}>Effacer</button>
            <button onClick={saveSignature}>Sauvegarder la signature</button>
        </div>
    );
};

export default SignatureCapture;
