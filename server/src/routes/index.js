import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import mentorSubjectsRouter from './mentorSubjects';
import mentorSkillsRouter from './mentorSkills';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw'

let router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);

router.use('/mentorSubjects', mentorSubjectsRouter);
router.use('/mentorSkills', mentorSkillsRouter);

export default router;