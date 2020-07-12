
Survey
    .StylesManager
    .applyTheme("modern");

//Add a property a text property into all questions types and into page
Survey
    .Serializer
    .addProperty("question", "popupdescription:text");
Survey
    .Serializer
    .addProperty("page", "popupdescription:text");
function showDescription(element) {
    document
        .getElementById("questionDescriptionText")
        .innerHTML = element.popupdescription;
    $("#questionDescriptionPopup").modal();
}

var json = {
    title: "COVID-19 Assessment",
    pages: [
        {
            questions: [
                {
                    type: "checkbox",
                    name: "Sex",
                    title: "Please select your sex.",                   
                    hasOther: true,
                    isRequired: true,
                    choices: ["Male", "Female"]
                }
            ]         
        }, {
            questions: [
                {
                    type: "checkbox",
                    name: "Age",
                    title: "Please select your age.",                   
                    hasOther: false,
                    isRequired: true,
                    choices: ["< 30", "30-65", "> 65"]
                }
            ]     
        }, {    
            questions: [
                {
                    type: "checkbox",
                    name: "Feeling of sick",
                    title: "Do you feel sick?",                   
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No"]
                }
            ]     
        }, {                       
            questions: [
                {
                    type: "checkbox",
                    name: "Symptoms",
                    title: "Does any of these symptoms apply to you?",
                    colCount: 9,
                    isRequired: true,
                    choices: [
                        "Added difficulty in breathing than usual",
                        "Sore throat",
                        "Diaherra",
                        "Vomit",
                        "Losss of smell or taste",
                        "Cough",
                        "Fever or feeling feverish",
                        "Muscle pain",
                        "Fatique",
                        "None of the above"
                    ]
                }
            ]
        }, {               
            questions: [
                {
                    type: "checkbox",
                    name: "contact",
                    title: "In the past 14 days before you felt sick, have you had close contact with a confirmed case?",
                    popupdescription: "Close contact is defined as being within 1.5 meters of an infected person for 15 minutes or more. Instances include direct phyiscal contact (e.g. touching), contact with or exchange of body fluids, or living in the same accomodation.",                   
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No", "Not sure"]
                }
            ]      
        }, {
            questions: [
                {
                    type: "checkbox",
                    name: "travel",
                    title: "Have you travelled outside Hong Kong in the past 14 days?",
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No"]
                }
            ]      
        }, {
            questions: [
                {
                    type: "checkbox",
                    name: "Comorbidities",
                    title: "Have you been diagnosed with any of the following?",
                    colCount: 7,
                    isRequired: true,
                    choices: [
                        "Cancer",
                        "Pregnancy",
                        "Diabetes",
                        "Hypertension",
                        "Chronic lung disease",
                        "Cardiovscular diseases",
                        "Obesity",
                        "None of the above"
                    ]
                }
            ]
        }, { 
            questions: [
                {
                    type: "checkbox",
                    name: "smoke",
                    title: "Do you smoke?",
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No"]
                }
            ]      
        }, { 
            questions: [
                {
                    type: "checkbox",
                    name: "immunity",
                    title: "Do you have any disorder that weakens your immune system (i.e. immunodeficiency disorder) or taking medications that cause immune suppression (i.e. immunosuppressants)?",
                    popupdescription: "Examples of immunodeficiency disorder include X-linked agammaglobulinemia (XLA), severe combined immunodeficiency (SCID), leukemia, or AIDS. Immunosuppresants are usally used in autoimmune disease treatment or after organ transplant. If you are currently receiveing chemotherapy, please also select YES",                   
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No", "Not sure"]
                }
            ]      
        }, {
            questions: [
                {
                    type: "checkbox",
                    name: "vaccine",
                    title: "Have you received any flu vaccination in the past 6 months?",
                    hasOther: false,
                    isRequired: true,
                    choices: ["Yes", "No", "Not sure"]
                }
            ]      
        }, { 
            questions: [
                {
                    type: "text",
                    name: "name",
                    title: "Your Name:"
                }, {
                    type: "text",
                    name: "contact",
                    title: "Your mobile number:"
                }, {
                    type: "text",
                    name: "ID number",
                    title: "Your HKID number:"            
                }
            ]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

survey
    .onAfterRenderQuestion
    .add(function (survey, options) {
        //Return if there is no description to show in popup
        if (!options.question.popupdescription) 
            return;
        
        //Add a button;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";

        btn.style.position = "absolute";
        btn.style.marginLeft = "20px"

        btn.innerHTML = "More Info";
        var question = options.question;
        btn.onclick = function () {
            showDescription(question);
        }
        var header = options
            .htmlElement
            .querySelector("h5");
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });

survey
    .onAfterRenderPage
    .add(function (survey, options) {
        //Return if there is no description to show in popup
        if (!options.page.popupdescription) 
            return;
        
        //Add a button;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";

        btn.style.position = "absolute";
        btn.style.marginLeft = "20px"

        btn.innerHTML = "More Info";
        btn.onclick = function () {
            showDescription(survey.currentPage);
        }
        var header = options
            .htmlElement
            .querySelector("h4");
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });


survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({model: survey});