const { timeStamp } = require('console');
const { application } = require('express');
const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    email: {
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
    admin: {
        required: true,
        type: Boolean
    },
    usercookie: {
        type: String
    }
})

const uploadDocumentSchema = new mongoose.Schema({
    id:{
        required: true,
        type: Number
    },
    username:{
        required: true,
        type: String
    },
    applicationID:{
        required: true,
        type: String
    },
    idCardLink: {
        required: true,
        type: String
    },
    businessCertificateLink:{
        required: true,
        type: String
    },
    bankStatementLink: {
        required: true,
        type: String
    },
    LoanAmount: {
        required: true,
        type: String
    },
    LoanDuration: {
        required: true,
        type: String
    },
    interestRate: {
        required: true,
        type: String
    },
    PaymentPer: {
        required: true,
        type: String
    }
})

const loanQuestionnaireSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    usercookie: {
        required: true,
        type: String
    },
    personalInfo: {
        fullname:{
            required: true,
            type: String
        },
        dateofbirth:{
            required: true,
            type: String
        },
        gender: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        phone: {
            required: true,
            type: String
        },
        residentAddress: {
            required: true,
            type: String
        },
        LGA: {
            required: true,
            type: String
        },
        state: {
            required: true,
            type: String
        }
    },
    businessInfo: {
        businessName: {
            required: true,
            type: String
        },
        businessAddress: {
            required: true,
            type: String
        },
        businessAge: {
            required: true,
            type: String
        }, 
        businessType: {
            required: true,
            type: String
        },
        businessIndustry: {
            required: true,
            type: String
        },
        businessLGA: {
            required: true,
            type: String
        },
        businessTown: {
            required: true,
            type: String
        }
    },
    financeInfo: {
        bankAccountQuestion: {
            required: true,
            type: String
        },
        digitalPaymentQuestion: {
            required: true,
            type: String
        },
        businessFinanceQuestion: {
            required: true,
            type: String
        }
    },
    challengeInfo: {
        biggestChallengesQuestion: {
            required: true,
            type: String
        },
        govtSupportQuestion: {
            required: true,
            type: String
        },
        businessGrowthQuestion: {
            required: true,
            type: String
    }
},
    loanInfo: {
        loanBeforeQuestion: {
            required: true,
            type: String
        },
        loanHowQuestion: {
            required: true,
            type: String
        },
        whyNoLoan: {
            required: true,
            type: String
        }
    },
    regulatoryInfo: {
        regulatoryChallengeQuestion: {
            required: true,
            type: String
        }
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    },
    loanStatus: {
        type:String,
        default: "Submitted"
    },
    loanAmount: {
        type: String,
        default: "pending"
    }
})


const users = mongoose.model('UserData', userSchema)
const loanQuestionnaire = mongoose.model('LoanQuestionnaire', loanQuestionnaireSchema)
const uploadDocument = mongoose.model('uploadDocument', uploadDocumentSchema)

module.exports = {
    users, loanQuestionnaire, uploadDocument
}