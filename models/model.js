const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const studentSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    schoolname: {
        required: true,
        type: String
    },
    usercookie: {
        type: String
    }
})

// const questionSchema = new mongoose.Schema({
//     question: {
//         required: true,
//         type: String
//     },
//     category: {
//         required: true,
//         type: Number
//     },
//     id: {
//         required: true,
//         type: Number
//     }
// })

const studentresultSchema = new mongoose.Schema({
    studentname: {
        required: true,
        type: String
    },
    studentID: {
        required: true,
        type: Number
    },
    riasecScore: {
        realistic:{
            type: Number
        },
        investigative: {
            type: Number
        },
        artistic:{
            type: Number
        },
        social:{
            type: Number
        },
        enterprising:{
            type: Number
        },
        conventional :{
            type: Number
        }
    },
    riasecCode: {
        type: String
    },
    waecResults: {
        subject1:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject2:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject3:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject4:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject5:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject6:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject7:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject8:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        },
        subject9:{
            subjectName: {
                type: String
            },
            subjectScore: {
                type: String
            }
        }
    }
})


const counsellorSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phoneno: {
        required: true,
        type: Number
    },
    specialization: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    yearsOfExperience: {
        required: true,
        type: Number
    },
    usercookie: {
        type: String
    }
})

const counsellorpupilsSchema = new mongoose.Schema({
    studentname:{
        required: true,
        type: String
    },
    studentID:{
        required: true,
        type: Number
    },
    counsellorname: {
        required: true,
        type: String
    },
    counsellorid: {
        required: true,
        type: Number
    },
    completed: {
        required: true,
        type: Boolean
    },
    reviewscore: {
        type: Number
    },
    reviewcomment: {
        type: String
    }
})

const messageSchema = new mongoose.Schema({
    studentid: {
        required: true,
        type: Number
    },
    studentname: {
        required: true,
        type: String
    },
    counsellorname: {
        required: true,
        type: String
    },
    counsellorid: {
        required: true,
        type: Number
    },
    chatData: [{
        chattertype: {
            type: String
        },
        message: {
            type: String
        },
        time: {
            type: Date 
            // default: Date.now
        }
    }]
})

const studentDatas = mongoose.model('StudentData', studentSchema)
// const questionDatas = mongoose.model('QuestionData', questionSchema)
const studentresultData = mongoose.model('QuestionData', studentresultSchema)
const counsellorDatas = mongoose.model('CounsellorData', counsellorSchema)
const counsellorPupils = mongoose.model('CounsellorPupils', counsellorpupilsSchema)
const messageData = mongoose.model('MessageData', messageSchema)


module.exports = {
    studentDatas, studentresultData, counsellorDatas, counsellorPupils, messageData
}