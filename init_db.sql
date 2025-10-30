-- Eliminar tablas existentes
DROP TABLE IF EXISTS favorito;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS pelicula;

-- Datos de prueba
-- Usuarios
INSERT INTO usuario (nombre, correo, fecha_registro) VALUES
('Ana García', 'ana.garcia@email.com', CURRENT_TIMESTAMP),
('Juan Pérez', 'juan.perez@email.com', CURRENT_TIMESTAMP),
('María López', 'maria.lopez@email.com', CURRENT_TIMESTAMP);

-- Películas
INSERT INTO pelicula (titulo, director, genero, duracion, año, clasificacion, sinopsis, fecha_creacion) VALUES
('Inception', 'Christopher Nolan', 'Ciencia Ficción', 148, 2010, 'PG-13', 'Un ladrón con la rara habilidad de "extracción" de datos del subconsciente durante el sueño...', CURRENT_TIMESTAMP),
('The Shawshank Redemption', 'Frank Darabont', 'Drama', 142, 1994, 'R', 'Un banquero es sentenciado a cadena perpetua en Shawshank por el asesinato de su esposa...', CURRENT_TIMESTAMP),
('The Dark Knight', 'Christopher Nolan', 'Acción', 152, 2008, 'PG-13', 'Batman se enfrenta a su mayor enemigo: el Joker...', CURRENT_TIMESTAMP),
('Pulp Fiction', 'Quentin Tarantino', 'Crimen', 154, 1994, 'R', 'Varias historias se entrelazan en el bajo mundo del crimen en Los Ángeles...', CURRENT_TIMESTAMP),
('The Matrix', 'Lana y Lilly Wachowski', 'Ciencia Ficción', 136, 1999, 'R', 'Un programador descubre que el mundo que conoce es una simulación...', CURRENT_TIMESTAMP);

-- Favoritos
INSERT INTO favorito (id_usuario, id_pelicula, fecha_marcado) VALUES
(1, 1, CURRENT_TIMESTAMP),  -- Ana - Inception
(1, 3, CURRENT_TIMESTAMP),  -- Ana - The Dark Knight
(2, 2, CURRENT_TIMESTAMP),  -- Juan - Shawshank
(2, 4, CURRENT_TIMESTAMP),  -- Juan - Pulp Fiction
(3, 5, CURRENT_TIMESTAMP),  -- María - Matrix
(3, 1, CURRENT_TIMESTAMP);  -- María - Inception
    director VARCHAR(150) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracion INTEGER NOT NULL,
    año INTEGER NOT NULL CHECK (año >= 1888 AND año <= 2100),
    clasificacion VARCHAR(10) NOT NULL,
    sinopsis VARCHAR(1000),
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para Pelicula
CREATE INDEX ix_pelicula_titulo ON pelicula (titulo);

-- Tabla Favorito (Tabla de unión)
CREATE TABLE favorito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_pelicula INTEGER NOT NULL,
    fecha_marcado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Claves Foráneas
    FOREIGN KEY (id_usuario) REFERENCES usuario (id),
    FOREIGN KEY (id_pelicula) REFERENCES pelicula (id),
    
    -- Restricción única para evitar duplicados
    CONSTRAINT unique_user_movie UNIQUE (id_usuario, id_pelicula)
);

-- Insertar Usuarios
INSERT INTO usuario (nombre, correo, fecha_registro) VALUES
('María García', 'maria.garcia@email.com', datetime('now')),
('Juan Pérez', 'juan.perez@email.com', datetime('now')),
('Ana Martínez', 'ana.martinez@email.com', datetime('now')),
('Carlos Rodríguez', 'carlos.rodriguez@email.com', datetime('now')),
('Laura Fernández', 'laura.fernandez@email.com', datetime('now'));

-- Insertar Películas
INSERT INTO pelicula (titulo, director, genero, duracion, año, clasificacion, sinopsis, fecha_creacion) VALUES
('El Padrino', 'Francis Ford Coppola', 'Drama, Crimen', 175, 1972, 'R', 'La historia de una familia mafiosa italiana y su lucha por mantener el poder en el mundo del crimen organizado.', datetime('now')),
('Inception', 'Christopher Nolan', 'Ciencia Ficción, Acción', 148, 2010, 'PG-13', 'Un ladrón que roba secretos corporativos mediante el uso de tecnología de sueños compartidos recibe la tarea inversa de plantar una idea.', datetime('now')),
('Pulp Fiction', 'Quentin Tarantino', 'Crimen, Drama', 154, 1994, 'R', 'Las vidas de dos sicarios, un boxeador, la esposa de un gánster y dos bandidos se entrelazan en cuatro historias de violencia y redención.', datetime('now')),
('Forrest Gump', 'Robert Zemeckis', 'Drama, Romance', 142, 1994, 'PG-13', 'Las décadas de vida de Forrest Gump, un hombre con buen corazón pero limitaciones intelectuales, que presencia eventos históricos importantes.', datetime('now')),
('Matrix', 'Lana Wachowski, Lilly Wachowski', 'Ciencia Ficción, Acción', 136, 1999, 'R', 'Un hacker descubre que la realidad tal como la conocemos es una simulación creada por máquinas inteligentes.', datetime('now')),
('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', 'Fantasía, Aventura', 201, 2003, 'PG-13', 'Gandalf y Aragorn lideran el mundo de los hombres contra el ejército de Sauron para distraer su atención de Frodo y Sam.', datetime('now')),
('Interestelar', 'Christopher Nolan', 'Ciencia Ficción, Drama', 169, 2014, 'PG-13', 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para asegurar la supervivencia de la humanidad.', datetime('now')),
('Parásitos', 'Bong Joon-ho', 'Drama, Thriller', 132, 2019, 'R', 'La codicia y la discriminación de clases amenazan la relación simbiótica recién formada entre la rica familia Park y el clan Kim.', datetime('now')),
('El Caballero de la Noche', 'Christopher Nolan', 'Acción, Drama', 152, 2008, 'PG-13', 'Cuando el Joker emerge para sembrar el caos en Gotham City, Batman debe aceptar una de las pruebas psicológicas y físicas más grandes.', datetime('now')),
('La La Land', 'Damien Chazelle', 'Romance, Musical', 128, 2016, 'PG-13', 'Mientras se esfuerzan por triunfar en sus carreras artísticas, un pianista de jazz y una aspirante a actriz se enamoran.', datetime('now'));

-- Insertar favoritos de ejemplo
INSERT INTO favorito (id_usuario, id_pelicula, fecha_marcado) VALUES
(1, 1, datetime('now')),
(1, 5, datetime('now')),
(2, 2, datetime('now')),
(2, 9, datetime('now')),
(3, 10, datetime('now')),
(4, 3, datetime('now')),
(4, 8, datetime('now')),
(5, 6, datetime('now')),
(5, 7, datetime('now'));

-- Verificar los datos insertados
SELECT * FROM usuario;
SELECT id, titulo, director, año, genero FROM pelicula;
SELECT f.id, u.nombre AS usuario, p.titulo AS pelicula, f.fecha_marcado
  FROM favorito f
  JOIN usuario u ON f.id_usuario = u.id
  JOIN pelicula p ON f.id_pelicula = p.id;

