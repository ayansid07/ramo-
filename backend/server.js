const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 3001;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Specifying database
  dbName: 'devdb',
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// User login database
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true,},
  lastName: {type: String,required: true,},
  businessName: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  branch: {type: String,required: true,},
  countryCode: {type: String,required: true,},
  mobile: {type: String,required: true,},
  password: {type: String,required: true,},
  gender: {type: String,required: true,},
  city: {type: String,required: true,},
  state: {type: String,required: true,},
  zipCode: {type: String,required: true,},
  address: {type: String,required: true,},
  creditSource: {type: String,required: true,},
  role: {type: String,required: true,},
},{collection: 'userdata'});

const branchesSchema = new mongoose.Schema({
  branchName: {type:String,required:true,unique:true},
  contactemail: {type:String,required:true,unique:true},
  contactphone: {type: Number,required:true,unique:true},
  branchaddress: {type: String,required:true},
},{collection: 'branches'})

const memberSchema = new mongoose.Schema({
  memberNo : {type:Number,required:true,unique:true},
  firstName: {type:String,required:true},
  lastName: {type:String,required:true},
  email: {type:String,required:true,unique:true},
  branchName: {type:String,requires:true},
},{collection:'members'})

const loanSchema = new mongoose.Schema({
  loanId: { type: String, required: true, unique: true },
  loanProduct: { type: String, required: true },
  borrower: { type: String, required: true },
  memberNo: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  appliedAmount: { type: Number, required: true },
  status: { type: String, required: true },
},{collection: 'loans'});

const RepaymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId,ref: 'loansModel',required: true ,unique: true},
  paymentDate: { type: Date,required: true},
  dueDate: {type: Date,required: true},
  principalAmount: {type: Number,required: true},
  interest: {type: Number,required: true},
  latePenalties: {type: Number,required: true},
  totalAmount: {type:Number,required:true},
},{collection:'repayments'});

const AccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  member: { type: String, required: true },
  accountType: { type: String, required: true },
  status: { type: String, required: true },
  openingBalance: { type: Number, required: true }
},{collection:'accounts'});

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  member: { type: String, required: true },
  accountNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  debitOrCredit: { type: String, enum: ['Debit', 'Credit'], required: true },
  status: { type: String, required: true },
  description: { type: String, required: true }
},{collection:'transactions'});

const userModel = mongoose.model('userdata', userSchema);
const branchesModel = mongoose.model('branches',branchesSchema);
const memberModel = mongoose.model('members',memberSchema);
const loansModel = mongoose.model('loans',loanSchema);
const repaymentModel= mongoose.model('repayments',RepaymentSchema);
const AccountModel = mongoose.model('accounts',AccountSchema);
const TransactionsModel = mongoose.model('transactions',TransactionSchema);

app.use(bodyParser.json());
app.use(cors());

// Set security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// Implement rate limiting (example using 'express-rate-limit' middleware)
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

// Create Function for User
app.post('/create', limiter, async (req, res) => {
    const {
      firstName,lastName,businessName,email,branch,countryCode,mobile,password,gender,city,state,zipCode,address,creditSource,
    } = req.body;

    let role = 'user';
    const userEmailDomain = email.split('@')[1]; // Extract domain from email
    console.log('User email domain:', userEmailDomain); // Check the extracted domain
    if (userEmailDomain === 'yourcompany.com') {
        role = 'admin'; // Assign admin role for specific email domain
        console.log('User role:', role); // Check the role being assigned
    }

    try {
      const newUser = new userModel({firstName,lastName,businessName,email,branch,countryCode,mobile,password,gender,city,state,zipCode,address,creditSource,role,
      });
  
      await newUser.save();
  
      res.status(200).json({ message: 'User data saved to MongoDB', data: newUser });
    } catch (error) {
      console.error('Error saving user data:', error);
      res.status(500).json({ message: 'Error saving user data' });
    }
  });
  
app.post('/login', limiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Admin Franchise agent User
    // This is not secure - comparing passwords in plaintext
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    
    // If the passwords match, create a JWT
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.firstName,
      // Add other necessary user information to the payload
    };

    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }); // Set your own secret key and expiration time

    res.json({ message: 'Login Success!' ,token});

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/verify-token', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  // Verify the token
  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Token is valid
    // You might perform additional checks or operations based on the decoded token data

    res.status(200).json({ message: 'Token is valid' });
  });
});

// Read Function
app.get('/read', limiter ,async(req,res)=> {
  try {
      // Fetch Data From Collection
      const data = await userModel.find();
      res.json(data);
  } catch (error) {
      console.error('Error fetching data:', error); // Log error for debugging
      res.status(500).json({message: 'Failed to fetch data'});
  }
});

