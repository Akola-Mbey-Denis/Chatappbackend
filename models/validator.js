const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const userSchema = {
  properties: {    
    username: {type:"string"},
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "email", "password"], 
  additionalProperties: false,
}; 
 

const userValidate = ajv.compile(userSchema);
 

exports.userFieldValidator = function (data) {
  const valid = userValidate(data);
  if (valid) return { valid: valid, data: data };
  else return { valid: valid, error: userValidate.errors };
};

 