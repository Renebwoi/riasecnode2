const express = require('express');
const router = express.Router();
const { users, loanQuestionnaire, uploadDocument } = require('../models/model');

function randomString() {
    const randomStringOneLiner = Math.random().toString(36).substr(2, 10);
    console.log(randomStringOneLiner);
    return randomStringOneLiner
}
function randomDecision(probability) {
    // Ensure probability is between 0 and 100
    if (probability < 0 || probability > 100) {
        throw new Error("Probability must be a number between 0 and 100.");
    }
    
    // Generate a random number between 0 and 100
    const randomNum = Math.random() * 100;
    
    // Return "Accepted" if the random number is less than the probability, otherwise "Rejected"
    return randomNum < probability ? "Accepted" : "Rejected";
}

// endpoint for logging in
router.post('/checkUser', async (req, res) => {
    console.log("userdetails: ", req.body)
    let usernamelog = req.body.username
    let passwordlog = req.body.password
    // let typelog = req.body.type //type indicates whether it is student or counsellor logging in 

    // let log = login(usernamelog, passwordlog, typelog)
    // console.log("login is", log)
    // res.send(log) //frontend will check if it's a valid cookie
    // // res.send("done")
    console.log("user data is",await users.find()) //debugging
    selectedUser = await users.findOne({
        email:usernamelog,
        password:passwordlog
    })
    // add selectedUser.id later. It may cause server errors if null
    console.log("user selected", await selectedUser)

    if (selectedUser != null) {
        let cookie = randomString()
        // update the document with the cookie
        selectedUser.usercookie = cookie
        console.log("selected user", selectedUser)
        selectedUser.save()
        let userdetails = {
            valid: true,
            admin: selectedUser.admin,
            usercookie: cookie
        }
        res.status(200).send(userdetails)
    }
    else {
        let userdetails = {
            valid: false
        }
        res.status(200).send(userdetails)
    } 

})

// endpoint for registering a new user
router.post('/post', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await users.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new users({
            id: newId,
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname,
            admin: false,
            usercookie: "None"
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all applications made by a user
router.post('/getAllApplic', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await loanQuestionnaire.find({ username: req.body.username });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// Get all applications, every single one
router.post('/adminGetAll', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await loanQuestionnaire.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get only one application, using it's id
router.post('/adminGetOne', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await loanQuestionnaire.find({ id: req.body.id });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get only one application, using it's id
router.post('/adminGetUpOne', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await uploadDocument.find({ id: req.body.id });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// // Change one applications loanStatus, using it's id
// router.post('/adminChangeOne', async (req, res) => {
//     // res.send('Get All API')
//     try{
//         const data = await loanQuestionnaire.find({ id: req.body.id });
//         data.loanStatus = req.body.loanStatus;

//         // Save the new document
//         const dataToSave = await data.save();
//         // console.log("data saved", dataToSave)
//         res.status(200).json(dataToSave);
//         // res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// Change one application's loanStatus using its id
router.post('/adminChangeOne', async (req, res) => {
    try {
        // Find the document by id
        const data = await loanQuestionnaire.findOne({ id: req.body.id }); // Use findOne instead of find

        // Check if the document exists
        if (!data) {
            return res.status(404).json({ message: 'Loan application not found' });
        }

        // Update the loanStatus
        data.loanStatus = req.body.loanStatus;

        // Save the updated document
        const updatedData = await data.save();

        // Send the updated document as a response
        res.status(200).json(updatedData);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
});


// endpoint for submitting a loan questionnaire
router.post('/businessShow', async (req, res) => {
    try {
        console.log("req.body", req.body)
        // Fetch the last document
        const lastRecord = await loanQuestionnaire.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        // console.log("req.body.personalInfo", req.body.personalInfo)
        const data = new loanQuestionnaire({
            id: newId,
            personalInfo: req.body.personalInfo,
            businessInfo: req.body.businessInfo,
            financeInfo: req.body.financeInfo,
            challengeInfo: req.body.challengeInfo,
            loanInfo: req.body.loanInfo,
            regulatoryInfo: req.body.regulatoryInfo,
            username: req.body.username,
            usercookie: req.body.usercookie,
            loanStatus: randomDecision(5)
        });

        // Save the new document
        const dataToSave = await data.save();
        // console.log("data saved", dataToSave)
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// endpoint for uploading documents and loan details
router.post('/uploadDocument', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await uploadDocument.findOne().sort({ id: -1 });

        // Determine the new id id: newId,
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new uploadDocument({
            id: newId,
            username: req.body.username,
            applicationID: req.body.applicationID,
            idCardLink: req.body.idCardLink,
            businessCertificateLink: req.body.businessCertificateLink,
            bankStatementLink: req.body.bankStatementLink,
            BVN: req.body.BVN,
            LoanAmount: req.body.LoanAmount,
            LoanDuration: req.body.LoanDuration,
            interestRate: req.body.interestRate,
            PaymentPer: req.body.PaymentPer
        });

        console.log("Upload document data is: ",data)
        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





module.exports = router;