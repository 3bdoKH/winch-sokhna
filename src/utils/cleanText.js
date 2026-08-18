export const cleanText = (text) => {
    if (!text) return '';
    return text
        .replaceAll('01055557235', '01143433875')
        .replaceAll('01553877630', '01143433875')
        .replaceAll('01150224066', '01143433875')
        .replaceAll('Winch Enqaz', 'ونش السخنة')
        .replaceAll('WinchEnqaz', 'ونش السخنة')
        .replaceAll('winch enqaz', 'ونش السخنة')
        .replaceAll('winchenqaz', 'ونش السخنة');
};

export const cleanPhone = cleanText;
