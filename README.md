<h1 align="center">Administrador de tareas</h1>

  <h3 align="center">
    Un administrador de tareas sencillo realizado con react, nodejs y postgres, en el cual podremos crear, editar y eliminar tareas.
    <p>
    <br />

![Imagen del producto][product-screenshot]

<h3 align="center">
        El proyecto consta de 3 carpetas, en las cuales tenemos el frontend realizado con react, tenemos ademas una carpeta con el backend realizado con node y por ultimo tenemos la carpeta de la base de datos, la cual contiene el script base para crear la base de datos y cargarla con la informacion, se realizo con postgres.
        <br />

### Prerequisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalacion del proyecto

1. Clone el repositorio
   ```sh
   git clone https://github.com/Iskullgra09/PruebaTecnicaNCQ.git
   ```

### Instalacion Nodejs

1. Nos movemos a la carpeta respectiva 
   ```sh
   cd backend
   ```
2. Instale los paquetes NPM 
   ```sh
   npm install
   ```
3. Agregue la informacion de la bd en `connectionPG/config.js`
   ```js
   const pool = new Pool({
    host: 'localhost',
    port: 'port',
    database: 'database',
    user: 'user',
    password: 'password'
    })
   ```
4. Ejecute 
   ```sh
   npm run dev
   ```

### Instalacion React

1. Nos movemos a la carpeta respectiva 
   ```sh
   cd task-manager
   ```
2. Instale los paquetes NPM 
   ```sh
   npm install
   ```
3. Ejecute 
   ```sh
   npm run dev
   ```

### Objeto json en la respuesta de la api

<h4>
    La respuesta de la api consta de 3 apartados, succes, data y error. En success siempre vamos a retornar un boolean dependiendo del exito de la llamada con esto nos aseguramos que el frontend sepa si todo salio bien. En la opcion data vamos a recibir la data de la bd, esta es una lista con los filas retornadas por el query. Por ultimo tenemos el apartado error en el cual vamos a almacenar los error que se ejecuten en los catch y los pasaremos al frontend para visualizar que es lo que ocurre.
    <p>
    <br />

```js
{
    success : boolean, 
    data : [], 
    error : error
}
```

[product-screenshot]: images/screenshot.jpg