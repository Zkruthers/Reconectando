module.exports = function () {
  var data = {
    usuario: [
      {
        id: 1,
        nombres: "Juan Leonardo",
        apellidos: "Perez Villencio",
        email: "juleonardop@gmail.com",
        contrasena: "123456",
        telefono: "987654321",
      },
      {
        id: 2,
        nombres: "Lucas Fabián",
        apellidos: "Mendiola Reammi",
        email: "lucas9912@gmail.com",
        contrasena: "654321",
        telefono: "987666321",
      },
      {
        id: 3,
        nombres: "Maximo",
        apellidos: "Paredes Loaiza",
        email: "maxap20051@gmail.com",
        contrasena: "contraseña",
        telefono: "999654321",
      },
      {
        id: 4,
        nombres: "Alonso",
        apellidos: "Rodriguez Bautista",
        email: "alrodriguez@gmail.com",
        contrasena: "666333111",
        telefono: "987654444",
      },
    ],
    comentario: [
      {
        id: 1,
        usuarioId: "usuarioId1",
        fechaPublicacion: "2013-09-10",
        descripcion:
          "La familia de Ana Garcia, una joven de 15 años, ha estado buscando incansablemente en varios lugares de Lima desde que desaparecio el pasado viernes en el distrito de Miraflores. La policia ya esta investigando el caso y pide a cualquier persona con informacion relevante que se ponga en contacto con ellos de inmediato.",
        publicacionId: "PublicaciónID1",
      },
      {
        id: 2,
        usuarioId: "usuarioId2",
        fechaPublicacion: "2010-10-10",
        descripcion:
          "Los equipos de rescate y voluntarios locales estan buscando a Juan Perez, un excursionista experimentado de 35 años que desaparecio en el camino de Salkantay en Cusco. La familia de Perez y las autoridades locales estan trabajando juntas en la bñsqueda, pero las condiciones climaticas han dificultado las operaciones.",
        publicacionId: "PublicaciónID2",
      },
      {
        id: 3,
        usuarioId: "usuarioId3",
        fechaPublicacion: "2022-06-05",
        descripcion:
          "La familia de Emma Johnson, una turista britñnica de 28 años, esta angustiada por su paradero despues de que desaparecio en el Valle Sagrado de los Incas en Cusco hace una semana. Las autoridades peruanas estñn explorando todas las posibilidades, pero aun no tienen pistas sobre su desaparicion.",
        publicacionId: "PublicaciónID3",
      },
      {
        id: 4,
        usuarioId: "usuarioId4",
        fechaPublicacion: "2021-09-10",
        descripcion:
          "La comunidad local y los equipos de busqueda en Arequipa estan trabajando juntos para encontrar a Daniel Gonzñlez, un niño de 8 años que desaparecio hace dos dias. La familia de Gonzalez y las autoridades estan desplegando recursos para encontrar al niño, y están pidiendo la ayuda de cualquier persona que tenga informacion relevante.",
        publicacionId: "PublicaciónID4",
      },
    ],
  };
  return data;
};
