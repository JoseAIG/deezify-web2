# DEEZIFY (deezify-web2)

Reproductor de música web basado en *Deezer* y *Spotify*.

Backend en NodeJS & Express.js, MongoDB como SGBD.

**Desarrollo Web II - Universidad Rafael Urdaneta - 2021B**

Desarrollado por: José Inciarte C.I. 27.696.083

---

## Funcionalidades de la aplicación:

- Registro de usuarios.
- Inicio de sesión y logout.
- Edición y eliminacion del perfil de un usuario.
- Comprobacion de permisologia segun tipo de usuario (usuario convencional y administradores) para acceso a ciertas vistas de la aplicacion.
- Creacion, visualizacion, edicion y eliminacion (CRUD) por parte de un administrador de:
    - Artistas (Nombre).
    - Álbumes (Nombre, Artista, Fecha de lanzamiento, Carátula).
    - Canciones (Nombre / título, Artista, Álbum, Género, Pista de audio).
- Convertir un usuario convencional ya existente en la app a tipo administrador por parte de un admin en su vista destinada para ello.
- Buscar elementos en la interfaz del usuario convencional con flexibilidad (indiferencia de mayusculas/minusculas, no tener que escribir el nombre completo del recurso/elemento a buscar) por:
    - Canciones.
    - Géneros de canciones.
    - Listas de reproducción.
    - Artistas.
    - Álbumes.
- Incremento del conteo de las reproducciones de las canciones tras 30 segundos escuchando una canción.

### Favoritos:
- Inclusión de canciones a una lista de **Favoritos** de un usuario
- Remover canciones de la lista de favoritos.
- Visualizar la lista de favoritos del usuario.
- Reproducir la lista de favoritos del usuario.
- Reproducir una canción específica que se encuentra en la lista de favoritos del usuario.

### Listas de reproducción
- Creación de listas de reproducción, visualizacion, modificacion y eliminación (CRUD) de listas de reproducción por parte de un usuario.
- Inclusion y eliminacion de canciones en una lista de reproducción.
- Reproducir listas de reproducción.
- Reproducir una cancion específica de una lista de reproducción.
- Seguir y dejar de seguir listas de reproducción de otros usuarios.

### Artistas
- Visualizar la perspectiva de artistas en la tabla de los resultados de las busquedas o en la lista de artistas seguidos.
- Seguir y dejar de seguir un artista.
- Reproducir un artista (Comenzando con el primer álbum del artista, por la primera canción y así hasta reproducir todas las canciones de este).
- Reproducir un álbum desde la perpectiva (modal) de visualización de un artista.
- Visualizar un álbum específico de un artista.
- Seguir un álbum específico de ese artista.

### Álbumes
- Visualizar la perspectiva de álbumes en la tabla de los resultados de las busquedas o en la lista de álbumes seguidos.
- Seguir y dejar de seguir un álbum.
- Reproducir un álbum.
- Reproducir una canción específica de un álbum.
- Agregar una cancion específica del álbum a favoritos.

---

## Enlaces de relevancia

- Deploy en [**Heroku**](https://deezify-web2.herokuapp.com/).
- Documentación de los Endpoints en [**Postman**](https://documenter.getpostman.com/view/15909681/Tzedi53m).
- Diseño de la aplicación (Wireframes y Modelado de datos) en [**Google Drive**](https://drive.google.com/drive/folders/1kqwhoZpjNZ1eYUK8d7-CE7Vzs8muTRm6?usp=sharing).