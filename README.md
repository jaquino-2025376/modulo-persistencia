# Módulo de Persistencia con JSON y `fs/promises`

## Descripción

Este proyecto implementa un módulo de persistencia desarrollado en **TypeScript** utilizando **Node.js** y el módulo **fs/promises**. Su objetivo es almacenar y recuperar información de productos y clientes mediante archivos JSON, separando la lógica de persistencia del resto de la aplicación.

El módulo realiza operaciones de lectura y escritura de manera asíncrona, validando la información antes de guardarla y manejando errores comunes mediante bloques `try/catch`, garantizando la integridad de los datos.

---

# Objetivos

* Implementar un módulo de persistencia independiente.
* Guardar registros de productos y clientes en archivos JSON.
* Leer y reconstruir la información almacenada.
* Validar los datos antes de escribirlos.
* Manejar errores durante las operaciones de lectura y escritura.
* Mantener una estructura clara y organizada del proyecto.

---

# Archivos JSON Utilizados

El proyecto utiliza dos archivos para almacenar la información:

## productos.json

Contiene un arreglo de objetos con la información de los productos.

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Laptop",
    "precio": 6500,
    "stock": 15
  }
]
```

## clientes.json

Contiene un arreglo de objetos con la información de los clientes.

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@email.com"
  }
]
```

---

# Funcionamiento del Módulo de Persistencia

El módulo de persistencia tiene la responsabilidad exclusiva de interactuar con los archivos JSON.

Sus funciones principales son:

* Leer productos.
* Guardar productos.
* Leer clientes.
* Guardar clientes.

Las operaciones utilizan `fs/promises`, por lo que todas se ejecutan de forma asíncrona mediante `async/await`.

---

# Validaciones

Antes de guardar la información se verifica que:

* Existan todos los campos obligatorios.
* Los tipos de datos sean correctos.
* Los valores requeridos no estén vacíos.
* Los valores numéricos sean válidos.
* No se almacenen registros incompletos.

Si alguna validación falla, el registro no se escribe en el archivo.

---

# Manejo de Errores

Todas las operaciones de lectura y escritura se encuentran protegidas mediante bloques `try/catch`.

Los errores manejados incluyen:

## Archivo inexistente

Si el archivo no existe, el módulo evita que la aplicación se detenga y muestra un mensaje indicando el problema.

## JSON corrupto

Si el contenido del archivo no tiene formato JSON válido, el error es capturado y se informa al usuario.

## Errores de permisos

Si el sistema no tiene permisos para leer o escribir el archivo, el error es capturado y notificado.

## Errores de escritura

Cualquier fallo durante el almacenamiento de datos es controlado para evitar la pérdida de información.

## Datos inválidos

Si un registro no cumple las validaciones establecidas, no se guarda y se informa el motivo.

---

# Escenarios de Prueba

Durante el desarrollo se realizaron las siguientes pruebas:

### Escritura de datos válidos

Resultado esperado:

* Los registros se almacenan correctamente en el archivo JSON.

---

### Lectura de datos

Resultado esperado:

* Los datos se recuperan correctamente y se convierten nuevamente en arreglos de objetos.

---

### Archivo inexistente

Resultado esperado:

* Se captura el error sin detener la ejecución del programa.

---

### Archivo JSON corrupto

Resultado esperado:

* Se detecta el error durante el parseo y se muestra un mensaje claro.

---

### Datos inválidos

Resultado esperado:

* El registro no se almacena hasta cumplir con las validaciones.

---

### Error de permisos

Resultado esperado:

* El sistema captura la excepción y notifica el problema.

---

# Tecnologías Utilizadas

* TypeScript
* Node.js
* fs/promises
* JSON

---

# Conclusión

El módulo de persistencia desarrollado permite almacenar y recuperar información de productos y clientes de manera segura utilizando archivos JSON.

La implementación hace uso de operaciones asíncronas con `fs/promises`, validaciones de datos y manejo de excepciones mediante `try/catch`, proporcionando una solución organizada, robusta y fácil de mantener.
