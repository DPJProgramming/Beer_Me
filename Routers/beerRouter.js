import express from "express";
import controller from "../controllers/beerController.js";
import multer from "multer";



const router = express.Router();
const upload = multer({ dest: 'public/img/' });

// // Configure multer for file uploads
// const upload = multer({ 
//     dest: 'public/img/',
//     fileCheck: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic'];
//         if (allowedTypes.includes(file.mimetype)) {
//             cb(null, true); 
//         } else {
//             cb(new Error('Only image files are allowed!'), false); 
//         }
//     },
    //add limits if needed
//});

router.get("/beer", controller.allBeers);
router.post("/addBeer", upload.single("image"), controller.addBeer);

export default router;