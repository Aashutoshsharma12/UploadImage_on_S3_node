import express,{Router} from 'express'
import uploadImages from './controllers/uploadImages';
import fileUpload from 'express-fileupload';
import router from './routes/router';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}));
app.use('/',router)

app.listen(5009,()=>{
    console.log('Server is running on 5009 port')
})