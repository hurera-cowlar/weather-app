const { loginService, signupService } = require('../services/auth');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { generateJWT } = require('../utils/jwt');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user by providing email and password.
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2EzNGIxYzY1NGY0Nzc2NTAwMjc4OCIsImlhdCI6MTcwODMzNTEyOSwiZXhwIjoxNzA4MzM1NzI5fQ.ohVbz7BF4KTpgN4vXOGha00vkb3-jv1o_MBE7HrlzTE
 *             example:
 *               message: success
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2EzNGIxYzY1NGY0Nzc2NTAwMjc4OCIsImlhdCI6MTcwODMzNTEyOSwiZXhwIjoxNzA4MzM1NzI5fQ.ohVbz7BF4KTpgN4vXOGha00vkb3-jv1o_MBE7HrlzTE
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Please provide email and password
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Wrong credentials
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email)
    return next(new AppError('Please provide email and password', 400));

  const user = await loginService(password, email);

  if (user && (await user.matchPassword(password, user?.password))) {
    console.log('Password is correct');

    const jwt = generateJWT(user._id);

    return res.status(200).json({
      message: 'success',
      token: jwt,
    });
  }

  res.status(401).json({
    status: 'fail',
    message: 'Wrong credentials',
  });
});

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user by providing email, password, name, and phone number.
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User details for signup
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               minLength: 8
 *             name:
 *               type: string
 *             phoneNumber:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDMzNmFiMWNkNWI4ZTQyYzBiMzVhNCIsImlhdCI6MTcwODM0MDkwOCwiZXhwIjoxNzA4MzQxNTA4fQ.n3vniuIjqneMeZw6rtBOc-07qPxcgfvELIqVown4XU0
 *             example:
 *               message: success
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDMzNmFiMWNkNWI4ZTQyYzBiMzVhNCIsImlhdCI6MTcwODM0MDkwOCwiZXhwIjoxNzA4MzQxNTA4fQ.n3vniuIjqneMeZw6rtBOc-07qPxcgfvELIqVown4XU0
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Please provide all the fields
 *       '409':
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: User with provided email already exists
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */


exports.signup = catchAsync(async (req, res, next) => {
  const { password, email, phoneNumber, name } = req.body;

  if (!password || !email || !phoneNumber || !name)
    return next(new AppError('Please provide all the fields', 400));

  const user = await signupService(password, email, phoneNumber, name);

  if (user) {
    const jwt = generateJWT(user._id);
    return res.status(200).json({
      message: 'success',
      token: jwt,
    });
  }

  res.status(500).json({
    status: 'fail',
    message: 'there was an error',
  });
});
