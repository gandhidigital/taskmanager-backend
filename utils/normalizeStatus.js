function normalizeStatus(status) {
  if (!status || typeof status !== 'string') return '';

  // Elimina espacios, convierte a minúsculas, quita tildes
  const clean = status
    .normalize('NFD') // separa letras y tildes
    .replace(/[\u0300-\u036f]/g, '') // remueve tildes
    .toLowerCase()
    .replace(/\s+/g, '-'); // reemplaza espacios por guiones

  return clean;
}

module.exports = normalizeStatus;

