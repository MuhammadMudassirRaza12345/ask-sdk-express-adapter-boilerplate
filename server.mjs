import express from "express";
import Alexa, { SkillBuilders } from 'ask-sdk-core';
import morgan from "morgan";
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import axios from "axios";

const app = express();
app.use(morgan("dev"))
const PORT = process.env.PORT || 3000;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speakOutput = 'Assalam Alikum and Hello and Welcome, i am assitant of Mr.mudassir . Which would you like to ask? i can tell his name and working experience.';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'nameintent';
  },
  handle(handlerInput) {
      const speakOutput = 'My name is Muhammad Mudassir Raza,my friends call me malik,would like know my work experience';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};
const workexperHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'work_experience';
  },
  handle(handlerInput) {
      const speakOutput = 'I started working as frontend developer in 2019 as well i learn python 2020 and now i am moving on Ai chatbots';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};

const  WeatherintentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Weatherintent';
  },
   async handle(handlerInput) {
      // is ma mujha tamam slots mila ga
       const slots = handlerInput.requestEnvelope.request.intent.slots;
       console.log("Slots",slots)
       const cityName =slots.cityName
        console.log("cityName: ", cityName)
        
   try{
        const response  = await   axios.get(`https://api.weatherapi.com/v1/current.json?key=c7c5691d05bf4b8aaf3161855222402&q=${cityName.value}&aqi=no`)
       console.log("data 1",response.data);
      console.log("data 2 ", response.data.current.condition.text);
      console.log( "data 3", response.data.current.temp_c);
      const speakOutput = `In ${cityName.value} is ${response.body.current.temp_c} degree centigrade and ${response.data.current.condition.text}`;
      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
      }
    catch (error) {
       // handle error
       console.log(error);
  //   const speakOutput = `weather of ${cityName.value} is 27 degree centigrade`;
       return handlerInput.responseBuilder
          .speak("something went wrong")
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
   }
   }
};
const bookRoomHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'bookRoom';
  },
  handle(handlerInput) {
      
       // is ma mujha tamam slots mila ga
       const slots = handlerInput.requestEnvelope.request.intent.slots;
       console.log("Slots",slots)
       const  numberOfPerson =slots.numberOfPerson
    console.log("numberOfPerson ", numberOfPerson)
    
     const  roomType =slots.roomType
    console.log("roomType ", roomType)
    
      const  arrivalDate =slots.arrivalDate
    console.log("arrivalDate ", arrivalDate)
    
      const  Duration =slots.Duration
    console.log("Duration", Duration)
    
      
      
      
      const speakOutput = 'your booking is completed ';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
      return true;
  },
  handle(handlerInput, error) {
      const speakOutput = 'Sorry, this is error handler intent. Please try again.';
      console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};




















const skillBuilder = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    workExpIntentHandler,
    weatherIntentHandler,
    bookRoomIntentHandler
  )
  .addErrorHandlers(
    ErrorHandler
  )
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, false, false);




// https://blue-bird.herokuapp.com/api/v1/webhook-alexa
app.post('/api/v1/webhook-alexa', adapter.getRequestHandlers());

app.use(express.json())
app.get('/profile', (req, res, next) => {
  res.send("this is a profile");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});





