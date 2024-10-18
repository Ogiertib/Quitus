import React, { useState, useEffect } from 'react';
import './VmcTable.css';

const VmcTable = ({ onSave }) => {
    const [vmcData, setVmcData] = useState([
        { id: 1, name: 'Bouche cuisine', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 2, name: 'Bouche salle de bain', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 3, name: 'Bouche salle de bain 2', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 4, name: 'Bouche WC', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 5, name: 'Bouche autre', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 6, name: 'Présence Hotte cuisine', present: 'Non', remarks: '', photo: '', photoName: '' },
        { id: 7, name: 'Démontage Hotte de cuisine', present: 'Non', remarks: '', photo: '', photoName: '' },
    ]);

    useEffect(() => {
        onSave(vmcData);
    }, [vmcData, onSave]);

    const handleChange = (id, field, value) => {
        setVmcData(prevData =>
            prevData.map(vmc => (vmc.id === id ? { ...vmc, [field]: value } : vmc))
        );
    };

    const handlePhotoChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVmcData(prevData =>
                    prevData.map(vmc => (vmc.id === id ? { ...vmc, photo: reader.result, photoName: file.name } : vmc))
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoDelete = (id) => {
        setVmcData(prevData =>
            prevData.map(vmc => (vmc.id === id ? { ...vmc, photo: '', photoName: '' } : vmc))
        );
    };

    return (
        <div className="vmc-table-container">
            {vmcData.map(vmc => (
                <div key={vmc.id} className="vmc-item">
                    <div className="vmc-item-header">
                        <h3>{vmc.name}</h3>
                        <div className="toggle-container">
                            <p>Oui/Non</p>
                            {/* Toggle pour Oui/Non inversé */}
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={vmc.present === 'Oui'}
                                    onChange={() => handleChange(vmc.id, 'present', vmc.present === 'Oui' ? 'Non' : 'Oui')}
                                />
                                <span className="slider inverted"></span>
                            </label>
                        </div>
                    </div>
                    <div className="vmc-item-body">
                        <input
                            type="text"
                            value={vmc.remarks}
                            onChange={e => handleChange(vmc.id, 'remarks', e.target.value)}
                            placeholder="Remarques"
                            className="remarks-input"
                        />
                        
                        {!vmc.photo && (
                            <label className="photo-upload-button">
                                <input
                                    id={`file-input-${vmc.id}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handlePhotoChange(vmc.id, e)}
                                    style={{ display: 'none' }}
                                />
                                <div className="photo-upload-icon">+</div>
                            </label>
                        )}

                        {/* Afficher le nom de la photo en dessous */}
                        

                        {/* Bouton de suppression uniquement si la photo est présente */}
                        {vmc.photo && (
                            <button
                                className="delete-photo-button"
                                onClick={() => handlePhotoDelete(vmc.id)}
                            >
                                &ndash;
                            </button>
                        )}
                        {vmc.photoName && <p className="photo-name">{vmc.photoName}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VmcTable;
