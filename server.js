// import  express  from "express"
// import dotenv from 'dotenv'
// import morgan from "morgan"
// import { prisma } from './app/prisma.js'
// import productRoutes from './app/product/product.routes.js'
// import cors from 'cors'
// import path from "path"
// import multer from "multer"

// dotenv.config()
// const app = express()

// const PORT = process.env.PORT || 3002
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// async function main() {
//     if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
//     // app.use(cors({ origin: ['http://www.amzngoods.com', 'http://localhost:3000'], methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     // credentials: true, }));
//     app.use((req, res, next) => {
//       const allowedOrigins = ['https://amzngoods.com', 'https://inspiring-narwhal-9e39bd.netlify.app'];
//       const origin = req.headers.origin;
  
//       if (allowedOrigins.includes(origin)) {
//           res.setHeader('Access-Control-Allow-Origin', origin);
//       }
  
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//       res.setHeader('Access-Control-Allow-Credentials', true);
  
//       next();
//   });
//     app.use(express.json())

//     const __dirname = path.resolve()
//     app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

//     const upload = multer({storage: storage})
//     app.post('/uploads', upload.single('img'), (req, res) => {
//       res.json({filename: req.file.filename})
//     })
//     app.use('/api/products', productRoutes)

//     app.listen(
//         PORT, 
//         console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`)
//     )
// } 

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async e => {
//     console.log(e);
//     await prisma.$disconnect()
//     process.exit(1)
//   })


import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import { prisma } from './app/prisma.js';
import productRoutes from './app/product/product.routes.js';
import path from "path";
import multer from "multer";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3002;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

app.use(cors({
  origin: ['https://amzngoods.com', 'https://inspiring-narwhal-9e39bd.netlify.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

const upload = multer({ storage: storage });
app.post('/uploads', upload.single('img'), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.use('/api/products', productRoutes);

app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`)
);
