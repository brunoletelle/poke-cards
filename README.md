Hola! Bienvenidos!! 
Queria contarles un poco acerca de esta web:

Este es un minijuego desarrollado 100% en React, y se utilizo un poco de Sass para ordenar los estilos de cada pagina.

Para obtener los datos de los Pokomones se utilizó PokeAPI.

Es un juego de cartas y batallas "Pokomons". 

Al comenzar, se genera un equipo aleatorio de 3 cartas de pokomons que son adquiridos por el usuario. 

Cada jugador puede tener un numero ilimitado de cartas, que puede ir obteniendo en el Market a cambio de Coins.
Las Coins se pueden conseguir batallando a un rival aleatorio generado en el Battleground.

Pokodex:
  En la pokodex se encuentran todas las cartas adquiridas por el usuario, y es posible ordenarlas y filtrarlas.
  Tambien se puede elegir el equipo de pelea, que debe ser de 3 Pokomons.

BattleGround:
  Se buscó información acerca de formulas de ataque y defensa de los pokemones de acuerdo a distintos modificadores, 
  como Nivel, Raza, Tipo, Tipo de Ataque, Tipo de Defensa.
  Se genera un DV que varia entre 1 y 15, este valor cambia los Stats de cada Pokemon, mientras mas grande es este
  valor, mayor seran los Stats. El color de borde de cada Carta es un indicador de este DV.
  Los ataques de cada pokemon son obtenidos aleatoriamente dentro de la disponibilidad de cada uno.
  
Market:
  En el Market se pueden comprar packs de cartas aleatorias, hay distintos packs ordenados por nivel de DV.
