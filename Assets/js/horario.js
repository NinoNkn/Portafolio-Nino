const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const grid = document.getElementById("horarioGrid");
const modal = document.getElementById("modal");

let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

function renderSemana() {
  grid.innerHTML = "";

  dias.forEach(dia => {
    const columna = document.createElement("div");
    columna.classList.add("columna-dia");
    columna.innerHTML = `<h4>${dia}</h4>`;

    eventos
      .filter(e => e.dia === dia)
      .sort((a,b) => a.hora.localeCompare(b.hora))
      .forEach(e => {
        const div = document.createElement("div");
        div.classList.add("evento");
        div.style.backgroundColor = e.color;
        div.style.color = "white";
        div.innerHTML = `<strong>${e.hora}</strong><br>${e.titulo}`;
        columna.appendChild(div);
      });

    grid.appendChild(columna);
  });
}

document.getElementById("btnAgregar").onclick = () => {
  modal.classList.remove("oculto");
};

document.getElementById("guardarEvento").onclick = () => {
  const nuevo = {
    titulo: document.getElementById("titulo").value,
    dia: document.getElementById("dia").value,
    hora: document.getElementById("hora").value,
    categoria: document.getElementById("categoria").value,
    color: document.getElementById("colorEvento").value
  };

  eventos.push(nuevo);
  localStorage.setItem("eventos", JSON.stringify(eventos));

  modal.classList.add("oculto");
  renderSemana();
};


renderSemana();
