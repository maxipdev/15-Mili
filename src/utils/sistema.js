export function reloj({ fechaObjetivo, funcion }) {
  const verificar = () => {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    if (distancia < 0) {
      if (funcion) {
        funcion();
        return true; // Para matar el intervalo
      }
    }
    return false; // lo dejo vivo
  };

  const yaTermino = verificar();
  if (!yaTermino) {
    const intervalo = setInterval(function () {
      const termino = verificar();
      if (termino) {
        clearInterval(intervalo);
      }
    }, 5000);
  }
}
