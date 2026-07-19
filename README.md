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
# ejecucion del proyecto
para levantar el servidor con recarga automatica se ejecuta el comando
```bash
npm run dev
**`src/config/db.js`**
```javascript
import mongoose from "mongoose";
const connectDB = async () => {
 try {
 const conn = await mongoose.connect(process.env.MONGO_URI);
 console.log(`Mongo CONECTADO: ${conn.connection.host}`);
 } catch (error) {
 console.error(`ERROR al conectar a MongoDB: ${error.message}`);
 process.exit(1);
 }
};
export default connectDB;