// Assuming you have already set up your app and UserModel as described above

app.put('/update/:id', limiter , async (req, res) => {
const { id } = req.params;
const { firstName, lastName, email, password, role, security } = req.body;

try {
  const filter = { _id: id }; // Filter to find the user by id
  const update = { firstName, lastName, email, password, role, security }; // Creates a new updated object

  const updatedUser = await userModel.findOneAndUpdate(
    filter,
    update,
    { new: true } // Returns the updated document
  );

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User data updated', data: updatedUser });
} catch (error) {
  console.error('Error updating user data:', error);
  res.status(500).json({ message: 'Error updating user data' });
}
});

app.post('/delete/:id', limiter, async (req, res) => {
const { id } = req.params;
try {
  const deletedUser = await userModel.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
} catch (error) {
  console.error('Error deleting user:', error);
  res.status(500).json({ message: 'Error deleting user' });
}
});

// Endpoint to handle the incoming POST request with the token
app.post('/usernamedata', (req, res) => {
  const { token } = req.body;
  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    // Verify and decode the token to extract the username
    const decoded = jwt.verify(token, 'yourSecretKey');

    // Extract the username from the decoded token payload
    const { username } = decoded;

    // Send the decoded username back to the client
    res.json({ username });
  } catch (err) {
    // Handle token verification or decoding errors
    console.error('Token verification error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Create Function for Account
app.post('/createbranch', limiter, async (req, res) => {
  const {
    branchName,contactemail,contactphone,branchaddress
  } = req.body;

  try {
    const newUser = new branchesModel({branchName,contactemail,contactphone,branchaddress});

    await newUser.save();

    res.status(200).json({ message: 'User data saved to MongoDB', data: newUser });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Error saving user data' });
  }
});

app.put('/updatebranch/:id', limiter, async (req, res) => {
  const branchId = req.params.id;
  const { branchName, contactemail, contactphone, branchaddress } = req.body;

  try {
    const updatedBranch = await branchesModel.findByIdAndUpdate(
      branchId,
      { branchName, contactemail, contactphone, branchaddress },
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch updated successfully', data: updatedBranch });
  } catch (error) {
    console.error('Error updating branch:', error);
    res.status(500).json({ message: 'Error updating branch' });
  }
});

app.post('/deletebranch/:id', limiter, async (req, res) => {
  const branchId = req.params.id;
  try {
    const deletedBranch = await branchesModel.findByIdAndDelete(branchId);

    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch deleted successfully', data: deletedBranch });
  } catch (error) {
    console.error('Error deleting branch:', error);
    res.status(500).json({ message: 'Error deleting branch' });
  }
});

app.get('/readbranch', limiter, async (req, res) => {
  try {
    const allBranches = await branchesModel.find();

    res.status(200).json({ message: 'All branches retrieved successfully', data: allBranches });
  } catch (error) {
    console.error('Error retrieving branches:', error);
    res.status(500).json({ message: 'Error retrieving branches' });
  }
});

// GET branch by ID
app.get('/getbranch/:id', async (req, res) => {
  const branchId = req.params.id;

  try {
    // Find the branch by ID in your MongoDB database using Mongoose
    const branch = await branchesModel.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // If the branch is found, send it as a response
    res.status(200).json(branch);
  } catch (error) {
    console.error('Error retrieving branch:', error);
    res.status(500).json({ message: 'Error retrieving branch' });
  }
});

// Define an endpoint to fetch branch names
app.get('/branches/names', limiter, async (req, res) => {
  try {
    const allBranches = await branchesModel.find({}, { branchName: 1, _id: 0 });

    const branchNames = allBranches.map(branch => branch.branchName);

    res.status(200).json({ message: 'All branch names retrieved successfully', data: branchNames });
  } catch (error) {
    console.error('Error retrieving branch names:', error);
    res.status(500).json({ message: 'Error retrieving branch names' });
  }
});

app.post('/createmember', limiter, async (req, res) => {
  const {
    memberNo, firstName, lastName, email, branchName
  } = req.body;

  try {
    const newMember = new memberModel({
      memberNo,
      firstName,
      lastName,
      email,
      branchName
    });

    await newMember.save();

    res.status(200).json({ message: 'Member data saved to MongoDB', data: newMember });
  } catch (error) {
    console.error('Error saving member data:', error);
    res.status(500).json({ message: 'Error saving member data' });
  }
});

app.put('/updatemember/:id', limiter, async (req, res) => {
  const memberId = req.params.id;
  const { memberNo, firstName, lastName, email, branchName } = req.body;

  try {
    const updatedMember = await memberModel.findByIdAndUpdate(
      memberId,
      { memberNo, firstName, lastName, email, branchName },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member updated successfully', data: updatedMember });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Error updating member' });
  }
});

app.post('/deletemember/:id', limiter, async (req, res) => {
  const memberId = req.params.id;
  try {
    const deletedMember = await memberModel.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member deleted successfully', data: deletedMember });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ message: 'Error deleting member' });
  }
});

app.get('/readmembers', limiter, async (req, res) => {
  try {
    const allMembers = await memberModel.find();

    res.status(200).json({ message: 'All members retrieved successfully', data: allMembers });
  } catch (error) {
    console.error('Error retrieving members:', error);
    res.status(500).json({ message: 'Error retrieving members' });
  }
});

app.get('/readmembersname', limiter, async (req, res) => {
  try {
    const allMembers = await memberModel.find({}, 'firstName lastName'); // Fetch 'firstName' and 'lastName' fields

    const memberNames = allMembers.map(member => ({
      name: `${member.firstName} ${member.lastName}` // Concatenate 'firstName' and 'lastName'
    }));

    res.status(200).json({ message: 'All member names retrieved successfully', data: memberNames });
  } catch (error) {
    console.error('Error retrieving member names:', error);
    res.status(500).json({ message: 'Error retrieving member names' });
  }
});

app.get('/readmemberids', limiter, async (req, res) => {
  try {
    const allMembers = await memberModel.find({}, 'memberNo'); // Fetch only the '_id' field

    const memberIds = allMembers.map(member => ({
      id: member.memberNo // Retrieve '_id' field
    }));

    res.status(200).json({ message: 'All member IDs retrieved successfully', data: memberIds });
  } catch (error) {
    console.error('Error retrieving member IDs:', error);
    res.status(500).json({ message: 'Error retrieving member IDs' });
  }
});

// GET member by ID
app.get('/getmember/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    // Find the member by ID in your MongoDB database using Mongoose
    const member = await memberModel.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // If the member is found, send it as a response
    res.status(200).json(member);
  } catch (error) {
    console.error('Error retrieving member:', error);
    res.status(500).json({ message: 'Error retrieving member' });
  }
});

app.post('/createloan', limiter, async (req, res) => {
  const {
    loanId, loanProduct, borrower, memberNo, releaseDate, appliedAmount, status
  } = req.body;

  try {
    const newLoan = new loansModel({
      loanId,loanProduct,borrower,
      memberNo,releaseDate,appliedAmount,
      status,
    });

    await newLoan.save();

    res.status(200).json({ message: 'Loan data saved to MongoDB', data: newLoan });
  } catch (error) {
    console.error('Error saving loan data:', error);
    res.status(500).json({ message: 'Error saving loan data' });
  }
});

app.put('/updateloan/:id', limiter, async (req, res) => {
  const loanId = req.params.id;
  const { loanProduct, borrower, memberNo, releaseDate, appliedAmount, status } = req.body;

  try {
    const updatedLoan = await loansModel.findByIdAndUpdate(
      loanId,
      { loanProduct, borrower, memberNo, releaseDate, appliedAmount, status },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json({ message: 'Loan updated successfully', data: updatedLoan });
  } catch (error) {
    console.error('Error updating loan:', error);
    res.status(500).json({ message: 'Error updating loan' });
  }
});

app.post('/deleteloan/:id', limiter, async (req, res) => {
  const loanId = req.params.id;
  try {
    const deletedLoan = await loansModel.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json({ message: 'Loan deleted successfully', data: deletedLoan });
  } catch (error) {
    console.error('Error deleting loan:', error);
    res.status(500).json({ message: 'Error deleting loan' });
  }
});

app.get('/loans', limiter, async (req, res) => {
  try {
    const allLoans = await loansModel.find();

    res.status(200).json({ message: 'All loans retrieved successfully', data: allLoans });
  } catch (error) {
    console.error('Error retrieving loans:', error);
    res.status(500).json({ message: 'Error retrieving loans' });
  }
});

app.get('/loans/members', limiter, async (req, res) => {
  try {
    const allMembers = await memberModel.find({}, { memberNo: 1, _id: 0 });

    const memberNumbers = allMembers.map(member => member.memberNo);

    res.status(200).json({ message: 'All member numbers retrieved successfully', data: memberNumbers });
  } catch (error) {
    console.error('Error retrieving member numbers:', error);
    res.status(500).json({ message: 'Error retrieving member numbers' });
  }
});

app.get('/loans/:id', async (req, res) => {
  const x = req.params.id;

  try {
    // Find the loan by ID in your MongoDB database using Mongoose
    const loan = await loansModel.findById(x);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // If the loan is found, send it as a response
    res.status(200).json(loan);
  } catch (error) {
    console.error('Error retrieving loan:', error);
    res.status(500).json({ message: 'Error retrieving loan' });
  }
});

// Create a new repayment record
app.post('/createrepayments', async (req, res) => {
  try {
    const {
      loanId, paymentDate, dueDate, principalAmount, interest, latePenalties, totalAmount
    } = req.body;

    const newRepayment = new repaymentModel({
      loanId: new mongoose.Types.ObjectId(Number(loanId)), // Assign the converted ObjectId to the 'loanId' field in the model
      paymentDate,
      dueDate,
      principalAmount,
      interest,
      latePenalties,
      totalAmount
    });

    const savedRepayment = await newRepayment.save();
    res.status(201).json({ message: 'Repayment record created', data: savedRepayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create repayment record', error: error.message });
  }
});

// Get all repayment records
app.get('/readrepayments', async (req, res) => {
  try {
    const repayments = await repaymentModel.find();
    res.status(200).json({ message: 'All repayment records retrieved', data: repayments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve repayment records', error: error.message });
  }
});

// Get a specific repayment record by ID
app.get('/repayments/:id', async (req, res) => {
  try {
    const repaymentId = req.params.id;
    const repayment = await repaymentModel.findById(repaymentId);
    if (!repayment) {
      return res.status(404).json({ message: 'Repayment record not found' });
    }
    res.status(200).json({ message: 'Repayment record retrieved', data: repayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve repayment record', error: error.message });
  }
});

// Update a repayment record by ID
app.put('/repayments/:id', async (req, res) => {
  try {
    const repaymentId = req.params.id;
    const {
      loanId, paymentDate, dueDate, principalAmount, interest, latePenalties,totalAmount
    } = req.body;

    const updatedRepayment = await repaymentModel.findByIdAndUpdate(repaymentId, {
      loanId, paymentDate, dueDate, principalAmount, interest, latePenalties, totalAmount
    }, { new: true });

    if (!updatedRepayment) {
      return res.status(404).json({ message: 'Repayment record not found' });
    }

    res.status(200).json({ message: 'Repayment record updated', data: updatedRepayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update repayment record', error: error.message });
  }
});

// Delete a repayment record by ID
app.delete('/repayments/:id', async (req, res) => {
  try {
    const repaymentId = req.params.id;
    const deletedRepayment = await repaymentModel.findByIdAndDelete(repaymentId);

    if (!deletedRepayment) {
      return res.status(404).json({ message: 'Repayment record not found' });
    }

    res.status(200).json({ message: 'Repayment record deleted', data: deletedRepayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete repayment record', error: error.message });
  }
});

// GET endpoint to fetch approved loan IDs
app.get('/approvedLoans', async (req, res) => {
  try {
    const approvedLoans = await loansModel.find({ status: 'Approved' }, { loanId: 1, _id: 0 });
    res.status(200).json({ message: 'Approved loans retrieved successfully', data: approvedLoans });
  } catch (error) {
    console.error('Error fetching approved loans:', error);
    res.status(500).json({ message: 'Error fetching approved loans' });
  }
});

// Create a new account
app.post('/createaccounts', async (req, res) => {
  try {
    const account = await AccountModel.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all accounts
app.get('/readaccounts', async (req, res) => {
  try {
    const accounts = await AccountModel.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an account by ID
app.get('/accounts/:id', async (req, res) => {
  try {
    const account = await AccountModel.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an account by ID
app.put('/updateaccounts/:id', async (req, res) => {
  try {
    const account = await AccountModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all account numbers
app.get('/readaccountnumbers', async (req, res) => {
  try {
    const accountNumbers = await AccountModel.find({}, 'accountNumber');
    const numbers = accountNumbers.map(account => account.accountNumber);
    res.json(numbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an account by ID
app.post('/deleteaccounts/:id', async (req, res) => {
  try {
    const account = await AccountModel.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const newTransaction = await TransactionsModel.create(req.body);
    res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

app.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await TransactionsModel.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction retrieved successfully', data: transaction });
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ message: 'Error retrieving transaction' });
  }
});

app.put('/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await TransactionsModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Error updating transaction' });
  }
});

app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await TransactionsModel.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully', data: deletedTransaction });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Error deleting transaction' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
