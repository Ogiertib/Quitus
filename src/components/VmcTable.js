import React, { useState, useEffect } from 'react';
import './VmcTable.css';

const VmcTable = ({ onSave }) => {
    const [vmcData, setVmcData] = useState([
        { id: 1, name: 'Bouche cuisine', present: '', remarks: '', photo: '' },
        { id: 2, name: 'Bouche salle de bain', present: '', remarks: '', photo: '' },
        { id: 3, name: 'Bouche salle de bain 2', present: '', remarks: '', photo: '' },
        { id: 4, name: 'Bouche WC', present: '', remarks: '', photo: '' },
        { id: 5, name: 'Bouche autre', present: '', remarks: '', photo: '' },
        { id: 6, name: 'Présence Hotte cuisine', present: '', remarks: '', photo: '' },
        { id: 7, name: 'Démontage Hotte de cusine', present: '', remarks: '', photo: '' },
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
        const reader = new FileReader();

        reader.onloadend = () => {
            setVmcData(prevData =>
                prevData.map(vmc => (vmc.id === id ? { ...vmc, photo: reader.result } : vmc))
            );
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Présent</th>
                        <th>Remarques</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {vmcData.map(vmc => (
                        <tr key={vmc.id}>
                            <td>{vmc.name}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={vmc.present === 'Oui'}
                                    onChange={() => handleChange(vmc.id, 'present', vmc.present === 'Oui' ? '' : 'Oui')}
                                />
                                Oui
                                <input
                                    type="checkbox"
                                    checked={vmc.present === 'Non'}
                                    onChange={() => handleChange(vmc.id, 'present', vmc.present === 'Non' ? '' : 'Non')}
                                    style={{ marginLeft: '10px' }}
                                />
                                Non
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={vmc.remarks}
                                    onChange={e => handleChange(vmc.id, 'remarks', e.target.value)}
                                    placeholder="Remarques"
                                />
                            </td>
                            <td>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handlePhotoChange(vmc.id, e)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VmcTable;
