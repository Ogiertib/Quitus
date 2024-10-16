import jsPDF from 'jspdf';
import logoD2H from '../LogoD2H.jpg'; // Importer le logo D2H
import logoQualibat from '../LogoQualibat.png'; // Importer le logo Qualibat

const generatePDF = (vmcData, roomData, signature, technician, apartmentName, project, floor,types) => {
    const doc = new jsPDF();
    const margin = 10;
    const columnWidth = 60; // Largeur des colonnes
    const rowHeight = 8; // Hauteur des lignes
    const titleFontSize = 20; // Taille de la police pour le titre
    const bodyFontSize = 10;// Taille de la police pour le corps
    const footerFontSize = 8; // Taille de la police pour le pied de page

    // Ajouter les logos en haut à gauche et en haut à droite
    doc.addImage(logoD2H, 'JPEG', margin , margin, 50, 15); // Logo D2H en haut à gauche
   
    doc.addImage(logoQualibat, 'PNG', doc.internal.pageSize.getWidth() - margin -25, margin -5 , 25, 20); // Logo Qualibat en haut à droite
    // Titre
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'normal'); // Police normale pour le texte
    doc.text('Quitus logement', margin + 75, margin + 15); // Centré

    // Souligner le texte
    const textWidth = doc.getTextWidth('Quitus logement'); // Obtenir la largeur du texte
    const textX = margin + 75;
    const textY = margin + 16; // Position Y pour la ligne juste sous le texte
    doc.line(textX, textY, textX + textWidth, textY); // Dessiner une ligne sous le texte
    // Informations générales
    doc.setFontSize(bodyFontSize);

    // Technicien
    doc.setFont('helvetica', 'normal'); // Police normale pour le label
    doc.text('Technicien:', margin , margin + 25);
    doc.setFont('helvetica', 'bold'); // Police en gras pour la variable
    doc.text(technician, margin + 20, margin + 25); 
    
    // Chantier
    doc.setFont('helvetica', 'normal'); // Police normale pour le label
    doc.text('Chantier:', margin , margin + 32);
    doc.setFont('helvetica', 'bold'); // Police en gras pour la variable
    doc.text(project, margin + 15, margin + 32);
    
    // Appartement
    doc.setFont('helvetica', 'normal'); // Police normale pour le label
    doc.text('Appartement:', margin , margin + 39);
    doc.setFont('helvetica', 'bold'); // Police en gras pour la variable
    doc.text(apartmentName, margin + 22, margin + 39);
    
    // Étage
    doc.setFont('helvetica', 'normal'); // Police normale pour le label
    doc.text('Étage:', margin , margin + 46);
    doc.setFont('helvetica', 'bold'); // Police en gras pour la variable
    doc.text(floor, margin + 12, margin + 46);

    doc.setFont('helvetica', 'normal'); // Police normale pour le label
    doc.text('Type appartement:', margin , margin + 53);
    doc.setFont('helvetica', 'bold'); // Police en gras pour la variable
    doc.text(types, margin + 32, margin + 53);
    // Création du tableau pour les VMC
    let currentY = margin + 70; // Position de départ pour le tableau

    // Dessiner les en-têtes pour VMC
    doc.rect(margin, currentY-10, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
    doc.setFont('helvetica', 'bold'); // Définir la police en gras
    doc.text('Désignation', margin +2, currentY -5);
    doc.text('Présent', margin + columnWidth, currentY -5);
    doc.text('Remarques', margin -30 + columnWidth * 2, currentY-5);
    currentY += rowHeight;

    // Dessiner les lignes et les données pour les VMC
    vmcData.forEach(vmc => {
       
        doc.setDrawColor(0, 0, 0); // Couleur des lignes (noir)
        doc.rect(margin, currentY - 10, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
        doc.text(vmc.name, margin +2 , currentY -5);
        doc.text(vmc.present, margin +2 + columnWidth, currentY -5);
        doc.text(vmc.remarks, margin -30 + columnWidth * 2, currentY -5);
        currentY += rowHeight;
    });

    // Création du tableau pour les pièces
    currentY += 2; // Espacement entre les tableaux
    currentY += rowHeight; // Pour l'espacement des en-têtes

    // Dessiner les en-têtes pour les pièces
    doc.rect(margin, currentY - 10, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
    doc.setFont('helvetica', 'bold'); // Définir la police en gras
    doc.text('Désignation', margin +2, currentY - 5);
    doc.text('Présent', margin + columnWidth, currentY - 5);
    doc.text('Quantité/Remarques', margin -30 + columnWidth * 2, currentY - 5);
    currentY += rowHeight;

    // Dessiner les lignes et les données pour les pièces
    roomData.forEach(room => {
        doc.setDrawColor(0, 0, 0); // Couleur des lignes (noir)
        doc.rect(margin, currentY - 10, columnWidth * 3, rowHeight, 'S'); // Dessiner une bordure autour de la ligne
        doc.text(room.name, margin +2, currentY - 5);
        doc.text(room.present, margin +2  + columnWidth, currentY - 5);
        doc.text(room.remarks, margin -30 + columnWidth * 2, currentY - 5);
        currentY += rowHeight;
    });

    // Ajout de la signature
    if (signature) {
        doc.text('Signature:', margin + 80, currentY + 10);
        doc.addImage(signature, 'PNG', margin + 40, currentY + 10, 100, 40);
    }

    const addFooterToPDF = (doc) => {
        const margin = 10;
        const footerFontSize = 10;
    

    // Nouvelle page pour les photos
doc.addPage();
doc.setFontSize(titleFontSize);
doc.text('Photos intervention:', margin, margin + 10);
let photoY = margin + 30; // Position Y pour les photos

const maxHeight = 100; // Hauteur maximale des photos
const maxWidth = doc.internal.pageSize.width - 2 * margin; // Largeur maximale autorisée pour les photos

// Fonction pour obtenir la taille ajustée de l'image tout en respectant les contraintes de largeur et hauteur
const getScaledDimensions = (imgWidth, imgHeight, maxHeight, maxWidth) => {
    const imgRatio = imgWidth / imgHeight; // Ratio original de l'image

    // Calculer la taille basée sur la contrainte de hauteur et de largeur
    let scaledWidth = imgWidth;
    let scaledHeight = imgHeight;

    if (imgHeight > maxHeight) {
        // Ajuster la hauteur si elle dépasse la contrainte, conserver le ratio
        scaledHeight = maxHeight;
        scaledWidth = maxHeight * imgRatio;
    }

    if (scaledWidth > maxWidth) {
        // Si la largeur ajustée dépasse la largeur maximale, ajuster en conséquence
        scaledWidth = maxWidth;
        scaledHeight = maxWidth / imgRatio;
    }

    return { width: scaledWidth, height: scaledHeight };
};

// Ajout de photos VMC
doc.setFontSize(bodyFontSize);

vmcData.forEach(vmc => {
    if (vmc.photo) {
        const image = vmc.photo; // Supposons que 'vmc.photo' contient une image en base64

        // Utiliser la fonction getImageProperties de jsPDF pour obtenir la largeur/hauteur de l'image
        const imgProps = doc.getImageProperties(image);
        const { width: scaledWidth, height: scaledHeight } = getScaledDimensions(imgProps.width, imgProps.height, maxHeight, maxWidth);

        if (photoY + scaledHeight > doc.internal.pageSize.height - margin) {
            doc.addPage(); // Ajouter une nouvelle page si nécessaire
            photoY = margin + 20; // Réinitialiser la position Y pour la nouvelle page
        }

        doc.text(vmc.name, margin + 20, photoY - 5);
        doc.addImage(image, 'JPEG', margin, photoY, scaledWidth, scaledHeight);
        photoY += scaledHeight + 10; // Espacement entre les photos
    }
});

// Ajout de photos des pièces
roomData.forEach(room => {
    if (room.photo) {
        const image = room.photo; // Supposons que 'room.photo' contient une image en base64

        // Utiliser la fonction getImageProperties de jsPDF pour obtenir la largeur/hauteur de l'image
        const imgProps = doc.getImageProperties(image);
        const { width: scaledWidth, height: scaledHeight } = getScaledDimensions(imgProps.width, imgProps.height, maxHeight, maxWidth);

        if (photoY + scaledHeight > doc.internal.pageSize.height - margin) {
            doc.addPage(); // Ajouter une nouvelle page si nécessaire
            photoY = margin + 20; // Réinitialiser la position Y pour la nouvelle page
        }

        doc.text(room.name, margin + 20, photoY - 5);
        doc.addImage(image, 'JPEG', margin, photoY, scaledWidth, scaledHeight);
        photoY += scaledHeight + 10; // Espacement entre les photos
    }
});
        // Fonction qui va ajouter le pied de page à chaque page
        const pageCount = doc.internal.getNumberOfPages();
    
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);  // Va à la page i
            const footerY = doc.internal.pageSize.height - margin - 10; // Position Y pour le pied de page
    
            // Ajoute le contenu du pied de page
            doc.setFontSize(footerFontSize);
            doc.setTextColor(0, 0, 255); // Couleur bleu
            doc.text('D2H réseau QUALITY AIR', margin + 40, footerY);
            doc.setTextColor(0, 0, 0); // Couleur noir
            doc.text('64 route de saint Thomas - 73540 ESSERT BLAY - 06 73 98 73 73', margin + 40, footerY + 5);
            doc.text('Siret 504 186 545 00027 / code APE 8122 Z / N°intracommunautaire FR4150418654', margin + 40, footerY + 10);
        }
    };

    // Ajoute le pied de page à chaque page
    addFooterToPDF(doc);
    // Retourner le PDF en tant que blob
    return doc.output('blob');
};

export default generatePDF;
