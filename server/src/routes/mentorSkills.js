import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSkills = new Table('mentorSkills');

export default router;