import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import paystackApi, { InitializePaymentArgs } from '../api/paystackApi';
import { Payment } from '../models/Payment';
import { BadRequestError } from '../utils/ApiError';
import { asyncWrapper } from '../utils/AsyncWrapper';

class PaystackController {
  initializePayment = asyncWrapper(async (req: Request, res: Response) => {
    const { amount, email, callbackUrl, name } = req.body;

    const paymentDetails: InitializePaymentArgs = {
      amount,
      email,
      callback_url: callbackUrl,
      metadata: {
        amount,
        email,
        name,
      },
    };

    const data = await paystackApi.initializePayment(paymentDetails);

    return res.status(StatusCodes.OK).send({
      message: 'Payment initialized successfully',
      data,
    });
  });

  verifyPayment = asyncWrapper(async (req: Request, res: Response) => {
    const reference = req.query.reference;

    if (!reference) {
      throw new BadRequestError('Missing transaction reference');
    }

    const {
      data: {
        metadata: { email, amount, name },
        reference: paymentReference,
        status: transactionStatus,
      },
    } = await paystackApi.verifyPayment(reference as string);

    if (transactionStatus !== 'success') {
      throw new BadRequestError(`Transaction: ${transactionStatus}`);
    }

    const [paymentRecord] = await Payment.findOrCreate({
      where: { paymentReference },
      defaults: { amount, email, name, paymentReference },
    });

    return res.status(StatusCodes.OK).send({
      message: 'Payment verified',
      data: paymentRecord,
    });
  });
}

const paystackController = new PaystackController();

export default paystackController;
