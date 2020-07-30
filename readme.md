# Simulando el sincicio cardiaco

![](https://media3.giphy.com/media/dC9uaHvVipCYMzeSNc/giphy.gif)

Acceder al simulador [aqui](https://scacchipa.github.io/heartsimulator/index.html)

En un intento de darle vida a la fisiología que encontramos en los libros, presentamos junto a Pablo Scacci un simulador interactivo del tejido cardiaco. Por razones obvias (covid-19) es necesario modernizar la curricula universitaria, esto es parte de dicho proceso. El objetivo es extender las limitaciones actuales con una herramienta dinámica, que puede ser usada para entender la propagación eléctrica del sincitio cardiaco. Como también simular posibles patologías del mismo, siendo estas el infarto, los trastornos de conducción y las arritmias.

El simulador consta de 100 células en dos dimensiones, imagine que se toma una biopsia de tejido cardiaco, y se la mira desde arriba, como a traves de un microscopio. Las células interactúan entre ellas, donde cada una pueda estar en uno de tres estados, activa (amarilla), reposo (azul) e inactiva (rojo). El estado de cada célula depende del voltaje de la misma y este voltaje a su vez, depende de la carga de las células que le son vecinas.
Una célula activada tiene un voltaje de membrana (Vm) elevado, esto provoca que el Vm de sus vecinas se eleve hasta alcanzar su umbral, desencadenando  un potencial de acción (PA). Después de ser activada la célula entrará en un periodo de inactivación, un periodo refractario, donde es incapaz de generar un nuevo PA. La célula después de un determinado tiempo vuelve a su estado de reposo, donde puede volver a ser estimulada.

La línea de células amarillas que se propaga es la ola de despolarización, y debido a que el potencial de acción desencadena la entrada de calcio, y este genera la contracción muscular, podemos ver, a esta ola, como una ola de contracción. Esta ola deja atrás un conjunto de células inactivas(rojas), donde a medida que transcurre el tiempo, su voltaje disminuye hasta volver al de reposo, permitiendo que la célula entre en periodo de reposo (azul). Esto genera otra ola, una de repolarizacion, que empieza entre las primeras células despolarizadas.

![](/hear-simulator-1/botonera.png)
Al ingresar a la pagina encontramos un tejido totalmente en reposo, para poder iniciar la simulación tenemos que agregar una célula automática. Esta desencadenará la contracción del tejido, así como lo hace el nódulo sinusal. Para agregar la célula, hacemos click en 'Auto' y luego sobre la célula que queramos transformar en automática. También podemos agregar células rápidas usando el botón 'Fast', simulando al tejido especializado de conducción y por último podemos agregar células 'Dead', que serian tejido infartado. Recomiendo poner pausar, dibujar combinando los tres tipos de células y poner play para ver como evoluciona nuestro tejido.

El simulador aún se encuentra en desarrollo, queda mucho por ajustar, mejorar y agregar. Son bienvenidas las criticas, sugerencias y la experiencia de uso. Si les resulta interesante y quieren participar de cualquier modo o aprender a programar, no duden en consultar. 
  
  scammi@gmail.com 


