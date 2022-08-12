import { consumeRowDataPacket } from '../Services/consumeRowDataPacket.js';
import getCurrentDate from '../Services/getCurrentDate.js';
import validator from 'email-validator'
import * as userController from '../Queries/userQueries.js'
import * as signUpQueries from '../Queries/AuthQueries/signUpQueries.js'

async function signUp(req: any, res: any) {
  let targetEmail = req.body.email;
  let isEmailTaken: boolean = true;
  let isUsernameAndDiscComboTaken: boolean = true;
  let isEmailTakenPacket: any;
  let isUsernameAndDiscComboTakenPacket: any;

  if (validator.validate(targetEmail) === false) {
    return res.status(500).send({ message: 'Please enter a valid email...' });
  }

  try {
    isEmailTakenPacket = await signUpQueries.isEmailTaken(targetEmail).catch();
    isEmailTaken = consumeRowDataPacket(isEmailTakenPacket);
    isUsernameAndDiscComboTakenPacket = await signUpQueries
      .isUsernameAndDiscComboTaken(req.body.username, req.body.discriminator)
      .catch();
    isUsernameAndDiscComboTaken = consumeRowDataPacket(
      isUsernameAndDiscComboTakenPacket
    );
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check information...' });
  }
  if (isEmailTaken) {
    return res.status(400).send({ message: 'That email is already in use...' });
  } else if (isUsernameAndDiscComboTaken) {
    return res
      .status(400)
      .send({
        message:
          'That username and discriminator combination is already taken...',
      });
  } else {
    try {
      let date = getCurrentDate();
      await userController
        .addUser(
          req.body.username,
          req.body.discriminator,
          req.body.password,
          req.body.email,
          date,
          req.body.bio,
          '0'
        )
        .catch();
      return res.status(200).send({ message: 'Server added new user' });
    } catch (e) {
      return res.status(500).send({ message: 'Server couldnt sign you up...' });
    }
  }
}

export {
  signUp
};
