# Simulando el sincicio cardiaco

![](https://media3.giphy.com/media/dC9uaHvVipCYMzeSNc/giphy.gif)

Acceder al simulador [aqui](https://scacchipa.github.io/heartsimulator/index.html)

Nuestra misión es mejorar la educación médica creando herramientas informáticas que ayude a los estudiantes de la carrera de medicina y afines a mejor su capacitación. Para lo cual, poseemos una serie de aplicaciones desarrolladas y en desarrollo, entre las cuales se encuentra "el simulador del sincicio cardíaco"
El simulador de sincicio cardíaco surge de la necesidad de los docentes y alumnos de poseer una aplicación que represente de manera gráfica e interactiva las propiedades eléctricas del corazón. 


En la pantalla del simulador se observa dos sectores, una zona de representación y una panel de control. En la zona de representación se muestra el tejido cardíaco y como interactúan las células en su interior. En el panel control, se puede seleccionar las células que queremos agregar en el tejido a ser simulado como así también tenemos la posibilidad de pausar la simulación y continuarla.

Las células simuladas pueden encontrarse en uno de los siguientes tres estados: activa (amarilla), reposo (azul) e inactiva (rojo), los cuales se van a ir alternando según el estado previo, el potencial de membrana y de la propagación de cargas hacia las células adyacentes.
Cuando una célula se activa se desencadena un potencial de acción (PA) y eleva su potencial de membrana (Vm) como consecuencia de las variaciones en las permeabilidades de la membrana celular a los iones ingresando cargas eléctricas al interior de la célula. La cargas eléctricas difunden hacia las células adyances, y de esta manera, también modifica  su potencial de membrana, hasta que alcance su potencial umbral y desencadene en esta última una nueva activación celular.

Una célula activada tiene un voltaje de membrana (Vm) elevado, esto provoca que el Vm de sus vecinas se eleve hasta alcanzar su umbral, desencadenando un potencial de acción (PA). Después de ser activada la célula entrará en un periodo de inactivación, un periodo refractario, donde es incapaz de generar un nuevo PA. La célula después de un determinado tiempo vuelve a su estado de reposo, donde puede volver a ser estimulada.

La línea de células amarillas que se propaga es la ola de despolarización de los potenciales de acción, y debido a que el potencial de acción desencadena la entrada de calcio, y este genera la contracción muscular, podemos comprender a esta onda, como una onda de inicios de contracción. Esta deja un conjunto de células inactivas(rojas) y despolarizadas, donde a medida que transcurre el tiempo, su voltaje disminuye hasta volver al de reposo (azul). Esto genera otra ola, una de repolarizacion, que empieza entre las primeras células despolarizadas.

![](/hear-simulator-1/botonera.png)
Al ingresar a la pagina encontramos un tejido totalmente en reposo, para poder iniciar la simulación tenemos que agregar una célula automática. Esta desencadenará una despolarización del tejido, así como lo hace el nódulo sinusal. Para agregar la célula, seleccionamos el botón 'Auto' y luego marcamos sobre el tejido en la célula que queramos convertir en automática. También podemos agregar células rápidas usando el botón 'Fast', simulando al tejido especializado de conducción y por último podemos agregar células 'Dead', que serian tejido no excitable ó muerto.
Se recomiendo poner ‘Pause’, dibujar combinando los tres tipos de células y poner ‘Play’ para ver como evoluciona nuestro tejido.

El simulador aún se encuentra en desarrollo, queda mucho por ajustar, mejorar y agregar. Son bienvenidos los comentarios, sugerencias y la experiencia de uso. Si les resulta interesante y quieren participar de cualquier modo o aprender a programar, no duden en consultar. 
scammi@gmail.com 


