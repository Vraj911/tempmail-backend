const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const {protect}=require('./middleware/authMiddleware');
const dashboardRoutes=require('./routes/dashboardRoutes.js');
const authRoutes=require('./routes/authRoutes.js');
const connectDB=require('./configs/config.js');
connectDB();
const app=express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Hello from Temp Mail Backend!');
});
app.use('/api/auth',require('./routes/authRoutes.js'));
//app.use(protect);
app.use('/api/dashboard',dashboardRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}   );