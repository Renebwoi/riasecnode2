const express = require('express');
const router = express.Router();
const { studentDatas, studentresultData, counsellorDatas, counsellorPupils, messageData } = require('../models/model');

function randomString() {
    const randomStringOneLiner = Math.random().toString(36).substr(2, 10);
    console.log(randomStringOneLiner);
    return randomStringOneLiner
}

// endpoint for registering a new student
router.post('/post', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await studentDatas.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new studentDatas({
            id: newId,
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email,
            age: req.body.age,
            schoolname: req.body.schoolname,
            usercookie: "None"
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// endpoint for logging in
router.patch('/loginstudent', async (req, res) => {
    console.log("userdetails: ", req.body)
    let usernamelog = req.body.username
    let passwordlog = req.body.password
    // let typelog = req.body.type //type indicates whether it is student or counsellor logging in 

    // let log = login(usernamelog, passwordlog, typelog)
    // console.log("login is", log)
    // res.send(log) //frontend will check if it's a valid cookie
    // // res.send("done")
    selectedStudent = await studentDatas.findOne({
        username:usernamelog,
        password:passwordlog
    })
    // add selectedStudent.id later. It may cause server errors if null
    console.log("student selected", await selectedStudent)

    if (selectedStudent != null) {
        let cookie = randomString()
// update the document with the cookie
selectedStudent.usercookie = cookie
selectedStudent.save()
        res.status(200).send(cookie)
    }
    else {
        res.status(400).send("User Not Registered")
    } 

})

// Get all Method
router.get('/getAll', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await studentDatas.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by small id Method
router.get('/getOne/:id', async (req, res) => {
    // res.send('Get by ID API')
    // res.send(req.params.id)
    try{
        const data = await studentDatas.findOne( { id : req.params.id} );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by student's id and fullname using cookie Method
router.get('/getStudentData/:id', async (req, res) => {
    // res.send('Get by ID API')
    // res.send(req.params.id)
    try{
        const data = await studentDatas.findOne( { usercookie : req.params.id} );
        const sanitizedData = {
            fullname: data.fullname,
            id:data.id
        }
        res.json(sanitizedData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by small id Method, password maybe duplicate this endpoint for each field, no stress.
router.patch('/update/:id', async (req, res) => {
    // res.send('Update by ID API')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        // const result = await studentDatas.findByIdAndUpdate(
        //     id, updatedData, options
        // )

        const data = await studentDatas.findOne( { id : req.params.id} );

        data.password = req.body.password 
        data.save()
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

//   const data =  studentDatas.updateOne(
//         { username: "Rene" },
//         {
//             "_id": "668bbfeec268688f6fd464d7",
//             "username": "Rene",
//             "password": "superman",
//             "fullname": "Nwoye Emmanuel",
//             "email": "demiurgerene@gmail.com",
//             "age": 21,
//             "schoolname": "UNN",
//             "usercookie": "Hello",
//             "__v": 0,
//             "id": 3
//         },
//         { new: true }
//     );

//     res.send("done")
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    // res.send('Delete by ID API')
    try {
        const id = req.params.id;
        const data = await studentDatas.findOneAndDelete({ id : req.params.id})
        res.send(`Document with ${data.username} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get by one by cookie Method
router.get('/cookiegetOne/:id', async (req, res) => {
    try{
        const data = await studentDatas.findOne( { usercookie : req.params.id} );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// 
router.post('/postcode',async (req,res) => {
    try{
         // Fetch the last document
        //  const lastRecord = await studentDatas.findOne().sort({ id: -1 });

         // Determine the new id
        //  const newId = lastRecord ? lastRecord.id + 1 : 1;
 
         // Create a new document
         const data = new studentresultData({
             studentname: req.body.studentname,
             studentID: req.body.studentID,
            riasecScore: {
                realistic: req.body.riasecScore.realistic,
                investigative: req.body.riasecScore.investigative,
                artistic: req.body.riasecScore.artistic,
                social: req.body.riasecScore.social,
                enterprising: req.body.riasecScore.enterprising,
                conventional: req.body.riasecScore.conventional
            },
            riasecCode: req.body.riasecCode,
            waecResults: {
                subject1:{
                    subjectName: req.body.waecResults.subject1.subjectName,
                    subjectScore: req.body.waecResults.subject1.subjectScore
                },
                subject2:{
                    subjectName: req.body.waecResults.subject2.subjectName,
                    subjectScore: req.body.waecResults.subject2.subjectScore
                },
                subject3:{
                    subjectName: req.body.waecResults.subject3.subjectName,
                    subjectScore: req.body.waecResults.subject3.subjectScore
                },
                subject4:{
                    subjectName: req.body.waecResults.subject4.subjectName,
                    subjectScore: req.body.waecResults.subject4.subjectScore
                },
                subject5:{
                    subjectName: req.body.waecResults.subject5.subjectName,
                    subjectScore: req.body.waecResults.subject5.subjectScore
                },
                subject6:{
                    subjectName: req.body.waecResults.subject6.subjectName,
                    subjectScore: req.body.waecResults.subject6.subjectScore
                },
                subject7:{
                    subjectName: req.body.waecResults.subject7.subjectName,
                    subjectScore: req.body.waecResults.subject7.subjectScore
                },
                subject8:{
                    subjectName: req.body.waecResults.subject8.subjectName,
                    subjectScore: req.body.waecResults.subject8.subjectScore
                },
                subject9:{
                    subjectName: req.body.waecResults.subject9.subjectName,
                    subjectScore: req.body.waecResults.subject9.subjectScore
                }
            }
         });
 
         // Save the new document
         const dataToSave = await data.save();
        //  console.log("Student result save complete")
        // const dato = await studentresultData.findOne( { studentID: req.body.studentID} );
         res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get the student riasec result, code and waec result
router.get('/getcode/:id',async (req,res) => {
    try{
        const data = await studentresultData.findOne( { studentID : req.params.id} );
         res.json(data);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// FOR COUNSELLOR REGISTER AND LOGIN
// --------------------------------------------------------------------------
router.post('/postcounsellor', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await counsellorDatas.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new counsellorDatas({
            id: newId,
            username: req.body.username,
            password: req.body.password,
            specialization: req.body.specialization,
            email: req.body.email,
            phoneno: req.body.phoneno,
            yearsOfExperience: req.body.yearsOfExperience,
            usercookie: "None"
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// endpoint for logging in
router.patch('/logincounsellor', async (req, res) => {
    console.log("userdetails: ", req.body)
    let usernamelog = req.body.username
    let passwordlog = req.body.password
    // let typelog = req.body.type //type indicates whether it is student or counsellor logging in 

    // let log = login(usernamelog, passwordlog, typelog)
    // console.log("login is", log)
    // res.send(log) //frontend will check if it's a valid cookie
    // // res.send("done")
    selectedCoun = await counsellorDatas.findOne({
        username:usernamelog,
        password:passwordlog
    })
    
    console.log("counsellor selected", await selectedCoun)

    if (selectedCoun != null) {
        let cookie = randomString()
// update the document with the cookie
selectedCoun.usercookie = cookie
selectedCoun.save()
        res.status(200).send(cookie)
    }
    else {
        res.status(400).send("User Not Registered")
    } 

})

// Get all Counsellors for student contact page
router.get('/getAllCounsellors', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await counsellorDatas.find();
        // console.log("data is: ", data)
        const sanitizedData = [];

        for (let i = 0; i < data.length; i++) {
        sanitizedData.push({
            id: data[i].id,
            username: data[i].username,
            email: data[i].email,
            specialization: data[i].specialization,
            yearsOfExperience: data[i].yearsOfExperience,
            phoneno: data[i].phoneno
        });
        }
          
          console.log("sanitizedData iss: ",sanitizedData);
        res.json(sanitizedData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// counsellor pupils insert
router.post('/postpupilrequest', async (req, res) => {
    try {
        
        const checkData = await counsellorPupils.findOne( { counsellorid : req.body.counsellorid, studentID: req.body.studentID} );

        if(checkData){
            // Create a new document
            const data = new counsellorPupils({
                studentID: req.body.studentID,
                studentname: req.body.studentname,
                counsellorname: req.body.counsellorname,
                counsellorid: req.body.counsellorid,
                completed: false,
            });

            // Save the new document
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        }
        else{
            const mesage = "Request already posted";
            res.status(200).json(mesage);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get by counsellor by cookie Method
router.get('/getCounData/:id', async (req, res) => {
    try{
        const data = await counsellorDatas.findOne( { usercookie : req.params.id} );
        const sanitizedData = {
            fullname: data.username,
            id:data.id
        }
        res.json(sanitizedData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all the pupils of a counsellor
router.get('/getCounStudData/:id', async (req, res) => {
    try{
        const data = await counsellorPupils.find( { counsellorid : req.params.id} );
        const sanitizedData = [];

        for (let i = 0; i < data.length; i++) {
        sanitizedData.push({
            studentid: data[i].studentID,
            studentname: data[i].studentname
        });
        }
          
          console.log("sanitizedData isz: ",sanitizedData);
        res.json(sanitizedData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// endpoint for counsellor sendng a message
router.post('/counsSendmsg', async (req, res) => {
    // Fetch the counsellors details using the cookie
    // const data = await messageData.findOne( { usercookie : req.body.usercookie} );

    // console.log("chatdetails: ", req.body)
    // console.log("data gotten", data)

    // if (data != null) {

    //     let chattertype = "counsellor"
    //     let message = req.body.message
    //     let chattername = data.username
    //     let chatterid = data.id
    //     let time = Date.now
        // update the document with the cookie
    //     let chatMessage = {
    //         chattername: chattername,
    //         chattertype: chattertype,
    //         chatterid: chatterid,
    //         message: message,
    //         time: time.toString()
    //     }
    //     console.log("length",data.chatData.length)
    //     if( data.chatData.length == 0){
    //     // console.log("Our Chat Data " , data.chatData,"type is ", typeof(data.chatData))
    //     // let newData = [...data.chatData]
    //     // newData.push(chatMessage)
    //     // data.chatData = newData
    //     data.chatData.push(chatMessage)
    //     }
    //     else{
    //         let newData = []
    //         newData.push(chatMessage)
    //         data.chatData = newData
    //     }
    //     data.save()
    //     res.status(200).send("Your Message is added")
    // }
    // else {
    //     res.status(400).send("User Not Registered")
    // } 
    
         try{   
            const { studentid, counsellorid, chatData } = req.body;

            // Check if a document with the same studentid and counsellorid exists
            let message = await messageData.findOne({ studentid, counsellorid });

            if (message) {
                // If the document exists, update the chatData array
                message.chatData = message.chatData.concat(chatData);
                await message.save();
                res.status(200).json(message);
            } else {

                const newMessage = new messageData(req.body);
                await newMessage.save();
                res.status(201).json(newMessage);
            }
         }
        catch(error){
            // Handle any errors
            res.status(500).json({ error: error.message });
         }
})


// endpoint for counsellor getting/fetching the messages
router.get('/counsGetmsg/:studentid/:counsellorid', async (req, res) => {
     
         try{   
            const studentid = req.params.studentid
            const counsellorid = req.params.counsellorid

            // Check if a document with the same studentid and counsellorid exists
            let message = await messageData.findOne({ studentid, counsellorid });
            let messages = message.chatData
           res.json(messages)
         }
        catch(error){
            // Handle any errors
            res.status(500).json({ error: error.message });
         }
})







module.exports = router;