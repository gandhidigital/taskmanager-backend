require('dotenv').config();
console.log("URI cargado:", process.env.MONGO_URI);

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Conexión a MongoDB Atlas exitosa");
  process.exit();
})
.catch(err => {
  console.error("❌ Error al conectar a MongoDB:", err.message);
  process.exit(1);
});
