import React, { useState } from 'react';
import VmcTable from './components/VmcTable';
import RoomTable from './components/RoomTable';
import SignatureCapture from './components/SignatureCapture';
import generatePDF from './utils/generatePDF';
import emailjs from 'emailjs-com';
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

    const handleGeneratePDF = () => {
        const pdfBlob = generatePDF(vmcData, roomData, signature, technician, apartmentName, project, floor);
        return pdfBlob;
    };

    const handleDownloadPDF = () => {
        const pdfBlob = handleGeneratePDF();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = project+ '-' + technician+ '-' + apartmentName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Nouvelle fonction pour envoyer le PDF par e-mail
   
    return (
        <div>
            <h1>D2H Quitus Logement</h1>
            <div>
                <label>
                    Technicien:
                    <input type="text" value={technician} onChange={(e) => setTechnician(e.target.value)} />
                </label>
           
                <label>
                    Appartement:
                    <input type="text" value={apartmentName} onChange={(e) => setApartmentName(e.target.value)} />
                </label>
            
                <label>
                    Chantier:
                    <input type="text" value={project} onChange={(e) => setProject(e.target.value)} />
                </label>
              
                <label>
                    Étage:
                    <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} />
                </label>
            
            </div>
            <div className="table-container">
                <VmcTable onSave={handleSaveData} />
            </div>
            <div className="table-container">
                <RoomTable onSave={handleSaveRoomData} />
            </div>
            <div className="signature-container">
                <SignatureCapture onSave={handleSaveSignature} />
            </div>
            {/* Boutons de téléchargement et d'envoi */}
            <button onClick={handleDownloadPDF}>Télécharger le PDF</button>
           

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ color: 'blue', margin: '0' }}>D2H réseau QUALITY AIR</p>
                <p style={{ color: 'black', margin: '0' }}>64 route de saint Thomas - 73540 ESSERT BLAY - 06 73 98 73 73</p>
                <p style={{ color: 'black', margin: '0' }}>Siret 504 186 545 00027 / code APE 8122 Z / N°intracommunautaire FR4150418654</p>
            </div>
        </div>
    );
};

export default App;
