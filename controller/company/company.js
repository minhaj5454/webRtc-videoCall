
const bcrypt = require('bcryptjs');
const companyService = require('../../services/company/companyService');
const tokenGeneration = require('../../middlewares/modules/tokenGeneration');
// const twilio = require('../../middlewares/modules/twilio');

exports.create = async (req, res) => {
    try {
        const { companyName, email, password} = req.body;
        if (!companyName || !email || !password) {
            return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
        }
        // Check if the company already exists
        const existingCompany = await companyService.findOne({ email });
        if (existingCompany) {
            return res.status(400).send({ response : "failed" , message: req.t("company_already_exist") });
        }
        // Create a new company
        const companyData = {
            companyName,
            email,
            password,
        };
        const newCompany = await companyService.create(companyData);
        if (!newCompany) {
            return res.status(400).send({ response : "failed" , message: req.t("company_creation_failed") });
        }

        return res.status(201).send({ response : "success" , message: req.t("company_created_successfully") });
    } catch (error) {
        console.error("Error creating company:", error);    
        return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
    }
}


exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
    }
    const company = await companyService.findOne({ email } , {__v : 0});
    if (!company) {
        return res.status(400).send({ response : "failed" , message: req.t("invalid_credentials") });
    }
    if (!company.status) {
        return res.status(400).send({ response : "failed" , message: req.t("company_status_false") });
    }
    if (company.isDeleted) {
        return res.status(400).send({ response : "failed" , message: req.t("company_not_found") });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
        return res.status(400).send({ response : "failed" , message: req.t("invalid_credentials") });
    }
    const expiresIn ="12h"
    const token = tokenGeneration.generateToken(company, expiresIn);
    if (!token) {
        return res.status(400).send({ response : "failed" , message: req.t("token_generation_failed") });
    }
    company.token = token;
    await company.save();

    return res.status(200).send({ response : "success" , message: req.t("login_successfully") , result: company , token });
}
catch (error) {
    console.error("Error during company login:", error);
    return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
}
}



// exports.sendMessage = async (req,res) => {

//     try {
        
//         const {to, message} = req.body;
//         if (!to || !message) {
//             return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
//         }

//         const result = await twilio.sendSMS(to, message);
//         if (!result) {
//             return res.status(400).send({ response : "failed" , message: req.t("message_sending_failed") });
//         }


//         return res.status(200).send({ response : "success" , message: req.t("message_sent_successfully") });

//     } catch (error) {
//         console.error("Error sending message:", error);
//         return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
//     }

// }


