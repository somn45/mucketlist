import express from 'express';

export const setCookie = (req: express.Request, res: express.Response) => {
  const accessToken: string = req.body.accessToken;
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  res.sendStatus(200);
};
export const sendCookie = (req: express.Request, res: express.Response) => {
  res.status(200).json({
    accessToken: req.cookies.accessToken,
  });
};
