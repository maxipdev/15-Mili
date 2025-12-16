export function clock({ id, fechaObjetivo, oculta = false }) {
  const verificar = () => {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;
    const elementoAModificar = document.getElementById(id);
    // console.log(elementoAModificar);
    // console.log("esto va por id: ", id);

    if (!elementoAModificar || !id) return true; // en caso de error --> hago para que finalice

    // caso normal:
    if (!oculta) {
      // queremos que cuando sea la fecha se muestre eso
      if (distancia < 0) {
        if (elementoAModificar) elementoAModificar.style.display = "block"; // cambio la accion que quiera
        return true;
      }
    }
    // caso 2: queremos que solo se oculte:
    else if (oculta) {
      if (distancia < 0) {
        if (elementoAModificar) elementoAModificar.style.display = "none";
        return true;
      }
    }

    return false;
  };

  const yaTermino = verificar();
  if (!yaTermino) {
    const intervalo = setInterval(function () {
      const termino = verificar();
      // console.log("hallo");
      if (termino) {
        clearInterval(intervalo);
      }
    }, 5000);
  }
}
