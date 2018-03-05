import { Router } from 'express';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw'

import authRouter from './auth';
import usersRouter from './users';
import mentorSubjectsRouter from './mentorSubjects';
import mentorSkillsRouter from './mentorSkills';
import imagesRouter from './images';

let router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);

router.use('/mentorSubjects', mentorSubjectsRouter);
router.use('/mentorSkills', mentorSkillsRouter);
router.use('/images', imagesRouter);

export default router;