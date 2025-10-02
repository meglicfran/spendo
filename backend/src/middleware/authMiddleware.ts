import { Request, Response, NextFunction } from "express";

export const auth =  (req: Request, res: Response, next: NextFunction) => {
    if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });

    next();
}

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });

    const sessionUserId = (req.session as any).user;
    if(sessionUserId !== 2){
        return res.status(401).json({
            summary: "You are not admin"
        })
    }
    next();
}