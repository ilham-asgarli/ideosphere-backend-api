import { Router } from 'express'

const router = Router()

router.get('/signIn', (req: any, res: any) => {
    console.log("signIn")
    res.json(
        {
            "name": "name"
        }
    );
})

export default router