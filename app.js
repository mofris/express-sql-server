const express = require("express");
const mssql = require("mssql");

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  user: "sa",
  password: "saadmin",
  server: "DESKTOP-89ACCK5",
  database: "db_test",
  options: {
    encrypt: true,
    trustServerCertificate: true, // Menonaktifkan pengecekan sertifikat
  },
};

app.use(express.json());

// Route untuk mendapatkan data dari database
app.get('/api/data', async (req, res) => {
  try {
    // Buat koneksi ke SQL Server
    const pool = await mssql.connect(config);
    const result = await pool.request().query('Exec SP_Users');

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
