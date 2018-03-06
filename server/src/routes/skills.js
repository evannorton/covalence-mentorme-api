import { Router } from 'express';
import Table from '../table';

let router = Router();
let users = new Table('Skills');

export default router;