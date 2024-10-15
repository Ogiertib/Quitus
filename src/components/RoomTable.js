import React, { useState, useEffect } from 'react';
import './RoomTable.css';

const RoomTable = ({ onSave }) => {
    const [roomData, setRoomData] = useState([
        { id: 1, name: 'Entrées d\'air salon',present: '', remarks: '', photo: '' },
        { id: 2, name: 'Entrées d\'air chambres',present: '', remarks: '', photo: '' },
        { id: 3, name: 'Détalonnage portes', present: '',remarks: '', photo: '' },
        { id: 4, name: 'Obturation entrées d\'air',present: '', remarks: '', photo: '' },
    ]);

    useEffect(() => {
        onSave(roomData);
    }, [roomData, onSave]);

    const handleChange = (id, field, value) => {
        setRoomData(prevData =>
            prevData.map(room => (room.id === id ? { ...room, [field]: value } : room))
        );
    };

    const handlePhotoChange = (id, event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setRoomData(prevData =>
                prevData.map(room => (room.id === id ? { ...room, photo: reader.result } : room))
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
                        <th>presence</th>
                        <th>Remarques</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {roomData.map(room => (
                        <tr key={room.id}>
                            <td>{room.name}</td>
                            <td> 
                                <input
                                    type="checkbox"
                                    checked={room.present === 'Oui'}
                                    onChange={() => handleChange(room.id, 'present', room.present === 'Oui' ? '' : 'Oui')}
                                />
                                Oui
                                <input
                                    type="checkbox"
                                    checked={room.present === 'Non'}
                                    onChange={() => handleChange(room.id, 'present', room.present === 'Non' ? '' : 'Non')}
                                    style={{ marginLeft: '10px' }}
                                />
                                Non
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={room.remarks}
                                    onChange={e => handleChange(room.id, 'remarks', e.target.value)}
                                    placeholder="Remarques"
                                />
                            </td>
                            <td>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handlePhotoChange(room.id, e)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTable;
