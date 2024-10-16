import jsPDF from 'jspdf';
import logoD2H from '../LogoD2H.jpg'; // Importer le logo D2H
import logoQualibat from '../LogoQualibat.png'; // Importer le logo Qualibat

const generatePDF = (vmcData, roomData, signature, technician, apartmentName, project, floor) => {
    const doc = new jsPDF();
    const margin = 10;
    const columnWidth = 60; // Largeur des colonnes
    const rowHeight = 10; // Hauteur des lignes
    const titleFontSize = 16; // Taille de la police pour le titre
    const headerFontSize = 12; // Taille de la police pour les en-têtes
    const bodyFontSize = 10; // Taille de la police pour le corps
    const footerFontSize = 8; // Taille de la police pour le pied de page

    // Ajouter les logos en haut à gauche et en haut à droite
    doc.addImage(logoD2H, 'JPEG', margin - 5, margin, 50, 20); // Logo D2H en haut à gauche
    doc.addImage(logoQualibat, 'PNG', doc.internal.pageSize.getWidth() - margin - 40, margin - 5, 40, 40); // Logo Qualibat en haut à droite

    // Informations générales
    doc.setFontSize(titleFontSize);
    doc.text('Quitus logement', margin + 70, margin + 10); // Centré
    doc.setFontSize(bodyFontSize);
    doc.text(`Technicien: ${technician}`, margin + 60, margin + 20);
    doc.text(`Appartement: ${apartmentName}`, margin + 60, margin + 30);
    doc.text(`Chantier: ${project}`, margin + 60, margin + 40);
    doc.text(`Étage: ${floor}`, margin + 60, margin + 50);

    // Création du tableau pour les VMC
    let currentY = margin + 70; // Position de départ pour le tableau

    // Dessiner les en-têtes pour VMC
    doc.text('Nom', margin, currentY);
    doc.text('Présent', margin + columnWidth, currentY);
    doc.text('Remarques', margin + columnWidth * 2, currentY);
    currentY += rowHeight;

    // Dessiner les lignes et les données pour les VMC
    vmcData.forEach(vmc => {
        doc.setDrawColor(0, 0, 0); // Couleur des lignes (noir)
        doc.rect(margin, currentY - 5, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
        doc.text(vmc.name, margin, currentY);
        doc.text(vmc.present, margin + columnWidth, currentY);
        doc.text(vmc.remarks, margin + columnWidth * 2, currentY);
        currentY += rowHeight;
    });

    // Création du tableau pour les pièces
    currentY += 2; // Espacement entre les tableaux
    currentY += rowHeight; // Pour l'espacement des en-têtes

    // Dessiner les en-têtes pour les pièces
    doc.text('Nom', margin, currentY);
    doc.text('Présent', margin + columnWidth, currentY);
    doc.text('Remarques', margin + columnWidth * 2, currentY);
    currentY += rowHeight;

    // Dessiner les lignes et les données pour les pièces
    roomData.forEach(room => {
        doc.setDrawColor(0, 0, 0); // Couleur des lignes (noir)
        doc.rect(margin, currentY - 5, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
        doc.text(room.name, margin, currentY);
        doc.text(room.present, margin + columnWidth, currentY);
        doc.text(room.remarks, margin + columnWidth * 2, currentY);
        currentY += rowHeight;
    });

    // Ajout de la signature
    if (signature) {
        doc.text('Signature:', margin + 80, currentY + 10);
        doc.addImage(signature, 'PNG', margin + 40, currentY + 10, 100, 40);
    }
    
    // Ajouter le texte en bas de la page
    const footerY = doc.internal.pageSize.height - margin - 10; // Position Y pour le pied de page
    doc.setFontSize(footerFontSize);
    doc.setTextColor(0, 0, 255); // Couleur bleu
    doc.text('D2H réseau QUALITY AIR', margin + 40, footerY);
    doc.setTextColor(0, 0, 0); // Couleur noir
    doc.text('64 route de saint Thomas - 73540 ESSERT BLAY - 06 73 98 73 73', margin + 40, footerY + 5);
    doc.setTextColor(0, 0, 0); // Couleur noir
    doc.text('Siret 504 186 545 00027 / code APE 8122 Z / N°intracommunautaire FR4150418654', margin + 40, footerY + 10);
    
    // Nouvelle page pour les photos
    doc.addPage();
    doc.setFontSize(titleFontSize);
    doc.text('Photos des VMC et des pièces:', margin, margin + 10);
    let photoY = margin + 30; // Position Y pour les photos

    const photoHeight = 60; // Hauteur des images de photos

    // Ajout de photos VMC
    vmcData.forEach(vmc => {
        if (vmc.photo) {
            if (photoY + photoHeight > doc.internal.pageSize.height - margin) {
                doc.addPage(); // Ajouter une nouvelle page si nécessaire
                photoY = margin + 20; // Réinitialiser la position Y pour la nouvelle page
            }
            doc.text(vmc.name, margin + 20, photoY - 5);
            doc.addImage(vmc.photo, 'JPEG', margin, photoY, 70, photoHeight);
            photoY += photoHeight + 10; // Espacement entre les photos
        }
    });

    // Ajout de photos des pièces
    roomData.forEach(room => {
        if (room.photo) {
            if (photoY + photoHeight > doc.internal.pageSize.height - margin) {
                doc.addPage(); // Ajouter une nouvelle page si nécessaire
                photoY = margin + 20; // Réinitialiser la position Y pour la nouvelle page
            }
            doc.text(room.name, margin + 20, photoY - 5);
            doc.addImage(room.photo, 'JPEG', margin, photoY, 70, photoHeight);
            photoY += photoHeight + 10; // Espacement entre les photos
        }
    });

    // Retourner le PDF en tant que blob
    return doc.output('blob');
};

export default generatePDF;
