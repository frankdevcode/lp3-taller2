-- Datos de ejemplo para la aplicación de películas

-- Usuarios de ejemplo
INSERT INTO usuario (correo, contraseña_hash) VALUES
('admin@cinelab.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5EQaYx5h9.0Ci'),
('usuario1@cinelab.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5EQaYx5h9.0Ci'),
('usuario2@cinelab.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5EQaYx5h9.0Ci');

-- Películas de ejemplo
INSERT INTO pelicula (titulo, director, genero, año, duracion, clasificacion, sinopsis) VALUES
('El Padrino', 'Francis Ford Coppola', 'Drama', 1972, 175, 'R', 'La historia de la familia mafiosa más poderosa de Nueva York.'),
('Inception', 'Christopher Nolan', 'Ciencia Ficción', 2010, 148, 'PG-13', 'Un ladrón que roba secretos corporativos a través de la tecnología de sueños compartidos.'),
('Forrest Gump', 'Robert Zemeckis', 'Drama', 1994, 142, 'PG', 'La vida de Forrest Gump, un hombre con un bajo coeficiente intelectual que logra cosas extraordinarias.'),
('Interstellar', 'Christopher Nolan', 'Ciencia Ficción', 2014, 169, 'PG-13', 'Un equipo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.'),
('Avatar', 'James Cameron', 'Ciencia Ficción', 2009, 162, 'PG-13', 'Un soldado paralítico es enviado a un planeta alienígena con un cuerpo avatar.'),
('Titanic', 'James Cameron', 'Romance', 1997, 194, 'PG-13', 'La historia del romance entre dos pasajeros de diferentes clases sociales en el Titanic.'),
('Pulp Fiction', 'Quentin Tarantino', 'Crimen', 1994, 154, 'R', 'Historias entrelazadas de criminales, gansters, boxeadores y sus esposas.'),
('Gladiador', 'Ridley Scott', 'Acción', 2000, 155, 'R', 'Un general romano falsamente acusado es vendido como esclavo y se convierte en gladiador.'),
('Matrix', 'The Wachowskis', 'Ciencia Ficción', 1999, 136, 'R', 'Un hacker descubre que su realidad es una simulación creada por máquinas inteligentes.'),
('Toy Story', 'John Lasseter', 'Animación', 1995, 81, 'G', 'Los juguetes cobran vida cuando no hay humanos cerca y deben rescindir sus diferencias.'),
('El Señor de los Anillos: La Comunidad del Anillo', 'Peter Jackson', 'Fantasía', 2001, 178, 'PG-13', 'Un hobbit debe destruir un anillo mágico malévolo en una épica aventura.'),
('Jurassic Park', 'Steven Spielberg', 'Aventura', 1993, 127, 'PG-13', 'Un parque temático de dinosaurios clonados sale de control.'),
('The Dark Knight', 'Christopher Nolan', 'Acción', 2008, 152, 'PG-13', 'Batman enfrenta el Joker, un criminal psicópata que quiere crear caos en Gotham.'),
('Atrápame si puedes', 'Steven Spielberg', 'Thriller', 2002, 141, 'PG-13', 'Un agente del FBI persigue a un estafador de cheques.'),
('Piratas del Caribe: La Maldición de la Perla Negra', 'Gore Verbinski', 'Aventura', 2003, 143, 'PG-13', 'Un pirata excéntrico se ve envuelto en una aventura de tesoros y maldiciones.'),
('El Gran Gatsby', 'Baz Luhrmann', 'Romance', 2013, 143, 'PG-13', 'La historia del misterioso millonario Jay Gatsby y su obsesión por su antiguo amor.');

-- Favoritos de ejemplo
INSERT INTO favorito (id_usuario, id_pelicula) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 6),
(3, 7);
