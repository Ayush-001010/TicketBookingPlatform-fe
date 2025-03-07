import React, { useContext } from "react";
import { AddTrainContext } from "../AddTrains";

const Description: React.FunctionComponent<{}> = () => {
  const { formType } = useContext(AddTrainContext);
  const firstFormNotes = (
    <div>
      <p>
        Hi there! 👋 To help us gather all the necessary details about your
        train, please carefully fill out the form below. Your accurate input
        ensures smooth processing and helps us serve you better.Here are a few
        guidelines to assist you:
      </p>
      <ul>
        <li>
          Train Name: Type in the official name of the train. Please avoid using
          any special characters or numbers.
        </li>
        <li>
          Train Code: Enter the unique code for the train. This should include a
          combination of letters and numbers, without any special characters.
        </li>
        <li>
          Type of Coach: Choose the type of coach from the dropdown menu (e.g.,
          Sleeper, AC, General).
        </li>
        <li>
          Type of Train: Select the type of train (e.g., Express, Passenger,
          Freight) from the provided options. Special characters are not
          allowed.
        </li>
        <li>
          Running Schedule: Indicate the days and timings when the train
          operates (e.g., Mon-Fri, 10:00 AM - 6:00 PM).
        </li>
        <li>
        Departure Station: Enter the name of the departure station. No special
          characters, please.
        </li>
        <li>
        Destination Station: Enter the name of the destination station. Again, no special
          characters.
        </li>
      </ul>
    </div>
  );
  const secondFormNotes = (
    <div>
      <p>
        Hi there! 👋 To help us gather all the necessary details about your
        train, please carefully fill out the form below. Your accurate input
        ensures smooth processing and helps us serve you better.Here are a few
        guidelines to assist you:
      </p>
      <ul>
        <li>
          <b>Starting Time:</b> Enter the initial start time of the train. This
          is the time when the train departs from its origin station.
        </li>
        <li>
          <b>Average Speed:</b> Enter the average speed of the train. This will
          be used to calculate the travel time between stops.
        </li>
        <li>
          <b>Train Stops:</b> Add the stop names in the dropdown fields. These
          are the stations where the train will make scheduled stops.
        </li>
        <li>
          <b>Timing for Each Stop:</b> Manually enter the timing for each stop
          or use the settings icon to automatically calculate the arrival times
          based on the average speed and distance.
        </li>
        <li>
          <b>Distance Covered:</b> Enter the distance the train will cover
          between each stop. This is important for calculating travel time and
          scheduling.
        </li>
        <li>
          <b>Adjustments:</b> Make minor timing changes if necessary by
          adjusting the values in the timing fields. Use the trash icon to
          delete any stop if it is no longer required.
        </li>
        <li>
          <b>Next Step:</b> After filling in all the fields, click "Next" to
          proceed to the subsequent part of the form or process.
        </li>
      </ul>
    </div>
  );
  const thirdFormNotes = (
    <div>
      <p>
        Hi there! 👋 To help us gather all the necessary details about your
        train, please carefully fill out the form below. Your accurate input
        ensures smooth processing and helps us serve you better.Here are a few
        guidelines to assist you:
      </p>
      <ul>
        <li>
          Coach Selection: Select the type of coach from the available radio
          button options. Each option represents a different class or type of
          coach (e.g., General, Sleeper, etc.).
        </li>
        <li>
          Price per Kilometer: Enter the price per kilometer for the selected
          coach type in the provided input field. This price will be used to
          calculate the total fare for the journey based on the distance
          covered.
        </li>
        <li>
          Fare Calculation: The total fare will be automatically calculated
          based on the selected coach type and the entered price per kilometer.
          Ensure that the price entered accurately reflects the fare structure
          for the chosen coach. Example: If you select "Sleeper Class" and enter
          ₹2 per kilometer, and the distance is 500 kilometers, the total fare
          will be ₹1000 (₹2 x 500 km).
        </li>
      </ul>
    </div>
  );
  const fourthNotes = (
    <div>
      <p>
        Hello, You're just a step away from adding a new train that will serve
        millions of travelers! Before you submit, please ensure that all the
        details are accurate. Once everything is verified, click the 'Add New
        Train' button. Thank you for your attention to detail!
      </p>
    </div>
  );
  return (
    <>
      {formType === 1 && firstFormNotes}
      {formType === 2 && secondFormNotes}
      {formType === 3 && thirdFormNotes}
      {formType === 4 && fourthNotes}
    </>
  );
};

export default Description;
