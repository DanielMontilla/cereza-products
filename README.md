## Español (ES)
### Ambiente de Desarrollo
- Clona o haz pull al repositorio `clone https://github.com/DanielMontilla/cereza-products`
- Usa `npm install`
- Descarga la aplicación Expo en la tienda de [Google play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US) o en el [app store](https://apps.apple.com/us/app/expo-go/id982107779)
- Usa `npx expo` y espera a que se muestre el código QR
- Escanea el código QR de la terminal

### Conclusiones
Dado que no había trabajado con React Native durante casi cinco años, mis primeros pasos consistieron en reacostumbrarme con el flujo de trabajo de desarrollo y los componentes fundamentales. Al mismo tiempo, comencé a buscar bibliotecas que me permitieran cumplir ciertos requisitos técnicos. Me familiaricé con [react-native-snap-carousel](https://github.com/meliorence/react-native-snap-carousel), que utilicé para el carrusel de imágenes de mi producto, y [react-native-swipe-list-view](https://github.com/jemise111/react-native-swipe-list-view) para habilitar acciones de deslizamiento en los elementos de la lista. Aunque no incorporé este último debido a limitaciones de tiempo, estaba en mis planes hacerlo. Además, aprendí sobre [react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) para acceder al almacenamiento local del dispositivo, además de la variedad de bibliotecas proporcionadas por Expo, como el enrutamiento.

Adopté un diseño arquitectónico directo: cargar todos los elementos en mi componente de diseño base y emplear ContextAPI para proporcionar los datos reactivos necesarios y los métodos reductores en toda la aplicación. Desafortunadamente, esto condujo a problemas de rendimiento debido a la representación innecesaria de componentes. En consecuencia, cambié a un enfoque más estratégico, aprovechando [zustand](https://github.com/pmndrs/zustand), una solución simple de gestión de estado similar a las que se encuentran en marcos como Svelte y Vue.

En el componente de diseño principal, me suscribí a los cambios de cada tienda (favoritos, tema, etc.) y actualicé el almacenamiento local con valores nuevos. Al recuperar y subir datos desde el almacenamiento local (o la API proporcionada), utilicé [zod](https://github.com/colinhacks/zod) para validar los datos contra un esquema predefinido.

También creé varios unit-tests rudimentarios para algunas de las funciones de utilidad que uso.

## English (EN)
### Development environment
- Clone or pull the repo `clone https://github.com/DanielMontilla/cereza-products`
- use `npm install`
- Download the Expo app on the [play store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US) or [app store](https://apps.apple.com/us/app/expo-go/id982107779)
- use `npx expo` and wait for QR code to show
- scan QR code on terminal

### Conclusions
Given that I had not engaged with React Native for close to five years, my initial steps involved re-acquainting myself with the development workflow and foundational components. Concurrently, I started searching for libraries that would allow me to meet certain technical requirements. I became conversant with [react-native-snap-carousel](https://github.com/meliorence/react-native-snap-carousel), which I utilized for the image carousel of my product, and [react-native-swipe-list-view](https://github.com/jemise111/react-native-swipe-list-view) to enable swipe actions on list items. Though I didn't incorporate the latter due to time constraints, it was in my plans to do so. Moreover, I learned about [react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) for device local storage access, in addition to the assortment of libraries provided by Expo, such as routing.

I adopted a straightforward architectural design: loading all elements on my base layout component and employing the ContextAPI to supply the necessary reactive data and reducer methods throughout the app. Unfortunately, this led to performance issues due to extraneous component rendering. Consequently, I shifted to a more strategic approach, leveraging [zustand](https://github.com/pmndrs/zustand), a simple state management solution akin to the ones found in frameworks such as Svelte and Vue.

In the main layout component, I subscribed to changes for each store (favorites, theme, etc.) and updated local storage with fresh values. While retrieving and uploading data from local storage (or the provided API), I utilized [zod](https://github.com/colinhacks/zod) to validate the data against a predefined schema.

I also created some rudimentary tests for some of the utility functions I use.