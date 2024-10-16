import React, { useState } from 'react';
import VmcTable from './components/VmcTable';
import RoomTable from './components/RoomTable';
import SignatureCapture from './components/SignatureCapture';
import generatePDF from './utils/generatePDF';
import './App.css';

const App = () => {
    const [vmcData, setVmcData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [signature, setSignature] = useState('');
    const [technician, setTechnician] = useState('');
    const [apartmentName, setApartmentName] = useState('');
    const [project, setProject] = useState('');
    const [floor, setFloor] = useState('');

    const handleSaveData = (data) => {
        setVmcData(data);
    };

    const handleSaveRoomData = (data) => {
        setRoomData(data);
    };

    const handleSaveSignature = (dataURL) => {
        setSignature(dataURL);
    };

    const handleGeneratePDF = async () => {
        const pdfBlob = generatePDF(vmcData, roomData, signature, technician, apartmentName, project, floor);
        await sharePDF(pdfBlob);
    };

    const sharePDF = (pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        if (navigator.share) {
            navigator.share({
                title: 'Partagez votre PDF',
                url: pdfUrl,
            }).then(() => {
                console.log('Partage réussi !');
            }).catch((error) => {
                console.error('Erreur lors du partage:', error);
            });
        } else {
            // Fallback for browsers that do not support the Web Share API
            console.warn('L’API de partage n’est pas prise en charge sur ce navigateur.');
        }
    };

    return (
        <div className="App">
            {/* Ajoutez ici vos composants pour la saisie des données */}
            <VmcTable onSave={handleSaveData} />
            <RoomTable onSave={handleSaveRoomData} />
            <SignatureCapture onSave={handleSaveSignature} />
            <button onClick={handleGeneratePDF}>Générer et partager le PDF</button>
        </div>
    );
};

export default App;
