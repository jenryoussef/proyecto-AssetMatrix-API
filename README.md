# AssetMatrix API

API RESTful para gestionar y analizar activos financieros, hecha con Node.js, Express
y MongoDB.

## lo que se necesita:

- **Node.js**: Versión 20 o superior.
- **Git**

## Instalacion y Configuracion

1. **Clonar el repositorio:**
   git clone https://github.com/jenryoussef/proyecto-AssetMatrix-API.git

# instalar las dependencias

npm install

# Variables de entorno

se debe crear un archivo llamado .env en la raiz del proyecto y hay que agregar las
siguientes variables
(se tiene que colocar una URI validad de MONGO ATLAS)
PORT=3000
MONGO_URI=tu_cadena_de_conexion_mongodb_aqui

# pruebas unitarias (TDD)

El proyecto cuenta con una suite de pruebas automatizadas usando Jest y Supertest.
Para ejecutar las validaciones de los endpoints y modelos
se usa el comando:

```bash
npm test
```

# ejecucion del proyecto

para levantar el servidor con recarga automatica se ejecuta el comando

```bash
npm run dev
```

ALPHA_VANTAGE_API_KEY=demo
La API key "demo" funciona para consultas basicas de prueba con el simbolo "IBM"
en Alpha Vantage

Una vez que la consola indique que el servidor y MongoDB estan conectados, la
Documentacion Interactiva (Swagger) estara disponible en
http://localhost:3000/api-docs