import { Router } from 'express';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw'

import authRouter from './auth';
import usersRouter from './users';
import categoriesRouter from './categories';
import subjectsRouter from './subjects';
import skillsRouter from './skills';
import mentorSubjectsRouter from './mentorSubjects';
import mentorSkillsRouter from './mentorSkills';
import availabilitiesRouter from './availabilities';

let router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/subjects', subjectsRouter);
router.use('/skills', skillsRouter);
router.use('/mentorSubjects', mentorSubjectsRouter);
router.use('/mentorSkills', mentorSkillsRouter);
router.use('/availabilities', availabilitiesRouter);

export default router;