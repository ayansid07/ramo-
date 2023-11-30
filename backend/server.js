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

// const loanSchema = new mongoose.Schema({
//   borrowerName: { type: String, required: true },
//   amount: { type: Number, required: true },
//   CustomerID: { type: Number, required: true },
//   email: {type: String,required: true,unique: true,},
//   ProjectName: { type: String },
//   Status: { type: String, enum: ['Active', 'Inactive', 'Cancel'], default: 'Active' },
//   CustomerImage: { type: String },
//   StatusBg: { type: String },
//   Weeks: { type: String },
//   Budget: { type: String },
//   Location: { type: String },
//   interestRate: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   status: { type: String, enum: ['Pending', 'Active', 'Closed', 'Defaulted', 'Cancelled'], default: 'Pending' },
//   collateral: { type: String },
//   purpose: { type: String },
//   repayments: [{
//     amountPaid: { type: Number, required: true },
//     datePaid: { type: Date, default: Date.now },
//     paymentMode: { type: String },
//     paymentReference: { type: String },
//     paymentStatus: { type: String }
//     // Add more fields as needed for repayments
//   }]
// }, { collection: 'loans' });

// const transactionSchema = new mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Assuming User model exists
//   accountNumber: String,
//   amount: Number,
//   debitCreditOption: { type: String, enum: ['debit', 'credit'] }, // Transaction type: debit or credit
//   transactionType: String, // Additional transaction type details
//   status: { type: String, enum: ['pending', 'completed', 'cancelled'] }, // Transaction status
//   description: String,
// },{collection: 'transactions'});

// const accountSchema = new mongoose.Schema({ 
//   accountNumber: { type: String, required: true, unique: true }, 
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
//   accountType: { type: String, enum: ['savings', 'checking', 'loan', 'credit'], required: true }, 
//   balance: { type: Number, default: 0 }, 
//   currency: { type: String, default: 'USD' }, 
//   status: { type: String, enum: ['active', 'inactive'], 
//   default: 'active' }, 
//   transactions: [{ type: mongoose.Schema.Types.ObjectId, 
//   ref: 'Transaction' }] 
// },{collection:'accounts'});

const branchesSchema = new mongoose.Schema({
  branchName: {type:String,required:true,unique:true},
  contactemail: {type:String,required:true,unique:true},
  contactphone: {type: Number,required:true,unique:true},
  branchaddress: {type: String,required:true},
},{collection: 'branches'})

// const expenseSchema = new mongoose.Schema({
//   category: { type: String, required: true }, // Expense category (e.g., 'Utilities', 'Office Supplies', etc.)
//   amount: { type: Number, required: true }, // Expense amount
//   date: { type: Date, default: Date.now }, // Date of the expense
//   description: { type: String }, // Description of the expense
//   referenceID: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to the related document (e.g., loan, transaction, etc.)
//     required: true
//   },
// },{collection: 'expenses'});

const userModel = mongoose.model('userdata', userSchema);
// const loanModel = mongoose.model('loans',loanSchema);
// const transactionModel = mongoose.model('transactions',transactionSchema);
// const accountsModel = mongoose.model('accounts',accountSchema);
const branchesModel = mongoose.model('branches',branchesSchema);
// const ExpenseModel = mongoose.model('expenses', expenseSchema);

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
  max: 100, // limit each IP to 100 requests per windowMs
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

app.delete('/deletebranch/:id', limiter, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
